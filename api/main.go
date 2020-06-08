package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
)

// Data structures
type App struct {
	config         *Config
	client         *mongo.Client
	db             *mongo.Database
	projCollection *mongo.Collection
	langCollection *mongo.Collection
	toolCollection *mongo.Collection
}

type Config struct {
	DbUri          string
	DbName         string
	Host           string
	Port           string
	AllowedOrigins string
}

type reqBody struct {
	Query string `json:"query"`
}

type Project struct {
	UID         string   `bson:"uid"       json:"uid"`
	Name        string   `bson:"name"      json:"name"`
	Description string   `bson:"desc"      json:"desc"`
	About       string   `bson:"about"     json:"about"`
	AppSource   string   `bson:"app"       json:"app"`
	SourceCode  string   `bson:"src"       json:"src"`
	Languages   []string `bson:"languages" json:"languages"`
	Tools       []string `bson:"tools"     json:"tools"`
}

type LanguageId struct {
	UID   string `bson:"uid"   json:"uid"`
	Name  string `bson:"name"  json:"name"`
	Color string `bson:"color" json:"color"`
}

// GraphQL Types
var projectType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Project",
		Fields: graphql.Fields{
			"uid": &graphql.Field{
				Type: graphql.String,
			},
			"name": &graphql.Field{
				Type: graphql.String,
			},
			"desc": &graphql.Field{
				Type: graphql.String,
			},
			"about": &graphql.Field{
				Type: graphql.String,
			},
			"app": &graphql.Field{
				Type: graphql.String,
			},
			"src": &graphql.Field{
				Type: graphql.String,
			},
			"languages": &graphql.Field{
				Type: graphql.NewList(graphql.String),
			},
			"tools": &graphql.Field{
				Type: graphql.NewList(graphql.String),
			},
		},
	},
)

var languageIdType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "LanguageId",
		Fields: graphql.Fields{
			"uid": &graphql.Field{
				Type: graphql.String,
			},
			"name": &graphql.Field{
				Type: graphql.String,
			},
			"color": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

// Config
func (c *Config) GetAddr() string {
	return fmt.Sprintf("%s:%s", c.Host, c.Port)
}

// App
func (a *App) Initialize() {
	// Configure the app

	a.config = &Config{
		DbUri:          os.Getenv("DB_URI"),
		DbName:         os.Getenv("DB_NAME"),
		Host:           os.Getenv("HOST"),
		Port:           os.Getenv("PORT"),
		AllowedOrigins: os.Getenv("ORIGINS_ALLOWED"),
	}

	if len(a.config.Host) == 0 {
		a.config.Host = "127.0.0.1"
	}

	if len(a.config.Port) == 0 {
		a.config.Port = "2000"
	}

	var err error

	// Database
	a.client, err = mongo.NewClient(options.Client().ApplyURI(a.config.DbUri))
	if err != nil {
		fmt.Println("ERR: func (a *App) Initialize() - Client connection")
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = a.client.Connect(ctx)
	if err != nil {
		fmt.Println("ERR: func (a *App) Initialize() - Connection timeout")
		log.Fatal(err)
	}

	a.db = a.client.Database(a.config.DbName)
	a.projCollection = a.db.Collection("Projects")
	a.langCollection = a.db.Collection("LanguageIds")
	a.toolCollection = a.db.Collection("ToolIds")
}

// GraphQL API handler
func (a *App) gqlHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", a.config.AllowedOrigins)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Body == nil {
			http.Error(w, "No query data", 400)
			return
		}

		var rBody reqBody
		err := json.NewDecoder(r.Body).Decode(&rBody)
		if err != nil {
			http.Error(w, "Error parsing JSON request body", 400)
		}

		fmt.Fprintf(w, "%s", a.processQuery(rBody.Query))
	})
}

// GraphQL Query Handler
func (a *App) processQuery(query string) (result string) {
	params := graphql.Params{Schema: a.gqlSchema(), RequestString: query}
	r := graphql.Do(params)
	if len(r.Errors) > 0 {
		fmt.Printf("failed to execute graphql operation, errors: %+v\n", r.Errors)
	}
	rJSON, _ := json.Marshal(r)

	return fmt.Sprintf("%s", rJSON)

}

// Retrieve data from Projects collection
func (a *App) getProjects() []Project {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	cursor, err := a.projCollection.Find(ctx, bson.M{})
	defer cursor.Close(ctx)

	if err != nil {
		fmt.Println("ERR: func (a *App) getProjects() - Find")
		log.Fatal(err)
	}

	var jsonData []Project

	if err = cursor.All(ctx, &jsonData); err != nil {
		fmt.Println("ERR: func (a *App) getProjects() - Cursor")
		log.Fatal(err)
	}

	return jsonData
}

// Retrieve one object from Projects collection
func (a *App) getProject(uid string) Project {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var jsonData Project

	err := a.projCollection.FindOne(ctx, bson.M{"uid": uid}).Decode(&jsonData)

	if err != nil {
		fmt.Println("ERR: func (a *App) getProject() - FindOne")
		log.Fatal(err)
	}

	return jsonData
}

// Retrieve data from LanguageIds collection
func (a *App) getLanguageIds() []LanguageId {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	cursor, err := a.langCollection.Find(ctx, bson.M{})
	defer cursor.Close(ctx)

	if err != nil {
		fmt.Println("ERR: func (a *App) getLanguageIds() - Find")
		log.Fatal(err)
	}

	var jsonData []LanguageId

	if err = cursor.All(ctx, &jsonData); err != nil {
		fmt.Println("ERR: func (a *App) getLanguageIds() - Cursor")
		log.Fatal(err)
	}

	return jsonData
}

// Retrieve one object from LanguageIds collection
func (a *App) getLanguageId(uid string) LanguageId {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var jsonData LanguageId

	err := a.langCollection.FindOne(ctx, bson.M{"uid": uid}).Decode(&jsonData)

	if err != nil {
		fmt.Println("ERR: func (a *App) getLanguageId() - FindOne")
		log.Fatal(err)
	}

	return jsonData
}

// Retrieve data from ToolIds collection
func (a *App) getToolIds() []LanguageId {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	cursor, err := a.toolCollection.Find(ctx, bson.M{})
	defer cursor.Close(ctx)

	if err != nil {
		fmt.Println("ERR: func (a *App) getToolIds() - Find")
		log.Fatal(err)
	}

	var jsonData []LanguageId

	if err = cursor.All(ctx, &jsonData); err != nil {
		fmt.Println("ERR: func (a *App) getToolIds() - Cursor")
		log.Fatal(err)
	}

	return jsonData
}

// Retrieve one object from ToolIds collection
func (a *App) getToolId(uid string) LanguageId {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var jsonData LanguageId

	err := a.toolCollection.FindOne(ctx, bson.M{"uid": uid}).Decode(&jsonData)

	if err != nil {
		fmt.Println("ERR: func (a *App) getToolId() - FindOne")
		log.Fatal(err)
	}

	return jsonData
}

// Define the GraphQL Schema
func (a *App) gqlSchema() graphql.Schema {
	fields := graphql.Fields{
		"projects": &graphql.Field{
			Type:        graphql.NewList(projectType),
			Description: "All Projects",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getProjects(), nil
			},
		},
		"project": &graphql.Field{
			Type:        projectType,
			Description: "Get Projects by UID",
			Args: graphql.FieldConfigArgument{
				"uid": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				uid, success := params.Args["uid"].(string)
				if success {
					return a.getProject(uid), nil
				}
				return nil, nil
			},
		},
		"languages": &graphql.Field{
			Type:        graphql.NewList(languageIdType),
			Description: "All Language IDs",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getLanguageIds(), nil
			},
		},
		"language": &graphql.Field{
			Type:        languageIdType,
			Description: "Get Language IDs by UID",
			Args: graphql.FieldConfigArgument{
				"uid": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				uid, success := params.Args["uid"].(string)
				if success {
					return a.getLanguageId(uid), nil
				}
				return nil, nil
			},
		},
		"tools": &graphql.Field{
			Type:        graphql.NewList(languageIdType),
			Description: "All Tool IDs",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getToolIds(), nil
			},
		},
		"tool": &graphql.Field{
			Type:        languageIdType,
			Description: "Get Tool IDs by UID",
			Args: graphql.FieldConfigArgument{
				"uid": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				uid, success := params.Args["uid"].(string)
				if success {
					return a.getToolId(uid), nil
				}
				return nil, nil
			},
		},
	}
	rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: fields}
	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		fmt.Printf("failed to create new schema, error: %v", err)
	}

	return schema

}

// Run app in development mode
func (a *App) Run() {
	// Routes
	http.Handle("/", a.gqlHandler())

	// Serve the app
	fmt.Printf("Serving on %s.\n", a.config.GetAddr())

	http.ListenAndServe(a.config.GetAddr(), nil)
}

// Serverless router
func LambdaRouter(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	app := &App{}
	app.Initialize()

	switch req.HTTPMethod {
	case "OPTIONS":
		return events.APIGatewayProxyResponse{
			StatusCode: 200,
			Headers: map[string]string{
				"Access-Control-Allow-Origin":  app.config.AllowedOrigins,
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
			},
		}, nil
	case "GET":
		return events.APIGatewayProxyResponse{
			StatusCode: 200,
			Headers: map[string]string{
				"Access-Control-Allow-Origin":  app.config.AllowedOrigins,
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
			},
			Body: "{}",
		}, nil
	case "POST":
		return app.HandleLambdaRequest(req)
	default:
		return app.BadLambdaRequest(http.StatusMethodNotAllowed)
	}
}

// Handle serverless GraphQL request
func (a *App) HandleLambdaRequest(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if req.Headers["content-type"] != "application/json" && req.Headers["Content-Type"] != "application/json" {
		return a.BadLambdaRequest(http.StatusNotAcceptable)
	}

	rBody := new(reqBody)
	err := json.Unmarshal([]byte(req.Body), rBody)
	if err != nil {
		return a.BadLambdaRequest(http.StatusBadRequest)
	}

	res := a.processQuery(rBody.Query)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  a.config.AllowedOrigins,
			"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
		},
		Body: res,
	}, nil
}

// Handle bad serverless request
func (a *App) BadLambdaRequest(status int) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  a.config.AllowedOrigins,
			"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
		},
		Body: http.StatusText(status),
	}, nil
}

// Main
func main() {
	// Parse command line arguments
	args := os.Args

	// Run app in dev mode (IP/port) or serverless mode
	if len(args) == 2 && args[1] == "dev" {
		err := godotenv.Load()
		if err != nil {
			log.Printf("Error: Could not find .env file")
		}

		app := &App{}
		app.Initialize()
		app.Run()
	} else {
		lambda.Start(LambdaRouter)
	}
}

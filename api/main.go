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
//      "go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/friendsofgo/graphiql"
	"github.com/graphql-go/graphql"
        "github.com/joho/godotenv"
)

// Data structures
type App struct {
        config          *Config
        client          *mongo.Client
        ctx             context.Context
        db              *mongo.Database
        projCollection  *mongo.Collection
        langCollection  *mongo.Collection
}

type Config struct {
        DbUri   string
        DbName  string
        Host    string
        Port    string
}

type reqBody struct {
	Query string `json:"query"`
}

type Project struct {
//      Id              primitive.ObjectID `bson:"_id,omitempty"`
        UID             string          `bson:"uid"`
        Name            string          `bson:"name"`
        Description     string          `bson:"desc"`
        About           string          `bson:"about"`
        AppSource       string          `bson:"app"`
        SourceCode      string          `bson:"src"`
        Languages       []string        `bson:"languages"`
        Tools           []string        `bson:"tools"`
}

type LanguageId struct {
//      Id              primitive.ObjectID `bson:"_id,omitempty"`
        UID             string          `bson:"uid"`
        Name            string          `bson:"name"`
        Color           string          `bson:"color"`
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

// App
func main() {
        // Config
        app := &App{}
        app.Initialize()
        app.Run()
}

func (c *Config) GetAddr() string {
        return fmt.Sprintf("%s:%s", c.Host, c.Port)
}

func (a *App) Initialize() {
        // Configure the app
        err := godotenv.Load()
        if err != nil {
                log.Printf("Error: Could not find .env file")
        }

        a.config = &Config{
                DbUri:  os.Getenv("DB_URI"),
                DbName: os.Getenv("DB_NAME"),
                Host:   os.Getenv("HOST"),
                Port:   os.Getenv("PORT"),
        }

        if len(a.config.Host) == 0 {
                a.config.Host = "127.0.0.1"
        }

        if len(a.config.Port) == 0 {
                a.config.Port = "3000"
        }

        // Database
        a.client, err = mongo.NewClient(options.Client().ApplyURI(a.config.DbUri))
        if err != nil {
                fmt.Println("ERR: func (a *App) Initialize() - Client connection")
                log.Fatal(err)
        }
        a.ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
        err = a.client.Connect(a.ctx)
        if err != nil {
                fmt.Println("ERR: func (a *App) Initialize() - Connection timeout")
                log.Fatal(err)
        }
        defer a.client.Disconnect(a.ctx)

        a.db = a.client.Database(a.config.DbName)
        a.projCollection = a.db.Collection("Projects")
        a.langCollection = a.db.Collection("LanguageIds")
}

func (a *App) Run() {
        // GraphiQL stuff
	graphiqlHandler, err := graphiql.NewGraphiqlHandler("/")
	if err != nil {
                fmt.Println("ERR: func (a *App) Run()")
		panic(err)
	}

        // Routes
        fmt.Println("Setting GraphQL API handler route.")
	http.Handle("/", a.gqlHandler())

        fmt.Println("Setting GraphiQL handler route.")
	http.Handle("/graphiql", graphiqlHandler)

        // Serve the app
        fmt.Println("Starting server on port 2000.")

	http.ListenAndServe(a.config.GetAddr(), nil)
}

// GraphQL API handler
func (a *App) gqlHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
		fmt.Printf("failed to execute graphql operation, errors: %+v", r.Errors)
	}
	rJSON, _ := json.Marshal(r)

	return fmt.Sprintf("%s", rJSON)

}

// Open the file projects.json and retrieve json data
func (a *App) getProjects() []Project {
        cursor, err := a.projCollection.Find(a.ctx, bson.M{})

        if err != nil {
                fmt.Println("ERR: func (a *App) getProjects() - Find")
                log.Fatal(err)
        }

        var jsonData []Project

        if err = cursor.All(a.ctx, &jsonData); err != nil {
                fmt.Println("ERR: func (a *App) getProjects() - Cursor")
                log.Fatal(err)
        }

        return jsonData
}

// Open the file languages.json and retrieve json data
func (a *App) getLanguageIds() []LanguageId {
        cursor, err := a.langCollection.Find(a.ctx, bson.M{})

        if err != nil {
                fmt.Println("ERR: func (a *App) getLanguageIds() - Find")
                log.Fatal(err)
        }

        var jsonData []LanguageId

        if err = cursor.All(a.ctx, &jsonData); err != nil {
                fmt.Println("ERR: func (a *App) getLanguageIds() - Cursor")
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
					for _, proj := range a.getProjects() {
						if proj.UID == uid {
							return proj, nil
						}
					}
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
					for _, lid := range a.getLanguageIds() {
						if lid.UID == uid {
							return lid, nil
						}
					}
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

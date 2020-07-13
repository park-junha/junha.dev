package main

import (
	"database/sql"
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/lib/pq"
)

// Constants
const PROJECTS_QUERY = "projects.sql"
const PROJECT_QUERY = "project.sql"
const EXPERIENCES_QUERY = "experiences.sql"
const EXPERIENCE_QUERY = "experience.sql"

// Data structures
type App struct {
	config *Config
	db     *sql.DB
}

type Config struct {
	Database       *DatabaseConfig
	Server         *ServerConfig
	AllowedOrigins string
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Schema   string
	SslMode  string
}

type ServerConfig struct {
	Host string
	Port string
}

type reqBody struct {
	Query string `json:"query"`
}

type Experience struct {
	ExperienceID string   `json:"experience_id"`
	Label        string   `json:"label"`
	Company      string   `json:"company"`
	Title        string   `json:"title"`
	StartDate    string   `json:"start_date"`
	EndDate      string   `json:"end_date"`
	Description  []string `json:"description"`
}

type Project struct {
	ProjectID   string `json:"project_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	About       string `json:"about"`
	Url         string `json:"url"`
	SourceCode  string `json:"source_code_url"`
	Languages   []Tool `json:"languages"`
	Tools       []Tool `json:"tools"`
}

type Tool struct {
	Name  string `json:"name"`
	Color string `json:"color"`
}

// GraphQL Types
var ExperienceType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Experience",
		Fields: graphql.Fields{
			"experience_id": &graphql.Field{
				Type: graphql.String,
			},
			"label": &graphql.Field{
				Type: graphql.String,
			},
			"company": &graphql.Field{
				Type: graphql.String,
			},
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"start_date": &graphql.Field{
				Type: graphql.String,
			},
			"end_date": &graphql.Field{
				Type: graphql.String,
			},
			"description": &graphql.Field{
				Type: graphql.NewList(graphql.String),
			},
		},
	},
)

var ProjectType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Project",
		Fields: graphql.Fields{
			"project_id": &graphql.Field{
				Type: graphql.String,
			},
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"description": &graphql.Field{
				Type: graphql.String,
			},
			"about": &graphql.Field{
				Type: graphql.String,
			},
			"url": &graphql.Field{
				Type: graphql.String,
			},
			"source_code_url": &graphql.Field{
				Type: graphql.String,
			},
			"languages": &graphql.Field{
				Type: graphql.NewList(ToolType),
			},
			"tools": &graphql.Field{
				Type: graphql.NewList(ToolType),
			},
		},
	},
)

var ToolType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Tool",
		Fields: graphql.Fields{
			"name": &graphql.Field{
				Type: graphql.String,
			},
			"color": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

// Convert file to string
func FileToString(filename string) string {
	fileContents, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatal(err)
	}

	return string(fileContents)
}

// Server Config
func (sc *ServerConfig) GetAddr() string {
	return fmt.Sprintf("%s:%s", sc.Host, sc.Port)
}

// Database Config
func (dc *DatabaseConfig) GetInfo() string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dc.Host,
		dc.Port,
		dc.User,
		dc.Password,
		dc.Schema,
		dc.SslMode)
}

// Implement driver.Valuer interface to Tool struct
func (t Tool) Value() (driver.Value, error) {
	return json.Marshal(t)
}

// Implement sql.Scanner interface to Tool struct
func (t *Tool) Scan(value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		log.Fatal("fatal err: type assertion to []byte failed\n")
	}

	return json.Unmarshal(b, &t)
}

// App
func (a *App) Initialize() {
	// Configure the app

	a.config = &Config{
		Database: &DatabaseConfig{
			Host:     os.Getenv("DB_HOST"),
			Port:     os.Getenv("DB_PORT"),
			User:     os.Getenv("DB_USER"),
			Password: os.Getenv("DB_PASSWORD"),
			Schema:   os.Getenv("DB_SCHEMA"),
			SslMode:  os.Getenv("DB_SSLMODE"),
		},
		Server: &ServerConfig{
			Host: os.Getenv("HOST"),
			Port: os.Getenv("PORT"),
		},
		AllowedOrigins: os.Getenv("ORIGINS_ALLOWED"),
	}

	if len(a.config.Server.Host) == 0 {
		a.config.Server.Host = "127.0.0.1"
	}

	if len(a.config.Server.Port) == 0 {
		a.config.Server.Port = "2000"
	}

	if len(a.config.AllowedOrigins) == 0 {
		a.config.AllowedOrigins = ""
	}

	if len(a.config.Database.SslMode) == 0 {
		a.config.Database.SslMode = "prefer"
	}

	var err error

	// Database
	a.db, err = sql.Open("postgres", a.config.Database.GetInfo())
	if err != nil {
		fmt.Println("fatal err: func (a *App) Initialize(), database connection\n")
		log.Fatal(err)
	}

	err = a.db.Ping()
	if err != nil {
		fmt.Println("fatal err: func (a *App) Initialize(), database ping\n")
		log.Fatal(err)
	}
}

// GraphQL API handler
func (a *App) gqlHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", a.config.AllowedOrigins)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers")
		if r.Method == "OPTIONS" {
			fmt.Printf("%s %d %s\n", r.Method, http.StatusOK, r.URL)
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Body == nil {
			fmt.Printf("%s %d %s\n", r.Method, 400, r.URL)
			http.Error(w, "err: no query data\n", 400)
			return
		}

		var rBody reqBody
		err := json.NewDecoder(r.Body).Decode(&rBody)
		if err != nil {
			fmt.Printf("%s %d %s\n", r.Method, 400, r.URL)
			http.Error(w, "err: could not parse JSON request body\n", 400)
		}

		fmt.Fprintf(w, "%s", a.processQuery(rBody.Query))
		fmt.Printf("%s %d %s\n", r.Method, http.StatusOK, r.URL)
		return
	})
}

// GraphQL Query Handler
func (a *App) processQuery(query string) (result string) {
	params := graphql.Params{Schema: a.gqlSchema(), RequestString: query}
	r := graphql.Do(params)
	if len(r.Errors) > 0 {
		fmt.Printf("err: failed to execute graphql operation, errors: %+v\n", r.Errors)
	}
	rJSON, _ := json.Marshal(r)

	return fmt.Sprintf("%s", rJSON)

}

// Retrieve data from Experience table
func (a *App) getExperiences() []Experience {
	res, err := a.db.Query(FileToString(EXPERIENCES_QUERY))

	if err != nil {
		fmt.Println("fatal err: could not run sql query\n")
		log.Fatal(err)
	}
	defer res.Close()

	var jsonData []Experience

	for res.Next() {
		var row Experience
		err = res.Scan(&row.ExperienceID,
			&row.Label,
			&row.Company,
			&row.Title,
			&row.StartDate,
			&row.EndDate,
			pq.Array(&row.Description))
		if err != nil {
			fmt.Println("fatal err: scanning query result\n")
			log.Fatal(err)
		}

		jsonData = append(jsonData, row)
	}

	return jsonData
}

// Retrieve one object from Experience table
func (a *App) getExperience(uid string) Experience {
	var jsonData Experience

	err := a.db.QueryRow(FileToString(EXPERIENCE_QUERY), uid).Scan(
		&jsonData.ExperienceID,
		&jsonData.Label,
		&jsonData.Company,
		&jsonData.Title,
		&jsonData.StartDate,
		&jsonData.EndDate,
		pq.Array(&jsonData.Description))
	if err != nil {
		fmt.Println("fatal err: running and scanning single row query\n")
		log.Fatal(err)
	}

	return jsonData
}

// Retrieve data from Projects collection
func (a *App) getProjects() []Project {
	res, err := a.db.Query(FileToString(PROJECTS_QUERY))

	if err != nil {
		fmt.Println("fatal err: could not run sql query\n")
		log.Fatal(err)
	}
	defer res.Close()

	var jsonData []Project

	for res.Next() {
		var row Project
		err = res.Scan(&row.ProjectID,
			&row.Title,
			&row.Description,
			&row.About,
			&row.Url,
			&row.SourceCode,
			pq.Array(&row.Languages),
			pq.Array(&row.Tools))
		if err != nil {
			fmt.Println("fatal err: scanning query result\n")
			log.Fatal(err)
		}

		jsonData = append(jsonData, row)
	}

	return jsonData
}

// Retrieve one object from Projects collection
func (a *App) getProject(uid string) Project {
	var jsonData Project

	err := a.db.QueryRow(FileToString(PROJECT_QUERY), uid).Scan(
		&jsonData.ProjectID,
		&jsonData.Title,
		&jsonData.Description,
		&jsonData.About,
		&jsonData.Url,
		&jsonData.SourceCode,
		pq.Array(&jsonData.Languages),
		pq.Array(&jsonData.Tools))
	if err != nil {
		fmt.Println("fatal err: running and scanning single row query\n")
		log.Fatal(err)
	}

	return jsonData
}

// Define the GraphQL Schema
func (a *App) gqlSchema() graphql.Schema {
	fields := graphql.Fields{
		"experiences": &graphql.Field{
			Type:        graphql.NewList(ExperienceType),
			Description: "All Experience",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getExperiences(), nil
			},
		},
		"experience": &graphql.Field{
			Type:        ExperienceType,
			Description: "Get Experience by ID",
			Args: graphql.FieldConfigArgument{
				"experience_id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				uid, success := params.Args["experience_id"].(string)
				if success {
					return a.getExperience(uid), nil
				}
				return nil, nil
			},
		},
		"projects": &graphql.Field{
			Type:        graphql.NewList(ProjectType),
			Description: "All Projects",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getProjects(), nil
			},
		},
		"project": &graphql.Field{
			Type:        ProjectType,
			Description: "Get Projects by ID",
			Args: graphql.FieldConfigArgument{
				"project_id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				uid, success := params.Args["project_id"].(string)
				if success {
					return a.getProject(uid), nil
				}
				return nil, nil
			},
		},
	}
	rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: fields}
	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		fmt.Printf("failed to create new schema, error: %v\n", err)
	}

	return schema
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
			Body: "{\n  \"status\": {\n    \"api\": \"up\",\n    \"ui\": \"https://junha.netlify.app/\"\n  }\n}\n",
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

// Run app in development mode
func (a *App) Run() {
	// Routes
	http.Handle("/", a.gqlHandler())

	// Serve the app
	fmt.Printf("Serving on %s.\n", a.config.Server.GetAddr())

	http.ListenAndServe(a.config.Server.GetAddr(), nil)
}

// Main
func main() {
	// Parse command line arguments
	args := os.Args

	// Run app in serverless mode (default) or another mode
	if len(args) == 1 {
		fmt.Printf("%s - running in lambda mode.\n", args[0])
		lambda.Start(LambdaRouter)
	} else if len(args) == 2 {
		fmt.Printf("%s - running in %s mode.\n", args[0], args[1])
		switch args[1] {
		case "dev":
			err := godotenv.Load()
			if err != nil {
				log.Printf("error: could not find .env file\n")
			}

			app := &App{}
			app.Initialize()
			app.Run()
		default:
			usage(args[0])
		}
	} else {
		usage(args[0])
	}
}

func usage(name string) {
	fmt.Printf("usage:\n")
	fmt.Printf("%s - (no args) run app as lambda function.\n", name)
	fmt.Printf("%s dev - run app in dev mode.\n", name)
	log.Fatal("err: improper usage\n")
}

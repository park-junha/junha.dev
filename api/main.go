package main

import (
	"database/sql"
	"database/sql/driver"
	"encoding/json"
	"errors"
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
const projectsQuery = "projects.sql"
const projectQuery = "project.sql"
const experiencesQuery = "experiences.sql"
const experienceQuery = "experience.sql"
const techsQuery = "techs.sql"
const techQuery = "tech.sql"

// Data structures
type app struct {
	config *appconfig
	db     *sql.DB
}

type appconfig struct {
	Database       *databaseConfig
	Server         *serverConfig
	AllowedOrigins string
}

type databaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Schema   string
	SslMode  string
}

type serverConfig struct {
	Host string
	Port string
}

type reqBody struct {
	Query string `json:"query"`
}

type experience struct {
	ExperienceID string   `json:"experience_id"`
	Label        string   `json:"label"`
	Company      string   `json:"company"`
	Title        string   `json:"title"`
	StartDate    string   `json:"start_date"`
	EndDate      string   `json:"end_date"`
	Description  []string `json:"description"`
}

type project struct {
	ProjectID   string `json:"project_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	About       string `json:"about"`
	Url         string `json:"url"`
	SourceCode  string `json:"source_code_url"`
	Languages   []tech `json:"languages"`
	Tools       []tech `json:"techs"`
}

type tech struct {
	Name  string `json:"name"`
	Color string `json:"color"`
}

type techWithID struct {
	TechID string `json:"tech_id"`
	Name   string `json:"name"`
	Color  string `json:"color"`
}

// GraphQL Types
var experienceType = graphql.NewObject(
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

var projectType = graphql.NewObject(
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
				Type: graphql.NewList(techType),
			},
			"tools": &graphql.Field{
				Type: graphql.NewList(techType),
			},
		},
	},
)

var techType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Tech",
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

var techTypeWithID = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "TechWithID",
		Fields: graphql.Fields{
			"tech_id": &graphql.Field{
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

// Convert file to string
func fileToString(filename string) string {
	fileContents, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatal(err)
	}

	return string(fileContents)
}

// Server Config
func (sc *serverConfig) getAddr() string {
	return fmt.Sprintf("%s:%s", sc.Host, sc.Port)
}

// Database Config
func (dc *databaseConfig) getInfo() string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dc.Host,
		dc.Port,
		dc.User,
		dc.Password,
		dc.Schema,
		dc.SslMode)
}

// Value implements driver.Valuer interface to Tech struct
func (t tech) Value() (driver.Value, error) {
	return json.Marshal(t)
}

// Scan implements sql.Scanner interface to tech struct
func (t *tech) Scan(value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		log.Fatal("fatal err: type assertion to []byte failed\n")
	}

	return json.Unmarshal(b, &t)
}

// App
func (a *app) initialize() {
	// Configure the app

	a.config = &appconfig{
		Database: &databaseConfig{
			Host:     os.Getenv("DB_HOST"),
			Port:     os.Getenv("DB_PORT"),
			User:     os.Getenv("DB_USER"),
			Password: os.Getenv("DB_PASSWORD"),
			Schema:   os.Getenv("DB_SCHEMA"),
			SslMode:  os.Getenv("DB_SSLMODE"),
		},
		Server: &serverConfig{
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
	a.db, err = sql.Open("postgres", a.config.Database.getInfo())
	if err != nil {
		fmt.Println("fatal err: func (a *app) initialize(), database connection\n")
		log.Fatal(err)
	}

	err = a.db.Ping()
	if err != nil {
		fmt.Println("fatal err: func (a *app) initialize(), database ping\n")
		log.Fatal(err)
	}
}

// GraphQL API handler
func (a *app) gqlHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", a.config.AllowedOrigins)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers")
		if r.Method == "OPTIONS" {
			fmt.Printf("%s %d\n", r.Method, http.StatusOK)
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Body == nil {
			fmt.Printf("%s %d\n", r.Method, 400)
			http.Error(w, "err: no query data\n", 400)
			return
		}

		var rBody reqBody
		err := json.NewDecoder(r.Body).Decode(&rBody)
		if err != nil {
			fmt.Printf("%s %d\n", r.Method, 400)
			http.Error(w, "err: could not parse JSON request body\n", 400)
			return
		}

		response, respStatus, respErr := a.processQuery(rBody.Query)
		if respErr != nil {
			fmt.Printf("%s %d\n", r.Method, 400)
			http.Error(w, respErr.Error(), respStatus)
			return
		}
		fmt.Fprintf(w, "%s", response)
		fmt.Printf("%s %d %s\n", r.Method, respStatus, rBody.Query)
		return
	})
}

// GraphQL Query Handler
func (a *app) processQuery(query string) (result string, status int, err error) {
	params := graphql.Params{Schema: a.gqlSchema(), RequestString: query}
	r := graphql.Do(params)
	if len(r.Errors) > 0 {
		fmt.Printf("err: failed to execute graphql operation, errors: %+v\n", r.Errors)
		return fmt.Sprintf("{\"error\":\"invalid operation\"}"), http.StatusBadRequest, errors.New("could not execute graphql operation")
	}
	rJSON, _ := json.Marshal(r)

	return fmt.Sprintf("%s", rJSON), http.StatusOK, nil

}

// Retrieve data from Experience table
func (a *app) getExperiences() []experience {
	res, err := a.db.Query(fileToString(experiencesQuery))

	if err != nil {
		fmt.Println("fatal err: could not run sql query\n")
		log.Fatal(err)
	}
	defer res.Close()

	var jsonData []experience

	for res.Next() {
		var row experience
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
func (a *app) getExperience(uid string) experience {
	var jsonData experience

	err := a.db.QueryRow(fileToString(experienceQuery), uid).Scan(
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
func (a *app) getProjects() []project {
	res, err := a.db.Query(fileToString(projectsQuery))

	if err != nil {
		fmt.Println("fatal err: could not run sql query\n")
		log.Fatal(err)
	}
	defer res.Close()

	var jsonData []project

	for res.Next() {
		var row project
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
func (a *app) getProject(uid string) project {
	var jsonData project

	err := a.db.QueryRow(fileToString(projectQuery), uid).Scan(
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

// Retrieve data from Techs table
func (a *app) getTechs(filter string) []techWithID {
	res, err := a.db.Query(fileToString(techsQuery), filter)

	if err != nil {
		fmt.Println("fatal err: could not run sql query\n")
		log.Fatal(err)
	}
	defer res.Close()

	var jsonData []techWithID

	for res.Next() {
		var row techWithID
		err = res.Scan(&row.TechID,
			&row.Name,
			&row.Color)
		if err != nil {
			fmt.Println("fatal err: scanning query result\n")
			log.Fatal(err)
		}

		jsonData = append(jsonData, row)
	}

	return jsonData
}

// Retrieve one object from Techs table
func (a *app) getTech(uid string) techWithID {
	var jsonData techWithID

	err := a.db.QueryRow(fileToString(techQuery), uid).Scan(
		&jsonData.TechID,
		&jsonData.Name,
		&jsonData.Color)
	if err != nil {
		fmt.Println("fatal err: running and scanning single row query\n")
		log.Fatal(err)
	}

	return jsonData
}

// Define the GraphQL Schema
func (a *app) gqlSchema() graphql.Schema {
	fields := graphql.Fields{
		"experiences": &graphql.Field{
			Type:        graphql.NewList(experienceType),
			Description: "All Experience",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getExperiences(), nil
			},
		},
		"experience": &graphql.Field{
			Type:        experienceType,
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
			Type:        graphql.NewList(projectType),
			Description: "All Projects",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getProjects(), nil
			},
		},
		"project": &graphql.Field{
			Type:        projectType,
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
		"languages": &graphql.Field{
			Type:        graphql.NewList(techTypeWithID),
			Description: "All Language Technologies",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getTechs("la%"), nil
			},
		},
		"tools": &graphql.Field{
			Type:        graphql.NewList(techTypeWithID),
			Description: "All Other Technologies",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return a.getTechs("to%"), nil
			},
		},
		"tech": &graphql.Field{
			Type:        techTypeWithID,
			Description: "Get Techs by ID",
			Args: graphql.FieldConfigArgument{
				"tech_id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				uid, success := params.Args["tech_id"].(string)
				if success {
					return a.getTech(uid), nil
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
func lambdaRouter(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	app := &app{}
	app.initialize()

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
			Body: "{\n  \"status\": {\n    \"api\": \"up\",\n    \"ui\": \"https://junha.dev/\"\n  }\n}\n",
		}, nil
	case "POST":
		return app.handleLambdaRequest(req)
	default:
		return app.badLambdaRequest(http.StatusMethodNotAllowed)
	}
}

// Handle serverless GraphQL request
func (a *app) handleLambdaRequest(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if req.Headers["content-type"] != "application/json" && req.Headers["Content-Type"] != "application/json" {
		return a.badLambdaRequest(http.StatusNotAcceptable)
	}

	rBody := new(reqBody)
	err := json.Unmarshal([]byte(req.Body), rBody)
	if err != nil {
		return a.badLambdaRequest(http.StatusBadRequest)
	}

	response, respStatus, respErr := a.processQuery(rBody.Query)

	if respErr != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: respStatus,
			Headers: map[string]string{
				"Access-Control-Allow-Origin":  a.config.AllowedOrigins,
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
			},
			Body: respErr.Error(),
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: respStatus,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  a.config.AllowedOrigins,
			"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
		},
		Body: response,
	}, nil
}

// Handle bad serverless request
func (a *app) badLambdaRequest(status int) (events.APIGatewayProxyResponse, error) {
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
func (a *app) run() {
	// Routes
	http.Handle("/", a.gqlHandler())

	// Serve the app
	fmt.Printf("Serving on %s.\n", a.config.Server.getAddr())

	http.ListenAndServe(a.config.Server.getAddr(), nil)
}

// Main
func main() {
	// Parse command line arguments
	args := os.Args

	// Run app in serverless mode (default) or another mode
	if len(args) == 1 {
		fmt.Printf("%s - running in lambda mode.\n", args[0])
		lambda.Start(lambdaRouter)
	} else if len(args) == 2 {
		fmt.Printf("%s - running in %s mode.\n", args[0], args[1])
		switch args[1] {
		case "dev":
			err := godotenv.Load()
			if err != nil {
				log.Printf("error: could not find .env file\n")
			}

			app := &app{}
			app.initialize()
			app.run()
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

package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/friendsofgo/graphiql"
	"github.com/graphql-go/graphql"

	"os"
	"io/ioutil"
)

// Data structures
type reqBody struct {
	Query string `json:"query"`
}

type Project struct {
        ID              string          `json:"id"`
        Name            string          `json:"name"`
        Description     string          `json:"desc"`
        About           string          `json:"about"`
        AppSource       string          `json:"app"`
        SourceCode      string          `json:"src"`
        Languages       []string        `json:"languages"`
        Tools           []string        `json:"tools"`
}

type LanguageId struct {
        Name            string  `json:"name"`
        Color           string  `json:"color"`
}

var projectType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Project",
		Fields: graphql.Fields{
			"id": &graphql.Field{
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
	graphiqlHandler, err := graphiql.NewGraphiqlHandler("/graphql")
	if err != nil {
		panic(err)
	}

        fmt.Println("Starting server on port 2000.")
	http.Handle("/graphql", gqlHandler())
	http.Handle("/graphiql", graphiqlHandler)
	http.ListenAndServe(":2000", nil)
}

func gqlHandler() http.Handler {
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

		fmt.Fprintf(w, "%s", processQuery(rBody.Query))

	})
}

func processQuery(query string) (result string) {

	data := openJsonFile()

	params := graphql.Params{Schema: gqlSchema(data), RequestString: query}
	r := graphql.Do(params)
	if len(r.Errors) > 0 {
		fmt.Printf("failed to execute graphql operation, errors: %+v", r.Errors)
	}
	rJSON, _ := json.Marshal(r)

	return fmt.Sprintf("%s", rJSON)

}

//Open the file projects.json and retrieve json data
func openJsonFile() func() []Project {
	return func() []Project {
		jsonf, err := os.Open("projects.json")

		if err != nil {
			fmt.Printf("failed to open json file, error: %v", err)
		}

		jsonDataFromFile, _ := ioutil.ReadAll(jsonf)
		defer jsonf.Close()

		var jsonData []Project

		err = json.Unmarshal(jsonDataFromFile, &jsonData)

		if err != nil {
			fmt.Printf("failed to parse json, error: %v", err)
		}

		return jsonData
	}
}

// Define the GraphQL Schema
func gqlSchema(queryProjects func() []Project) graphql.Schema {
	fields := graphql.Fields{
		"projects": &graphql.Field{
			Type:        graphql.NewList(projectType),
			Description: "All Projects",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return queryProjects(), nil
			},
		},
		"project": &graphql.Field{
			Type:        projectType,
			Description: "Get Projects by ID",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				id, success := params.Args["id"].(string)
				if success {
					for _, proj := range queryProjects() {
						if proj.ID == id {
							return proj, nil
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

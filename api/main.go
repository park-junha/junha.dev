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
        UID             string          `json:"uid"`
        Name            string          `json:"name"`
        Description     string          `json:"desc"`
        About           string          `json:"about"`
        AppSource       string          `json:"app"`
        SourceCode      string          `json:"src"`
        Languages       []string        `json:"languages"`
        Tools           []string        `json:"tools"`
}

type LanguageId struct {
        UID             string  `json:"uid"`
        Name            string  `json:"name"`
        Color           string  `json:"color"`
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
	graphiqlHandler, err := graphiql.NewGraphiqlHandler("/")
	if err != nil {
		panic(err)
	}

        fmt.Println("Starting server on port 2000.")
	http.Handle("/", gqlHandler())
	http.Handle("/graphiql", graphiqlHandler)
	http.ListenAndServe(":2000", nil)
}

// GraphQL API handler
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

// GraphQL Query Handler
func processQuery(query string) (result string) {
	params := graphql.Params{Schema: gqlSchema(), RequestString: query}
	r := graphql.Do(params)
	if len(r.Errors) > 0 {
		fmt.Printf("failed to execute graphql operation, errors: %+v", r.Errors)
	}
	rJSON, _ := json.Marshal(r)

	return fmt.Sprintf("%s", rJSON)

}

// Open the file projects.json and retrieve json data
func getProjects() []Project {
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

// Open the file languages.json and retrieve json data
func getLanguageIds() []LanguageId {
        jsonf, err := os.Open("languages.json")

        if err != nil {
                fmt.Printf("failed to open json file, error: %v", err)
        }

        jsonDataFromFile, _ := ioutil.ReadAll(jsonf)
        defer jsonf.Close()

        var jsonData []LanguageId

        err = json.Unmarshal(jsonDataFromFile, &jsonData)

        if err != nil {
                fmt.Printf("failed to parse json, error: %v", err)
        }

        return jsonData
}

// Define the GraphQL Schema
func gqlSchema() graphql.Schema {
	fields := graphql.Fields{
		"projects": &graphql.Field{
			Type:        graphql.NewList(projectType),
			Description: "All Projects",
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return getProjects(), nil
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
					for _, proj := range getProjects() {
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
				return getLanguageIds(), nil
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
					for _, lid := range getLanguageIds() {
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

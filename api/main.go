package main

import (
        "fmt"
        "net/http"
        "encoding/json"

	"github.com/friendsofgo/graphiql"
	"github.com/graphql-go/graphql"
)

func main() {
	http.Handle("/graphql", gqlHandler())
	http.ListenAndServe(":2000", nil)

        // Graphiql
	graphiqlHandler, err := graphiql.NewGraphiqlHandler("/graphql")
	if err != nil {
		panic(err)
	}
	http.Handle("/graphiql", graphiqlHandler)

        fmt.Println("Serving GraphQL API.")
}

package main

import (
    "fmt"
    "log"
    "net/http"
    _ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {

    router := mux.NewRouter()
    router.HandleFunc("/article/", createArticle).Methods("POST")
    router.HandleFunc("/article/{limit}/{offset}", getArticles).Methods("GET")
    router.HandleFunc("/article/{id}", getArticleById).Methods("GET")
    router.HandleFunc("/articlestatus/{status}", getArticleByStatus).Methods("GET")
    router.HandleFunc("/article/{id}", updateArticle).Methods("POST")
    router.HandleFunc("/articledelete/{id}", deleteArticle).Methods("POST")

    http.Handle("/", router)
    fmt.Println("Connected to port 1234")
    log.Fatal(http.ListenAndServe(":1234", router))

}

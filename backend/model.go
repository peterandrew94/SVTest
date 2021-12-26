package main

import (
    "encoding/json"
    "log"
    "io/ioutil"
    "net/http"
    "github.com/gorilla/mux"
)

type Posts struct {
    Id string `form:"id" json:"id"`
    Title string `form:"title" json:"title"`
    Content  string `form:"content" json:"content"`
    Category  string `form:"category" json:"category"`
    Status  string `form:"status" json:"status"`
}

func getArticles(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    var posts Posts
    var arrPosts []Posts

    db := connect()
    defer db.Close()

    rows, err := db.Query("SELECT ID,TITLE,CONTENT,CATEGORY,STATUS FROM POSTS LIMIT ? OFFSET ?",vars["limit"],vars["offset"])
    
    if err != nil {
        log.Print(err)
    }

    for rows.Next() {
        if err := rows.Scan(&posts.Id, &posts.Title, &posts.Content, &posts.Category, &posts.Status ); err != nil {
            log.Fatal(err.Error())

        } else {
            arrPosts = append(arrPosts, posts)
        }
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(arrPosts)

}

func getArticleById(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    var posts Posts
    var arrPosts []Posts

    db := connect()
    defer db.Close()

    rows, err := db.Query("SELECT ID,TITLE,CONTENT,CATEGORY,STATUS FROM POSTS WHERE ID = ?",vars["id"])
    
    if err != nil {
        log.Print(err)
    }

    for rows.Next() {
        if err := rows.Scan(&posts.Id, &posts.Title, &posts.Content, &posts.Category, &posts.Status ); err != nil {
            log.Fatal(err.Error())

        } else {
            arrPosts = append(arrPosts, posts)
        }
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(arrPosts)

}

func getArticleByStatus(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    var posts Posts
    var arrPosts []Posts

    db := connect()
    defer db.Close()

    rows, err := db.Query("SELECT ID,TITLE,CONTENT,CATEGORY,STATUS FROM POSTS WHERE STATUS = ?",vars["status"])
    
    if err != nil {
        log.Print(err)
    }

    for rows.Next() {
        if err := rows.Scan(&posts.Id, &posts.Title, &posts.Content, &posts.Category, &posts.Status ); err != nil {
            log.Fatal(err.Error())

        } else {
            arrPosts = append(arrPosts, posts)
        }
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(arrPosts)

}

func createArticle(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    db := connect()
    stmt, err := db.Prepare("INSERT INTO posts(title,content,category,status) VALUES(?,?,?,?)")
    if err != nil {
      panic(err.Error())
    }
    
    body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    panic(err.Error())
  }
  keyVal := make(map[string]string)
  json.Unmarshal(body, &keyVal)
  title := keyVal["title"]
  content := keyVal["content"]
  category := keyVal["category"]
  status := keyVal["status"]
    
  if(len(title) >= 20 && len(content)>=200 && len(category)>=3 && (status == "Publish" || status == "Draft" )){
        _, err = stmt.Exec(title,content,category,status)
        if err != nil {
        panic(err.Error())
        }
    }
  }

  func updateArticle(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    w.Header().Set("Content-Type", "application/json")
    db := connect()
    stmt, err := db.Prepare("UPDATE posts SET TITLE =?,CONTENT=?,CATEGORY=?,STATUS=? WHERE ID = ?")
    if err != nil {
      panic(err.Error())
    }
    
    body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    panic(err.Error())
  }
  keyVal := make(map[string]string)
  json.Unmarshal(body, &keyVal)
  title := keyVal["title"]
  content := keyVal["content"]
  category := keyVal["category"]
  status := keyVal["status"]
  if(len(title) >= 20 && len(content)>=200 && len(category)>=3 && (status == "Publish" || status == "Draft" )){

    _, err = stmt.Exec(title,content,category,status,vars["id"])
    if err != nil {
      panic(err.Error())
    }
    }
  }

  func deleteArticle(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    w.Header().Set("Content-Type", "application/json")
    db := connect()
    stmt, err := db.Prepare("UPDATE posts set STATUS = 'Trash' WHERE ID = ?")
    if err != nil {
      panic(err.Error())
    }
    
    _, err = stmt.Exec(vars["id"])
    if err != nil {
      panic(err.Error())
    }
    
  }


  //using x-www-form-url-encoded

// func createArticle(w http.ResponseWriter, r *http.Request) {
    
//     db := connect()
//     stmt, err := db.Prepare("INSERT INTO posts(title,content,category,status) VALUES(?,?,?,?)")
//     if err != nil {
//       panic(err.Error())
//     }
    
//     r.ParseForm()
    
//     title := r.PostFormValue("title")
//      content := r.PostFormValue("content")
//      category := r.PostFormValue("category")
//      status := r.PostFormValue("status")
//     _, err = stmt.Exec(title,content,category,status)
//     if err != nil {
//       panic(err.Error())
//     }
    
//   }

//   func updateArticle(w http.ResponseWriter, r *http.Request) {
    
//     db := connect()
//     stmt, err := db.Prepare("UPDATE posts SET TITLE =?,CONTENT=?,CATEGORY=?,STATUS=? WHERE ID = ?")
//     if err != nil {
//       panic(err.Error())
//     }
    
//     r.ParseForm()
    
//     title := r.PostFormValue("title")
//      content := r.PostFormValue("content")
//      category := r.PostFormValue("category")
//      status := r.PostFormValue("status")
//      id := r.PostFormValue("id")
//     _, err = stmt.Exec(title,content,category,status,id)
//     if err != nil {
//       panic(err.Error())
//     }
    
//   }

//   func deleteArticle(w http.ResponseWriter, r *http.Request) {
    
//     db := connect()
//     stmt, err := db.Prepare("DELETE FROM posts WHERE ID = ?")
//     if err != nil {
//       panic(err.Error())
//     }
    
//     r.ParseForm()
//      id := r.PostFormValue("id")
//     _, err = stmt.Exec(id)
//     if err != nil {
//       panic(err.Error())
//     }
    
 // }
package main

import (
	"github.com/asterfy/go-crud/controllers"
	"github.com/asterfy/go-crud/initializers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	// Configurar CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}                   // Permitir solicitudes desde este origen
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"} // Permitir solicitudes OPTIONS
	r.Use(cors.New(config))

	// r.POST("/posts", controllers.PostsCreate)
	r.GET("/api/posts/", controllers.PostIndex)
	r.GET("/api/posts/:id", controllers.PostsShow)
	r.PUT("/api/posts/:id", controllers.PostsUpdate)
	r.DELETE("/api/posts/:id", controllers.PostsDelete)

	r.Run()
}

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
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))

	r.GET("/api/topics/", controllers.GetTopics)
	r.GET("/api/topics/:id/", controllers.GetTopic)
	r.POST("/api/topics/", controllers.CreateTopic)
	r.PUT("/api/topics/:id/", controllers.PutTopic)
	r.DELETE("/api/topics/:id/", controllers.DeleteTopic)

	r.GET("/api/teachers/", controllers.GetTeachers)
	r.GET("/api/teachers/:id/", controllers.GetTeacher)
	r.POST("/api/teachers/", controllers.CreateTeacher)
	r.PUT("/api/teachers/:id/", controllers.PutTeacher)
	r.DELETE("/api/teachers/:id/", controllers.DeleteTeacher)

	r.Run()
}

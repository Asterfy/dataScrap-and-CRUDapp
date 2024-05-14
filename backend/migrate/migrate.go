package main

import (
	"github.com/asterfy/go-crud/initializers"
	"github.com/asterfy/go-crud/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Post{})
}

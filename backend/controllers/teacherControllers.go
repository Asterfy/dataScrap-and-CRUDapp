package controllers

import (
	"github.com/asterfy/go-crud/initializers"
	"github.com/asterfy/go-crud/models"
	"github.com/gin-gonic/gin"
)

func GetTeachers(c *gin.Context) {
	//Get data
	var teachers []models.Docente
	initializers.DB.Raw("SELECT * FROM docente ORDER BY apellido_paterno").Scan(&teachers)

	c.JSON(200, gin.H{
		"teachers": teachers,
	})
}

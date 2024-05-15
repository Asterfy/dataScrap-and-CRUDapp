package controllers

import (
	"github.com/asterfy/go-crud/initializers"
	"github.com/asterfy/go-crud/models"
	"github.com/gin-gonic/gin"
)

func GetTopics(c *gin.Context) {
	//Get data
	var topics []models.Asignatura
	initializers.DB.Raw("SELECT * FROM asignatura").Scan(&topics)

	c.JSON(200, gin.H{
		"topics": topics,
	})
}

func GetTopic(c *gin.Context) {
	id := c.Param("id")

	var topic models.Asignatura
	// initializers.DB.Table("asignatura").First(&topic, id)
	initializers.DB.Raw("SELECT * FROM asignatura WHERE id = ?", id).Scan(&topic)

	c.JSON(200, gin.H{
		"topic": topic,
	})
}

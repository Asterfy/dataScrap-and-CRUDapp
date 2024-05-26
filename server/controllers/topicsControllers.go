package controllers

import (
	"github.com/asterfy/go-crud/initializers"
	"github.com/asterfy/go-crud/models"
	"github.com/gin-gonic/gin"
)

func GetTopics(c *gin.Context) {
	//Get data
	var topics []models.Asignatura
	initializers.DB.Raw("SELECT * FROM asignatura ORDER BY id").Scan(&topics)

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

func CreateTopic(c *gin.Context) {
	var body struct {
		Codigo       string
		Nombre       string
		Nro_creditos int
		Categoria    string
		Requisito    string
		Semestre     int
	}

	c.Bind(&body)

	initializers.DB.Exec("INSERT INTO asignatura (codigo, nombre, nro_creditos, categoria, requisito, semestre) VALUES (?, ?, ?, ?, ?, ?)", body.Codigo, body.Nombre, body.Nro_creditos, body.Categoria, body.Requisito, body.Semestre)

	c.JSON(200, gin.H{
		"topic":   body,
		"message": "Asignatura creada",
	})
}

func PutTopic(c *gin.Context) {
	id := c.Param("id")

	var topic models.Asignatura
	initializers.DB.Raw("SELECT * FROM asignatura WHERE id = ?", id).Scan(&topic)

	var body struct {
		Codigo       string
		Nombre       string
		Nro_creditos int
		Categoria    string
		Requisito    string
		Semestre     int
	}
	c.Bind(&body)

	topic.Codigo = body.Codigo
	topic.Nombre = body.Nombre
	topic.Categoria = body.Categoria
	topic.Requisito = body.Requisito

	topic.Nro_creditos = body.Nro_creditos
	topic.Semestre = body.Semestre

	initializers.DB.Exec("UPDATE asignatura SET codigo = ?, nombre = ?, nro_creditos = ?, categoria = ?, requisito = ?, semestre = ? WHERE id = ?", topic.Codigo, topic.Nombre, topic.Nro_creditos, topic.Categoria, topic.Requisito, topic.Semestre, id)

	c.JSON(200, gin.H{
		"topic":   topic,
		"message": "Asignatura actualizada",
	})
}

func DeleteTopic(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Exec("DELETE FROM asignatura WHERE id = ?", id)

	c.JSON(200, gin.H{
		"message": "Asignatura eliminada",
	})
}

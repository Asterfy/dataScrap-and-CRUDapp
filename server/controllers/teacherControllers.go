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

func GetTeacher(c *gin.Context) {
	id := c.Param("id")
	//Get data
	var teacher models.Docente
	initializers.DB.Raw("SELECT * FROM docente WHERE id = ?", id).Scan(&teacher)

	c.JSON(200, gin.H{
		"teacher": teacher,
	})
}

func CreateTeacher(c *gin.Context) {
	var body struct {
		Apellido_materno string
		Apellido_paterno string
		Nombre           string
	}
	c.Bind(&body)

	initializers.DB.Exec("INSERT INTO docente (apellido_materno, apellido_paterno, nombre) VALUES (?, ?, ?)", body.Apellido_materno, body.Apellido_paterno, body.Nombre)

	c.JSON(200, gin.H{
		"teacher": body,
		"message": "Docente creado",
	})
}

func PutTeacher(c *gin.Context) {
	id := c.Param("id")

	var teacher models.Docente
	initializers.DB.Raw("SELECT * FROM docente WHERE id = ?", id).Scan(&teacher)

	var body struct {
		Apellido_materno string
		Apellido_paterno string
		Nombre           string
	}
	c.Bind(&body)

	teacher.Apellido_materno = body.Apellido_materno
	teacher.Apellido_paterno = body.Apellido_paterno
	teacher.Nombre = body.Nombre

	initializers.DB.Exec("UPDATE docente SET apellido_materno = ?, apellido_paterno = ?, nombre = ? WHERE id = ?", teacher.Apellido_materno, teacher.Apellido_paterno, teacher.Nombre, id)

	c.JSON(200, gin.H{
		"teacher": teacher,
		"message": "Docente actualizado",
	})
}

func DeleteTeacher(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Exec("DELETE FROM docente WHERE id = ?", id)

	c.JSON(200, gin.H{
		"message": "Docente eliminado",
	})
}

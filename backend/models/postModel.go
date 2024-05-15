package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Title string
	Body  string
}

type Asignatura struct {
	gorm.Model
	Codigo       string
	Nombre       string
	Nro_creditos int
	Categoria    string
	Requisito    string
	Semestre     int
}

type Docente struct {
	gorm.Model
	Nombre           string
	Apellido_paterno string
	Apellido_materno string
}

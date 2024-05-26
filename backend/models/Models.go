package models

import "gorm.io/gorm"

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

import psycopg2
import json

#Función para obtener los cursos
def get_topics(cursos):
    set_topics= set()
    array_topics = []
    for key in cursos:
        curso = cursos.get(key)
        topic = curso["Nombre"].rstrip()
        nro_creditos = curso["Creditos"]
        if topic not in set_topics:
            topic_obj = {
                "Codigo": key,
                "Nombre": topic,
                "Categoria": curso["Categoria"],
                "Semestre": curso["Semestre"],
                "Requisito": curso["Requisito"],
                "Creditos": int(nro_creditos)
            }
            set_topics.add(topic)
            array_topics.append(topic_obj)
    return array_topics

#Función para obtener los horarios
def get_teachers(cursos):
    set_names = set()
    for key in cursos:
        for horario in cursos.get(key)["Horario"]:
            name = horario["Docente"]
            if name:
                if len(name) > 1:
                    set_names.add(name.rstrip())

    array_names = []
    for name in set_names:
        name_split = name.split("-")
        teacher = {
            "Apellido_paterno": name_split[0].capitalize() ,
            "Apellido_materno": name_split[1].capitalize(),
            "Nombre": name_split[-1].title()
        }
        array_names.append(teacher)
    return array_names

#Insertar datos en PostgreeSQL
def create_conection():
    conn = psycopg2.connect(database="db_univ",
                            host="localhost",
                            user="postgres",
                            password="1234",
                            port="5432")
    cursor = conn.cursor()
    return cursor, conn

#Insertar cursos
def insert_topics(topics):    
    cursor, conn = create_conection()
    for topic in topics:
        if not topic["Semestre"]:
            topic["Semestre"] = 0
        cursor.execute("INSERT INTO asignatura (codigo, nombre, nro_creditos, categoria, requisito, semestre) VALUES (%s, %s, %s, %s, %s, %s)",
                       (topic["Codigo"], topic["Nombre"], topic["Creditos"], topic["Categoria"], topic["Requisito"], int(topic["Semestre"]) ))
        conn.commit()
    print("Cursos insertados en la tabla: asignatura")
#Insertar docentes
def insert_teachers(teachers):
    cursor, conn = create_conection()
    for teacher in teachers:
        cursor.execute("INSERT INTO docente (nombre, apellido_paterno, apellido_materno) VALUES (%s, %s, %s)",
                       (teacher["Nombre"], teacher["Apellido_paterno"], teacher["Apellido_materno"]))
        conn.commit()
    print("Docentes insertados en la tabla: docente")

# Leer archivo JSON
with open('data_horarios.json') as archivo:
    horarios = json.load(archivo)

#Generar arreglos de cursos y docentes
topics = get_topics(horarios)
teachers = get_teachers(horarios)


#Insertar data en PostgreeSQL
# insert_topics(topics)
# insert_teachers(teachers)
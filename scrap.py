import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
import psycopg2

#Función para obtener el día de la semana
def getDay(char):
  if char:
    chars = ["lu", "ma","mi","ju","vi","sa"]
    dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    return dias[chars.index(char.lower())]
  else:
    return ""

#Función para obtener los datos de los cursos
def scrap_data(link):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')
    enlaces = soup.find_all('tr')
    #Iniciar diccionario de cursos
    cursos = {}
    #Recorrer cada tr identificado en el catálogo
    for tr in enlaces:
        #Analizar la longitud del tr
        long_tr = len(tr)
        #Extraer los td del tr actual
        html = str(tr)
        newSoup = BeautifulSoup(html, "html.parser")
        celdas_tr = newSoup.find_all("td")
        #Analizar y agregar datos
        if long_tr == 20:
            #Extraer datos de curso
            cod_curso = celdas_tr[1].string
            name_curso = celdas_tr[2].string
            nro_cred = celdas_tr[4].string
            categoria = celdas_tr[5].string
            requisito = celdas_tr[6].string
            nro_semestre = celdas_tr[7].string
            #Agregar curso
            cursos[cod_curso] = {
                "Nombre": name_curso,
                "Categoria": categoria,
                "Requisito": requisito,
                "Semestre": nro_semestre,
                "Creditos": nro_cred,
                "Horario":[]
            }
        if long_tr == 9:
            #Extraer datos de horario
            docente = celdas_tr[0].string
            dia = celdas_tr[1].string
            hora = celdas_tr[2].string
            tipo = celdas_tr[3].string
            salon = celdas_tr[5].string
            #Crear diccionario
            dicc_horario = {
                "Docente": docente,
                "Dia": getDay(dia),
                "Hora": hora,
                "Tipo": tipo,
                "Salón": salon
            }
            #Agregar datos
            cursos[cod_curso]["Horario"].append(dicc_horario)
    
    return cursos

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

#Obtención de datos
link_catalogo_informatica = 'http://ccomputo.unsaac.edu.pe/index.php?op=catalog&dt=vCvqh09qWpsFWFbFxs**'
cursos = scrap_data(link_catalogo_informatica)
topics = get_topics(cursos)
teachers = get_teachers(cursos)

#Insertar datos en mongoDB
def insert_docs(array_docs, db_name, db_collection):
    # Conexión a la base de datos MongoDB
    cliente = MongoClient('localhost', 27017)
    db = cliente[db_name]
    coleccion = db[db_collection]
    # Insertar los documentos en la base de datos
    coleccion.insert_many(array_docs)
    # Cerrar la conexión a la base de datos
    cliente.close()
    print("Documentos insertados en la colección:", db_collection)

#Insertar cursos
# insert_docs(topics, "db_universidad", "Asignaturas")
#Insertar docentes
# insert_docs(teachers, "db_universidad", "Docentes")


#Insertar datos en PostgreeSQL
conn = psycopg2.connect(database="db_univ",
                        host="localhost",
                        user="postgres",
                        password="1234",
                        port="5432")

cursor = conn.cursor()
#Insertar cursos
def insert_topics(topics):    
    for topic in topics:
        if not topic["Semestre"]:
            topic["Semestre"] = 0
        cursor.execute("INSERT INTO asignatura (codigo, nombre, nro_creditos, categoria, requisito, semestre) VALUES (%s, %s, %s, %s, %s, %s)",
                       (topic["Codigo"], topic["Nombre"], topic["Creditos"], topic["Categoria"], topic["Requisito"], int(topic["Semestre"]) ))
        conn.commit()
    print("Cursos insertados en la tabla: asignatura")
#Insertar docentes
def insert_teachers(teachers):
    for teacher in teachers:
        cursor.execute("INSERT INTO docente (nombre, apellido_paterno, apellido_materno) VALUES (%s, %s, %s)",
                       (teacher["Nombre"], teacher["Apellido_paterno"], teacher["Apellido_materno"]))
        conn.commit()
    print("Docentes insertados en la tabla: docente")

insert_topics(topics)
# insert_teachers(teachers)


import requests
import json
from bs4 import BeautifulSoup

#Función para obtener el día de la semana
def getDay(char):
  if char:
    chars = ["lu", "ma","mi","ju","vi","sa"]
    dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
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
                "Salon": salon
            }
            #Agregar datos
            cursos[cod_curso]["Horario"].append(dicc_horario)
            
    json_string = json.dumps(cursos)

    with open('data_horarios.json', 'w') as file:
        file.write(json_string)
    return cursos
#Obtención de datos
link_catalogo_informatica = 'http://ccomputo.unsaac.edu.pe/index.php?op=catalog&dt=vCvqh09qWpsFWFbFxs**'
cursos = scrap_data(link_catalogo_informatica)
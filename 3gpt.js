let atrasBtn = document.getElementById('atras')
let guardarBtn = document.getElementById('guardar')
let tablaPreguntas = document.getElementById('preguntasTable')
let textoCarga =document.getElementById('carga')
let pregunta = document.getElementById('pregunta')
let puntuacion = document.getElementById('puntuacion')
let radios = document.getElementsByName("respuesta")
let puntuacionReg = /^[0-9]$/
let compPreg = false
let compPunt = false
let compResp = false

// Mostrar las preguntas almacenadas al cargar la página
// Si es true pondra un retraso de 5 segundos antes de mostrar las preguntas
window.addEventListener('load', function () {
    mostrarPreguntas(window.confirm("Poner un delay?"))
})

atrasBtn.addEventListener('click', function () {
    try {
        window.location = "index2.html"
    } catch (error) {
        console.error("Error en la redirección:", error)
        window.alert("No se pudo redirigir a la pantalla anterior.")
    }
})

// Comprobar si pregunta esta vacio
pregunta.addEventListener('blur', function () {
    let preguntaRealizada = pregunta.value
    if (preguntaRealizada !== '') {
        compPreg = true
    } else {
        compPreg = false
        window.alert("Necesitas una pregunta que hacer.")
    }
})

// comprobar si la pregunta tiene una puntuacion
puntuacion.addEventListener('blur', function () {
    let puntuacionOtorgada = puntuacion.value
    if (puntuacionReg.test(puntuacionOtorgada)) {
        compPunt = true
    } else {
        compPunt = false
        window.alert("La puntuación tiene que ser un número entero de un dígito.")
    }
})

// guardar la pregunta
guardarBtn.addEventListener('click', function () {
    //obtener el valor de la respuesta
    let seleccionado = null
    for (let radio of radios) {
        if (radio.checked) {
            seleccionado = radio.value
        }
    }

    //Comprueba si seleccionado esta vacio
    if (seleccionado == null) {
        //si esta vacio no se guardara la pregunta
        compResp = false
        window.alert("Necesitas seleccionar el valor de la respuesta.")
    } else {
        compResp = true
        //si los campos son correctos intenta guardar la pregunta
        if (compPreg==true && compPunt==true && compResp==true) {
            let preguntaRealizada = pregunta.value
            let puntuacionOtorgada = puntuacion.value

            // Mostrar "Guardando..." en la tabla
            agregarFilaTemporal(preguntaRealizada, seleccionado, puntuacionOtorgada)

            // Simular guardado con retraso de 5 segundos
            setTimeout(function () {
                try {
                    let estado = guardarPregunta(preguntaRealizada, seleccionado, puntuacionOtorgada)
                    actualizarEstadoFila(preguntaRealizada, estado)
                } catch (error) {
                    console.error("Error al guardar la pregunta:", error)
                    actualizarEstadoFila(preguntaRealizada, "ERROR")
                }
            }, 5000)

            // Reiniciar el formulario
            resetFormulario()
        } else {
            window.alert("Algún valor no es válido. Verifica los campos.")
        }
    }
})

// Vaciar el formulario
function resetFormulario() {
    pregunta.value = ""
    puntuacion.value = ""
    for (let radio of radios) {
        radio.checked = false
    }
    //reiniciar los bool
    compPreg = false
    compPunt = false
    compResp = false
}

// Guarda una pregunta en las cookies
function guardarPregunta(pregunta, respuesta, puntuacion) {
    let preguntas = JSON.parse(getCookie("preguntas") || "[]")
    preguntas.push({
        pregunta,
        respuesta,
        puntuacion
    })
    // Devuelve "OK" si se guarda correctamente
    setCookie("preguntas", JSON.stringify(preguntas), 1)
    return "OK"
}

// Muestra las preguntas almacenadas en las cookies
// Si retraso==true pondra un retraso de 5 segundos para mostrar las preguntas ya guardadas
function mostrarPreguntas(retraso) {
    if (retraso==true) {
        textoCarga.textContent = "Cargando preguntas..."
        setTimeout(cargarPreguntasDesdeCookie, 5000)
    } else {
        cargarPreguntasDesdeCookie()
    }
}

// Carga las preguntas desde las cookies y las muestra en la tabla
function cargarPreguntasDesdeCookie() {
    textoCarga.textContent=""
    let preguntas = JSON.parse(getCookie("preguntas") || "[]")
    preguntas.forEach((pregunta, index) => {
        agregarFilaTabla(index + 1, pregunta.pregunta, pregunta.respuesta, pregunta.puntuacion, "OK")
    })
}

// Agrega una fila a la tabla de preguntas con los datos proporcionados
function agregarFilaTabla(numero, pregunta, respuesta, puntuacion, estado) {
    let fila = document.createElement("tr")
    fila.innerHTML = `<td>${numero}</td>
        <td>${pregunta}</td>
        <td>${respuesta}</td>
        <td>${puntuacion}</td>
        <td>${estado}</td>`
    tablaPreguntas.appendChild(fila)
}

// Agrega una fila temporal a la tabla con estado "Guardando..."
function agregarFilaTemporal(pregunta, respuesta, puntuacion) {
    let fila = document.createElement("tr")
    // Identificar la fila por la pregunta
    fila.dataset.pregunta = pregunta 
    fila.innerHTML = `<td>-</td>
        <td>${pregunta}</td>
        <td>${respuesta}</td>
        <td>${puntuacion}</td>
        <td>Guardando...</td>`
    tablaPreguntas.appendChild(fila)
}

// cambiar el estado de la pregunta a OK o Error
function actualizarEstadoFila(pregunta, estado) {
    let filas = tablaPreguntas.querySelectorAll("tr")
    for (let fila of filas) {
        if (fila.dataset.pregunta === pregunta) {
            fila.cells[4].textContent = estado
            if (estado === "ERROR") {
                fila.style.color = "red"
            }
            break
        }
    }
}

// codigo cookies
function setCookie(cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    let name = cname + "="
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim()
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/"
}

let atrasBtn = document.getElementById('atras')
let guardarBtn = document.getElementById('guardar')
let tablaPreguntas = document.getElementById('preguntasTable')
let textoCarga = document.getElementById('carga')
let pregunta = document.getElementById('pregunta')
let puntuacion = document.getElementById('puntuacion')
let radios = document.getElementsByName("respuesta")
let puntuacionReg = /^[0-9]$/
let compPreg = false
let compPunt = false
let compResp = false

// Función para simular un retraso con promesas
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

// Mostrar las preguntas almacenadas al cargar la página con o sin retraso
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

// Comprobar si el campo de la pregunta está vacío
pregunta.addEventListener('blur', function () {
    let preguntaRealizada = pregunta.value
    if (preguntaRealizada !== '') {
        compPreg = true
    } else {
        compPreg = false
        window.alert("Necesitas una pregunta que hacer.")
    }
})

// Comprobar si el campo de puntuación tiene un valor válido
puntuacion.addEventListener('blur', function () {
    let puntuacionOtorgada = puntuacion.value
    if (puntuacionReg.test(puntuacionOtorgada)) {
        compPunt = true
    } else {
        compPunt = false
        window.alert("La puntuación tiene que ser un número entero de un dígito.")
    }
})

// Guardar la pregunta
guardarBtn.addEventListener('click', function () {
    let seleccionado = null
    for (let radio of radios) {
        if (radio.checked) {
            seleccionado = radio.value
        }
    }

    if (seleccionado == null) {
        compResp = false
        window.alert("Necesitas seleccionar el valor de la respuesta.")
    } else {
        compResp = true
        if (compPreg && compPunt && compResp) {
            let preguntaRealizada = pregunta.value
            let puntuacionOtorgada = puntuacion.value

            // Mostrar "Guardando..." en la tabla
            agregarFilaTemporal(preguntaRealizada, seleccionado, puntuacionOtorgada)

            // Guardar la pregunta con un retraso de 5 segundos usando promesas
            delay(5000)
                .then(() => {
                    try {
                        let estado = guardarPregunta(preguntaRealizada, seleccionado, puntuacionOtorgada)
                        actualizarEstadoFila(preguntaRealizada, estado)
                    } catch (error) {
                        console.error("Error al guardar la pregunta:", error)
                        actualizarEstadoFila(preguntaRealizada, "ERROR")
                    }
                })
        } else {
            window.alert("Algún valor no es válido. Verifica los campos.")
        }
    }
})



// Guarda una pregunta en las cookies
function guardarPregunta(pregunta, respuesta, puntuacion) {
    let preguntas = JSON.parse(getCookie("preguntas") || "[]")
    preguntas.push({
        pregunta,
        respuesta,
        puntuacion
    })
    setCookie("preguntas", JSON.stringify(preguntas), 1)
    return "OK"
}

// Mostrar las preguntas almacenadas en las cookies con o sin retraso
function mostrarPreguntas(retraso) {
    if (retraso) {
        textoCarga.textContent = "Cargando preguntas..."
        delay(5000).then(() => cargarPreguntasDesdeCookie())
    } else {
        cargarPreguntasDesdeCookie()
    }
}

// Carga las preguntas desde las cookies y las muestra en la tabla
function cargarPreguntasDesdeCookie() {
    textoCarga.textContent = ""
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
    fila.dataset.pregunta = pregunta
    fila.innerHTML = `<td>-</td>
        <td>${pregunta}</td>
        <td>${respuesta}</td>
        <td>${puntuacion}</td>
        <td>Guardando...</td>`
    tablaPreguntas.appendChild(fila)
}

// Cambiar el estado de la pregunta a "OK" o "ERROR"
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

// Manejo de cookies
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

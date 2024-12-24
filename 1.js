const div1=document.getElementById('div1')
const body=document.body
const boton=document.getElementById('btn')
const label =document.getElementById('nombre')
let correoVal =false

body.addEventListener('keydown', function(event){
    if (event.key=='F12'&&event.altKey){
        ocultarDiv1()
    }
})

setTimeout(ocultarDiv1, 5000);

function ocultarDiv1(){
    document.getElementById('h1').textContent=""
    div1.className="oculto"
}

label.addEventListener('blur',function(){
    let nombre=document.getElementById('nombre').value
    let esCorreo=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (esCorreo.test(nombre)){
        boton.className=""
    }else{
        window.alert("el usuario tiene que ser un correo")
        boton.className = "des"
    }
})

boton.addEventListener('click', function () {
    let correo = document.getElementById('nombre').value
    let fechaActual = new Date().toISOString()
    let correoUsuario = correo
    if (getCookie(correoUsuario)) {
        // Obtener valor actual de la cookie
        let cookieActual = getCookie(correoUsuario)

        // Descomponer la cookie en sus valores
        let [correoCookie, fechaAnterior, ultimaFecha] = cookieActual.split(',')

        // Comprobar si el correo coincide (opcional si se usa nombre único)
        if (correoCookie === correo) {
            // Actualizar la cookie con las nuevas fechas
            let nuevoValor = `${correo},${ultimaFecha},${fechaActual}`
            setCookie('correoUsuario', nuevoValor, 100) // Actualizar cookie (1 día de duración)
        }
    } else {
        // Crear nueva cookie si no existe
        let nuevoValor = `${correo},${fechaActual},${fechaActual}`
        setCookie('correoUsuario', nuevoValor, 100) // Crear cookie (1 día de duración)
    }
    try {
        window.location = "index2.html"
    } catch (error) {
        console.error("Error en la redirección:", error)
        window.alert("No se pudo redirigir a la siguiente pantalla.")
    }
})

//codigo cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
    }
    return "";
}

function deleteCookie(cname) {
    document.cookie = cname+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    }







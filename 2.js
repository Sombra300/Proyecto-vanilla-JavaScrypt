let datosCookie=getCookie('correoUsuario')
let [correoCookie, fechaAnterior, ultimaFecha]=datosCookie.split(',')
let h1=document.getElementById('h1')
let h2=document.getElementById('h2')
let boton=document.getElementById('btn')
h1.textContent=`Hola ${correoCookie}`
h2.textContent=`Tu ultima sesion fue ${fechaAnterior}`


boton.addEventListener('click', function () {
    try {
        window.location = "index3.html"
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

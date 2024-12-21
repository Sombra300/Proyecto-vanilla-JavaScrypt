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
    div1.className="oculto"
    document.getElementById('h1').textContent=""
}

label.addEventListener('blur',function(){
    let nombre=document.getElementById('nombre').value
    let esCorreo=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (esCorreo.test(nombre)){
        console.log('se guardara como '+nombre)
        boton.className=""
    }else{
        window.alert("el usuario tiene que ser un correo")
    }
})

if(correoVal==true){
    boton.className=''
}

boton.addEventListener('click', function(){
    setCookie('nombreUsuario') 
    //window.location.href="index2.html"
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


function checkCookie() {
    var user = getCookie("guardaNombre");
    if (user != "") {
        textoCambia.textContent='Hola '+user
    } else {
       
    }
}
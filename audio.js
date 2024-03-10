var audioFondo;
const audioError = new Audio("media/SonidoError.mp3");  
var reproducirAudio = false;

document.addEventListener("DOMContentLoaded", function() {
    var htmlFile = document.querySelector('script[data-html-file]').getAttribute('data-html-file');
    console.log("El archivo HTML que llama a archivo.js es:", htmlFile);

    if(htmlFile === "index.html" || htmlFile === "registro.html"){
        audioFondo = new Audio("media/SonidoMenu_JungleWildlife.mp3"); 
    }
    else if(htmlFile === "juego.html" || htmlFile === "juego2.html"){
        audioFondo = new Audio("media/SonidoJuego_Guinea.mp3"); 
    }
});

console.log("Creando Botón");
var boton = document.createElement("button"); 
boton.id = "boton-audio";
boton.innerHTML = "<i class='fa-solid fa-play'></i>";
document.getElementById("div-audio").appendChild(boton);

function reproducir() {
    console.log("Reproduciendo Música");
    audioFondo.play();
}

function pausar() {
    console.log("Pausando Música");
    audioFondo.pause();
}

document.getElementById("boton-audio").addEventListener("click", function(){
    reproducirAudio = !reproducirAudio;
    console.log("Bandera de Reproducir Audio: "+reproducirAudio);

    if(reproducirAudio){
        boton.innerHTML = "<button id='boton-audio'> <i class='fa-solid fa-pause'></i> </button>";
        reproducir();
    }
    else{
        boton.innerHTML = "<button id='boton-audio'> <i class='fa-solid fa-play'></i> </button>";
        pausar();
    }
});

/*
window.onload = function() {
    
}
*/
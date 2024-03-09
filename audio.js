const audioMenu = new Audio("media/SonidoMenu_JungleWildlife.mp3"); 
const audioJuego = new Audio("media/SonidoJuego_Guinea.mp3"); 
const audioError = new Audio("media/SonidoError.mp3");  
var reproducirAudio = false;

console.log("Creando Botón");
var boton = document.createElement("button"); 
boton.id = "boton-audio";
boton.innerHTML = "<i class='fa-solid fa-play'></i>";
document.getElementById("div-audio").appendChild(boton);

function reproducir() {
    console.log("Reproduciendo Música");
    audioMenu.play();
}

function pausar() {
    console.log("Pausando Música");
    audioMenu.pause();
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
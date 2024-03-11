var inicio = new Date();
var segundosAcumulados = 0;
console.log("Fecha de Inicio: "+inicio);

var escenarios=localStorage.getItem("escenarios");
escenarios=JSON.parse(escenarios);

var reacomodo = [escenarios[0], escenarios[1], escenarios[2]];
shuffle(reacomodo);
localStorage.setItem("reacomodo", JSON.stringify(reacomodo));

var nuevoOrden=localStorage.getItem("reacomodo");
nuevoOrden=JSON.parse(nuevoOrden);

//Sonidos de Animales
const sonidoAnimal1 = new Audio("media/animal"+(nuevoOrden[0] + 1)+".mp3");
const sonidoAnimal2 = new Audio("media/animal"+(nuevoOrden[1] + 1)+".mp3");
const sonidoAnimal3 = new Audio("media/animal"+(nuevoOrden[2] + 1)+".mp3");

const audioError = new Audio("media/SonidoError.mp3");  
var aciertos = 0;
var puntos = 0;

var jugador=localStorage.getItem("jugador");
jugador=JSON.parse(jugador);

function validar(){
    if(jugador!==null){
        window.addEventListener('load', juego, false);
        juego();
        cronometro();
    }
    else{
        window.location.replace("index.html");
    }
}

function juego(){
    var imagenesCasas = document.getElementById('casas');
    var nombres = document.getElementById('nombres');
    var imagenesAnimales = document.getElementById('imagenesAnimales');

    soltar = ["soltar"+escenarios[0]+1, "soltar"+escenarios[1]+1, "soltar"+escenarios[2]+1];
    lienzo = ["lienzo"+escenarios[0]+1, "lienzo"+escenarios[1]+1, "lienzo"+escenarios[2]+1];

    for(var i=0; i<3; i++){
        
        var nuevaCasa = document.createElement("canvas");
        var nuevoNombre = document.createElement("p");
        var nuevoAnimal = document.createElement("img");

        nuevaCasa.id = "casa" + (escenarios[i] + 1);
        nuevaCasa.width = "300";
        nuevaCasa.height = "200";

        nuevoNombre.id = "nombre" + (escenarios[i] + 1);
        nombres.appendChild(nuevoNombre);
        switch(nuevoNombre.id){
            case ("nombre1"):{
                document.getElementById("nombre1").innerHTML = "Mono";
                break;
            }
            case ("nombre2"):{
                document.getElementById("nombre2").innerHTML = "Serpiente";
                break;
            }
            case ("nombre3"):{
                document.getElementById("nombre3").innerHTML = "Jaguar";
                break;
            }
            case ("nombre4"):{
                document.getElementById("nombre4").innerHTML = "Camaleón";
                break;
            }
            case ("nombre5"):{
                document.getElementById("nombre5").innerHTML = "Rana";
                break;
            }
            case ("nombre6"):{
                document.getElementById("nombre6").innerHTML = "Caimán";
                break;
            }
            case ("nombre7"):{
                document.getElementById("nombre7").innerHTML = "Jabalí";
                break;
            }
            case ("nombre8"):{
                document.getElementById("nombre8").innerHTML = "Araña";
                break;
            }
            case ("nombre9"):{
                document.getElementById("nombre9").innerHTML = "Guacamaya";
                break;
            }
        }

        nuevoAnimal.id = "animal" + (reacomodo[i] + 1);
        nuevoAnimal.src = "images/animal" + (reacomodo[i] + 1) + ".png";
        nuevoAnimal.addEventListener('dragstart', arrastrado, false);
        nuevoAnimal.addEventListener('dragend', finalizado, false);

        imagenesCasas.appendChild(nuevaCasa);
        imagenesAnimales.appendChild(nuevoAnimal);

        /*imagenesCasas[ escenarios[i] ].style.display = 'block';
        imagenesAnimales[ escenarios[i] ].style.display = 'block';

        imagenesAnimales[ escenarios[i] ].addEventListener('dragstart', arrastrado, false);
        imagenesAnimales[ escenarios[i] ].addEventListener('dragend', finalizado, false);*/
    }

    soltar[escenarios[0]] = document.getElementById('casa' + (escenarios[0] + 1));
    lienzo[escenarios[0]] = soltar[escenarios[0]].getContext('2d');
    soltar[escenarios[0]].addEventListener('dragenter', eventoEnter, false);
    soltar[escenarios[0]].addEventListener('dragover', eventoOver, false);
    soltar[escenarios[0]].addEventListener('drop', soltado, false);

    soltar[escenarios[1]] = document.getElementById('casa' + (escenarios[1] + 1));
    lienzo[escenarios[1]] = soltar[escenarios[1]].getContext('2d');
    soltar[escenarios[1]].addEventListener('dragenter', eventoEnter, false);
    soltar[escenarios[1]].addEventListener('dragover', eventoOver, false);
    soltar[escenarios[1]].addEventListener('drop', soltado, false);

    soltar[escenarios[2]] = document.getElementById('casa' + (escenarios[2] + 1));
    lienzo[escenarios[2]] = soltar[escenarios[2]].getContext('2d');
    soltar[escenarios[2]].addEventListener('dragenter', eventoEnter, false);
    soltar[escenarios[2]].addEventListener('dragover', eventoOver, false);
    soltar[escenarios[2]].addEventListener('drop', soltado, false);
}

function shuffle(arreglo){
    arreglo.sort(()=>Math.random()-0.5);
}

function eventoEnter(e){
    console.log("Soy el evento dragenter");
    e.preventDefault();
}

function eventoOver(e){
    console.log("Soy el evento dragover");
    e.preventDefault();
}

function finalizado(e){
    elemento = e.target;
    //elemento.style.visibility = 'hidden';
}

function arrastrado(e){
    console.log("Soy el evento arrastrado");
    elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, 0, 0);
}

function soltado(e){
    e.preventDefault();

    var orden=localStorage.getItem("escenarios");
    orden=JSON.parse(orden);

    var id = e.dataTransfer.getData('Text');
    var img = new Image();
    img.src = document.getElementById(id).src;
    var soltarId = e.target.id;
    switch(id){
        case ("animal" + (nuevoOrden[0] + 1)):{
            var posX = e.pageX - soltar[nuevoOrden[0]].offsetLeft; //Coordenada X para el soltado
            var posY = e.pageY - soltar[nuevoOrden[0]].offsetTop; //Coordenada Y para el soltado
            img.onload = function() {
                lienzo[nuevoOrden[0]].drawImage(img, posX, posY);
                if(soltarId == ("casa" + (nuevoOrden[0] + 1))){
                    puntos += 3;
                    aciertos++;
                    document.getElementById("nombre" + (nuevoOrden[0] + 1)).style.visibility = "visible";
                    document.getElementById("puntos-juego").innerHTML = "⭐: " + puntos;
                    localStorage.setItem("puntos", puntos);
                    //Reproducir sonido del animal
                    sonidoAnimal1.play();
                    sonidoAnimal2.pause();
                    sonidoAnimal3.pause();

                    console.log("El animal: "+ (nuevoOrden[0] + 1)+" ha llegado a casa");
                    elemento.style.visibility = 'hidden';
                }
                else{
                    puntos -= 2;
                    document.getElementById("puntos-juego").innerHTML = "⭐: " + puntos;
                    localStorage.setItem("puntos", puntos);
                    audioError.play();
                    if(!sonidoAnimal1.paused) sonidoAnimal1.pause();
                    if(!sonidoAnimal2.paused) sonidoAnimal2.pause();
                    if(!sonidoAnimal3.paused) sonidoAnimal3.pause();
                }
            };
            break;
        }
        case ("animal" + (nuevoOrden[1] + 1)):{
            var posX = e.pageX - soltar[nuevoOrden[1]].offsetLeft; //Coordenada X para el soltado
            var posY = e.pageY - soltar[nuevoOrden[1]].offsetTop; //Coordenada Y para el soltado
            img.onload = function() {
                lienzo[nuevoOrden[1]].drawImage(img, posX, posY);
                if(soltarId == ("casa" + (nuevoOrden[1] + 1))){
                    puntos += 3;
                    aciertos++;
                    document.getElementById("nombre" + (nuevoOrden[1] + 1)).style.visibility = "visible";
                    document.getElementById("puntos-juego").innerHTML = "⭐: " + puntos;
                    localStorage.setItem("puntos", puntos);
                    //Reproducir sonido del animal
                    sonidoAnimal1.pause();
                    sonidoAnimal2.play();
                    sonidoAnimal3.pause();

                    console.log("El animal: "+ (nuevoOrden[1] + 1)+" ha llegado a casa");
                    elemento.style.visibility = 'hidden';
                }
                else{
                    puntos -= 2;
                    document.getElementById("puntos-juego").innerHTML = "⭐: " + puntos;
                    localStorage.setItem("puntos", puntos);
                    audioError.play();
                    if(!sonidoAnimal1.paused) sonidoAnimal1.pause();
                    if(!sonidoAnimal2.paused) sonidoAnimal2.pause();
                    if(!sonidoAnimal3.paused) sonidoAnimal3.pause();
                }
            };
            break;
        }
        case ("animal" + (nuevoOrden[2] + 1)):{
            var posX = e.pageX - soltar[nuevoOrden[2]].offsetLeft; //Coordenada X para el soltado
            var posY = e.pageY - soltar[nuevoOrden[2]].offsetTop; //Coordenada Y para el soltado
            img.onload = function() {
                lienzo[nuevoOrden[2]].drawImage(img, posX, posY);
                if(soltarId == ("casa" + (nuevoOrden[2] + 1))){
                    puntos += 3;
                    aciertos++;
                    document.getElementById("nombre" + (nuevoOrden[2] + 1)).style.visibility = "visible";
                    document.getElementById("puntos-juego").innerHTML = "⭐: " + puntos;
                    localStorage.setItem("puntos", puntos);
                    //Reproducir sonido del animal
                    sonidoAnimal1.pause();
                    sonidoAnimal2.pause();
                    sonidoAnimal3.play();

                    console.log("El animal: "+ (nuevoOrden[2] + 1)+" ha llegado a casa");
                    elemento.style.visibility = 'hidden';
                }
                else{
                    puntos -= 2;
                    document.getElementById("puntos-juego").innerHTML = "⭐: " + puntos;
                    localStorage.setItem("puntos", puntos);
                    audioError.play();
                    if(!sonidoAnimal1.paused) sonidoAnimal1.pause();
                    if(!sonidoAnimal2.paused) sonidoAnimal2.pause();
                    if(!sonidoAnimal3.paused) sonidoAnimal3.pause();
                }
            };
            break;
        }
        default:{
            console.log("Error");
            break;
        }
    }
}

function calcularTiempo(){
    var fin = new Date();
    var tiempo = (fin-inicio)/1000;
    console.log("Tiempo: "+tiempo);

    var jugador = localStorage.getItem("jugador");
    jugador = JSON.parse(jugador);

    console.log("Nombre: "+jugador.nombre);
    console.log("Tiempo: "+jugador.tiempo);

    if(tiempo < jugador.tiempo || jugador.tiempo===0){
        console.log("Actualizando el tiempo...");

        var usuarios = localStorage.getItem("usuarios");
        usuarios = JSON.parse(usuarios);

        var usuariosAux = [];
        var usuarioAux;

        for(var i in usuarios){
            var usuario = JSON.parse(usuarios[i]);

            if(jugador.nombre !== usuario.nombre){
                var usuarioAux = JSON.stringify({ //El método stringify convierte un valor a notación JSON
                    nombre:usuario.nombre, 
                    puntaje:usuario.puntaje,
                    tiempo:usuario.tiempo
                });
                usuariosAux.push(usuarioAux);
            }
            else{
                var usuarioAux = JSON.stringify({ //El método stringify convierte un valor a notación JSON
                    nombre:jugador.nombre, 
                    puntaje:jugador.puntaje,
                    tiempo:tiempo
                });
                usuariosAux.push(usuarioAux);

                localStorage.removeItem("jugador");
                localStorage.setItem("jugador", usuarioAux);
            }
        }

        localStorage.removeItem("usuarios");
        localStorage.setItem("usuarios", JSON.stringify(usuariosAux));
    }
}

function siguiente(){
    if(aciertos == 3){
        //clearInterval(intervaloCronometro);
        localStorage.removeItem("segundosAcumulados");
        localStorage.setItem("segundosAcumulados", segundosAcumulados);
        //console.log("Error aqui: "+parseInt(localStorage.getItem("segundosAcumulados")));
        window.location.href = "juego2.html";
    }
}

document.getElementById("boton-salir").addEventListener("click", function(){
    window.location.href = "index.html";
});

function cronometro() {
    var div = document.getElementById('div-cronometro');
    var tiempoInicio = new Date().getTime();

    function actualizarCronometro() {
        var ahora = new Date().getTime();
        var tiempoTranscurrido = ahora - tiempoInicio;

        var minutos = Math.floor((tiempoTranscurrido % (1000 * 60 * 60)) / (1000 * 60));
        var segundos = Math.floor((tiempoTranscurrido % (1000 * 60)) / 1000);

        segundosAcumulados = segundos;
        console.log("Segundos acumulados: "+segundosAcumulados);

        minutos = (minutos < 10) ? "0" + minutos : minutos;
        segundos = (segundos < 10) ? "0" + segundos : segundos;

        div.innerHTML = "<p>Cronómetro: "+minutos + ":" + segundos+"</p>";
    }

    //Actualiza el cronómetro cada segundo
    setInterval(actualizarCronometro, 1000);
}

window.onload = function(){
    validar();
}
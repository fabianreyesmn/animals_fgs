var inicio = new Date();
console.log("Fecha de Inicio: "+inicio);

var aciertos = 0;

var jugador=localStorage.getItem("jugador");
jugador=JSON.parse(jugador);

function validar(){
    if(jugador!==null){
        window.addEventListener('load', juego, false);
        juego();
    }
    else{
        window.location.replace("index.html");
    }
}

function juego(){
    var imagenesCasas = document.getElementById('casas');
    var imagenesAnimales = document.getElementById('imagenesAnimales');

    var escenarios=localStorage.getItem("escenarios");
    escenarios=JSON.parse(escenarios);

    soltar = ["soltar"+escenarios[3]+1, "soltar"+escenarios[4]+1, "soltar"+escenarios[5]+1];
    lienzo = ["lienzo"+escenarios[3]+1, "lienzo"+escenarios[4]+1, "lienzo"+escenarios[5]+1];

    var reacomodo = [escenarios[3], escenarios[4], escenarios[5]];
    shuffle(reacomodo);
    localStorage.setItem("reacomodo", JSON.stringify(reacomodo));

    for(var i=3; i<6; i++){
        
        var nuevaCasa = document.createElement("canvas");
        var nuevoAnimal = document.createElement("img");

        nuevaCasa.id = "casa" + (escenarios[i] + 1);
        nuevaCasa.width = "300";
        nuevaCasa.height = "200";

        nuevoAnimal.id = "animal" + (reacomodo[i-3] + 1);
        nuevoAnimal.src = "images/animal" + (reacomodo[i-3] + 1) + ".png";
        nuevoAnimal.addEventListener('dragstart', arrastrado, false);
        nuevoAnimal.addEventListener('dragend', finalizado, false);

        imagenesCasas.appendChild(nuevaCasa);
        imagenesAnimales.appendChild(nuevoAnimal);

        /*imagenesCasas[ escenarios[i] ].style.display = 'block';
        imagenesAnimales[ escenarios[i] ].style.display = 'block';

        imagenesAnimales[ escenarios[i] ].addEventListener('dragstart', arrastrado, false);
        imagenesAnimales[ escenarios[i] ].addEventListener('dragend', finalizado, false);*/
    }

    soltar[escenarios[3]] = document.getElementById('casa' + (escenarios[3] + 1));
    lienzo[escenarios[3]] = soltar[escenarios[3]].getContext('2d');
    soltar[escenarios[3]].addEventListener('dragenter', eventoEnter, false);
    soltar[escenarios[3]].addEventListener('dragover', eventoOver, false);
    soltar[escenarios[3]].addEventListener('drop', soltado, false);

    soltar[escenarios[4]] = document.getElementById('casa' + (escenarios[4] + 1));
    lienzo[escenarios[4]] = soltar[escenarios[4]].getContext('2d');
    soltar[escenarios[4]].addEventListener('dragenter', eventoEnter, false);
    soltar[escenarios[4]].addEventListener('dragover', eventoOver, false);
    soltar[escenarios[4]].addEventListener('drop', soltado, false);

    soltar[escenarios[5]] = document.getElementById('casa' + (escenarios[5] + 1));
    lienzo[escenarios[5]] = soltar[escenarios[5]].getContext('2d');
    soltar[escenarios[5]].addEventListener('dragenter', eventoEnter, false);
    soltar[escenarios[5]].addEventListener('dragover', eventoOver, false);
    soltar[escenarios[5]].addEventListener('drop', soltado, false);
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
    var nuevoOrden=localStorage.getItem("reacomodo");
    nuevoOrden=JSON.parse(nuevoOrden);

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
                    elemento.style.visibility = 'hidden';
                    aciertos++;
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
                    elemento.style.visibility = 'hidden';
                    aciertos++;
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
                    elemento.style.visibility = 'hidden';
                    aciertos++;
                }
            };
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

function terminar(){
    if(aciertos == 3){
        calcularTiempo();
        window.location.href = "ganador.html";
    }
}

document.getElementById("boton-salir").addEventListener("click", function(){
    window.location.href = "index.html";
});

window.onload = function(){
    validar();
}
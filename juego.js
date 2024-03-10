var inicio = new Date();
console.log("Fecha de Inicio: "+inicio);

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

    for(var i=0; i<3; i++){
        
        var nuevaCasa = document.createElement("canvas");
        var nuevoAnimal = document.createElement("img");

        nuevaCasa.id = "casa" + (escenarios[i] + 1);
        nuevaCasa.width = "250";
        nuevaCasa.height = "250";

        nuevoAnimal.id = "animal" + (escenarios[i] + 1);
        nuevoAnimal.src = "images/animal" + (escenarios[i] + 1) + ".png";
        nuevoAnimal.addEventListener('dragstart', arrastrado, false);
        nuevoAnimal.addEventListener('dragend', finalizado, false);

        imagenesCasas.appendChild(nuevaCasa);
        imagenesAnimales.appendChild(nuevoAnimal);

        /*imagenesCasas[ escenarios[i] ].style.display = 'block';
        imagenesAnimales[ escenarios[i] ].style.display = 'block';

        imagenesAnimales[ escenarios[i] ].addEventListener('dragstart', arrastrado, false);
        imagenesAnimales[ escenarios[i] ].addEventListener('dragend', finalizado, false);*/
    }

    soltar1 = document.getElementById('casa' + (escenarios[0] + 1));
    lienzo1 = soltar1.getContext('2d');
    soltar1.addEventListener('dragenter', eventoEnter, false);
    soltar1.addEventListener('dragover', eventoOver, false);
    soltar1.addEventListener('drop', soltado, false);

    soltar2 = document.getElementById('casa' + (escenarios[1] + 1));
    lienzo2 = soltar2.getContext('2d');
    soltar2.addEventListener('dragenter', eventoEnter, false);
    soltar2.addEventListener('dragover', eventoOver, false);
    soltar2.addEventListener('drop', soltado, false);

    soltar3 = document.getElementById('casa' + (escenarios[2] + 1));
    lienzo3 = soltar3.getContext('2d');
    soltar3.addEventListener('dragenter', eventoEnter, false);
    soltar3.addEventListener('dragover', eventoOver, false);
    soltar3.addEventListener('drop', soltado, false);
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
    switch(id){
        case ("animal" + (orden[0] + 1)):{
            var posX = e.pageX - soltar1.offsetLeft; //Coordenada X para el soltado
            var posY = e.pageY - soltar1.offsetTop; //Coordenada Y para el soltado
            img.onload = function() {
                lienzo1.drawImage(img, posX, posY, 100, 100);
            };
            elemento.style.visibility = 'hidden';
            break;
        }
        case ("animal" + (orden[1] + 1)):{
            var posX = e.pageX - soltar2.offsetLeft; //Coordenada X para el soltado
            var posY = e.pageY - soltar2.offsetTop; //Coordenada Y para el soltado
            img.onload = function() {
                lienzo2.drawImage(img, posX, posY, 100, 100);
            };
            elemento.style.visibility = 'hidden';
            break;
        }
        case ("animal" + (orden[2] + 1)):{
            var posX = e.pageX - soltar3.offsetLeft; //Coordenada X para el soltado
            var posY = e.pageY - soltar3.offsetTop; //Coordenada Y para el soltado
            img.onload = function() {
                lienzo3.drawImage(img, posX, posY, 100, 100);
            };
            elemento.style.visibility = 'hidden';
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

document.getElementById("boton-salir").addEventListener("click", function(){
    calcularTiempo();
    //window.location.href = "index.html";
});

window.onload = function(){
    validar();
}
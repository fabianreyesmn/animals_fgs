var inicio = new Date();

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
    var imagenesCasas = document.querySelectorAll('#casas > canvas');
    var imagenesAnimales = document.querySelectorAll('#imagenesAnimales > img');

    var escenarios=localStorage.getItem("escenarios");
    escenarios=JSON.parse(escenarios);

    for(var i=0; i<3; i++){
        imagenesCasas[ escenarios[i] ].style.display = 'block';
        imagenesAnimales[ escenarios[i] ].style.display = 'block';

        imagenesAnimales[ escenarios[i] ].addEventListener('dragstart', arrastrado, false);
        imagenesAnimales[ escenarios[i] ].addEventListener('dragend', finalizado, false);
    }

    //Ayuda
    //Prueba de Cambio
    soltar = document.getElementById('casa6');
    lienzo = soltar.getContext('2d');
    soltar.addEventListener('dragenter', eventoEnter, false);
    soltar.addEventListener('dragover', eventoOver, false);
    soltar.addEventListener('drop', soltado, false);
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
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);
    var posX = e.pageX - soltar.offsetLeft; //Coordenada X para el soltado
    var posY = e.pageY - soltar.offsetTop; //Coordenada Y para el soltado
    lienzo.drawImage(elemento, posX, posY);

    elemento.style.visibility = 'hidden';
}

function calcularTiempo(){
    var fin = new Date();
    var tiempo = (fin-inicio)/1000;

    var jugador = localStorage.getItem("jugador");
    jugador = JSON.parse(jugador);

    //Actualizar el tiempo en caso de que sea mejor del anterior
    if(tiempo < jugador.tiempo){
        var usuarios = localStorage.getItem("usuarios");
        usuarios = JSON.parse(usuarios);

        var usuariosAux;
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
            }
        }
        localStorage.removeItem("usuarios");
        localStorage.setItem("usuarios", usuariosAux);
    }
}

window.onload = function(){
    validar();
}
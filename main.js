var nombre = "";
var registrado = false;

var usuarios=localStorage.getItem("usuarios");
usuarios=JSON.parse(usuarios);

function registrar(){
    nombre = document.getElementById("nombre").value;

    if(nombre.length>=3){
        if(usuarios==null){    
            usuarios=[];
            alta();
        }
        else{
            for(var i in usuarios){
                var usuario = JSON.parse(usuarios[i]);
                if(usuario.nombre===nombre){
                    registrado = true;
                    var datos = JSON.stringify({
                        nombre:usuario.nombre, 
                        puntaje:usuario.puntaje,
                        tiempo:usuario.tiempo  
                    });
                    localStorage.setItem("jugador", datos);
                    break;
                }
            }  
            alta();  
        }
    }
    else{
        document.getElementById("mensajeError").innerHTML="El nombre debe ser mínimo de 3 letras";
    }
}

function alta(){
    var escenarios = [0,1,2,3,4,5,6,7,8];
    shuffle(escenarios);
    localStorage.setItem("escenarios", JSON.stringify(escenarios));

    if(!registrado){
        var usuario = JSON.stringify({
            nombre:nombre, 
            puntaje:0,
            tiempo:0  
        });
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("jugador", usuario);
    }
    window.location.href = "juego.html";
}

function shuffle(arreglo){
    arreglo.sort(()=>Math.random()-0.5);
}

document.getElementById("boton-salir").addEventListener("click", function(){
    window.location.href = "index.html";
});
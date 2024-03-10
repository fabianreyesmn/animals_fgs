var usuarios = localStorage.getItem("usuarios"); //Leer usuarios del localStorage, al inicio no existe
var tiempos = [];

if(usuarios==null) usuarios=[]; //Si es nulo creamos arreglo vacío
else usuarios=JSON.parse(usuarios); //Recibe una cadena JSON y en base a esta cadena construye un objeto
console.log(usuarios);

function mostrar(){
    document.getElementById("clasificacion").innerHTML="";
    var tabla="<tr> <th>Nombre</th> <th>Puntaje</th> <th>Tiempo</th> </tr>";

    /*
    usuarios.sort(function(a, b) {
        return a.tiempo - b.tiempo;
    });
    console.log(usuarios);
    */

    for(var i in usuarios){
        var usuario = JSON.parse(usuarios[i]);
        tiempos[i] = usuario.tiempo;
    }
    tiempos.sort();
    console.log(tiempos);

    for(var i=0; i<tiempos.length; i++){
        for(var j=0; j<usuarios.length; j++) {
            var usuario = JSON.parse(usuarios[j]);

            if(tiempos[i] === usuario.tiempo){
                tabla += "<tr>";
                tabla += "<td>" + usuario.nombre + "</td>";
                tabla += "<td>" + usuario.puntaje + "</td>";
                tabla += "<td>" + usuario.tiempo + "</td>";
                tabla += "</tr>";
                break;
            }
        }
    }
    
    document.getElementById("clasificacion").innerHTML = tabla;
}

window.onload = function(){
    mostrar();
}
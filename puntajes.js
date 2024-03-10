var usuarios = localStorage.getItem("usuarios");
var tiempos = [];
if (usuarios == null) usuarios = []; //Si es nulo creamos arreglo vacío
else usuarios = JSON.parse(usuarios);  //Recibe una cadena JSON y en base a esta cadena construye un objeto
console.log(usuarios);

function mostrar() {
    document.getElementById("clasificacion").innerHTML = "";
    var tabla = "<tr> <th>Nombre</th> <th>Puntaje</th> <th>Tiempo</th> </tr>";

    for(var i in usuarios){
        var usuario = JSON.parse(usuarios[i]);

        if(!tiempos.hasOwnProperty(usuario.tiempo)) {
            tiempos[usuario.tiempo] = [];
        }
        //La clave es el tiempo y el valor es un arreglo con los usuarios que tienen ese tiempo
        tiempos[usuario.tiempo].push(usuario);
    }

    //Se extrae todas las claves (tiempos) y los ordena de menor a mayor
    var tiemposOrden = Object.keys(tiempos).sort((a, b) => a - b);

    for(var i=0; i<tiemposOrden.length; i++){
        var tiempo = tiemposOrden[i];

        if(tiempo != 0) {
            var usuariosConEsteTiempo = tiempos[tiempo];

            for(var j=0; j<usuariosConEsteTiempo.length; j++) {
                var usuario = usuariosConEsteTiempo[j];
                tabla += "<tr>";
                tabla += "<td>"+usuario.nombre+"</td>";
                tabla += "<td>"+usuario.puntaje+"</td>";
                tabla += "<td>"+usuario.tiempo+" Segundos </td>";
                tabla += "</tr>";
            }
        }
    }

    document.getElementById("clasificacion").innerHTML = tabla;
}

window.onload = function () {
    mostrar();
}
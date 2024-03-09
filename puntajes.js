var usuarios=localStorage.getItem("usuarios"); //Leer usuarios del localStorage, al inicio no existe

if(usuarios==null) usuarios=[]; //Si es nulo creamos arreglo vacío
else usuarios=JSON.parse(usuarios); //Recibe una cadena JSON y en base a esta cadena construye un objeto

function mostrar(){
    document.getElementById("clasificacion").innerHTML="";
    var tabla="<tr> <th>Nombre</th> <th>Puntaje</th> <th>Tiempo</th> </tr>";
    
    //Falta la lógica para ordenar de mejor al peor tiempo
    for(var i in usuarios){
        var usuario = JSON.parse(usuarios[i]);
            
        tabla += "<tr>";
        tabla += "<td>"+usuario.nombre+"</td>";
        tabla += "<td>"+usuario.puntaje+"</td>";
        tabla += "<td>"+usuario.tiempo+"</td>";
        tabla += "</tr>";
    } 
    
    document.getElementById("clasificacion").innerHTML = tabla;
}

window.onload = function(){
    mostrar();
}
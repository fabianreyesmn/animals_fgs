var jugador=localStorage.getItem("jugador");
jugador=JSON.parse(jugador);

document.getElementById("felicitacion").innerHTML = "🐉 ¡Increíble " + jugador.nombre + "! Has dominado la jungla con tus habilidades de emparejamiento. Eres un verdadero experto en la selva. ¡Felicidades por tu gran éxito! 🌿🐒🐍"
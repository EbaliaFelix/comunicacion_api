const resultado = document.getElementById("resultado");
const botones = document.querySelectorAll("button");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const url = boton.getAttribute("data-url");
    consultarAPI(url);
  });
});

async function consultarAPI(url) {
  try {
    resultado.textContent = "Cargando datos...";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

     //datos se convierten a JSON
    const data = await response.json();

    //procesamos los datos recibidos

    procesarDatos(data);

  } catch (error) {
    resultado.innerHTML = "Ocurrió un error al consultar la API.";
    console.error(error);
  }
}
/////////////////////////////////////////////////////////

// Función que procesa los datos según la API
function procesarDatos(data) {

  resultado.innerHTML = ""; // limpiamos contenido previo

  // CASO 1: API de imagen de perro
  // Esta API devuelve: { message: "url", status: "success" }
  if (data.message && data.status) {

    resultado.innerHTML = `
      <h3>Imagen Aleatoria de Perro</h3>
      <img src="${data.message}" alt="Perro aleatorio">
    `;

    return; // salimos de la función
  }

  // CASO 2: API de clima (Open-Meteo)
  if (data.current_weather) {

    const clima = data.current_weather;

    resultado.innerHTML = `
      <table>
        <tr>
          <th>Temperatura</th>
          <td>${clima.temperature} °C</td>
        </tr>
        <tr>
          <th>Velocidad del Viento</th>
          <td>${clima.windspeed} km/h</td>
        </tr>
        <tr>
          <th>Dirección del Viento</th>
          <td>${clima.winddirection}°</td>
        </tr>
      </table>
    `;

    return;
  }

  // CASO 3: API GitHub (objeto grande)
  crearTablaObjeto(data);
}


// Función para crear tabla cuando la API devuelve un objeto
function crearTablaObjeto(objeto) {

  const tabla = document.createElement("table");
  const cuerpo = document.createElement("tbody");

  for (let clave in objeto) {

    // Evitamos mostrar objetos anidados complejos
    if (typeof objeto[clave] === "object") continue;

    const fila = document.createElement("tr");

    const celdaClave = document.createElement("th");
    celdaClave.textContent = clave;

    const celdaValor = document.createElement("td");
    celdaValor.textContent = objeto[clave];

    fila.appendChild(celdaClave);
    fila.appendChild(celdaValor);
    cuerpo.appendChild(fila);
  }

  tabla.appendChild(cuerpo);
  resultado.appendChild(tabla);
}
const resultado = document.getElementById("resultado");
const botones = document.querySelectorAll(".buttons button");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const url = boton.getAttribute("data-url");
    consultarAPI(url);
  });
});

async function consultarServicioscombinados(usuarios) {
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

///////////////////////////////////////////
async function consultarServiciosCombinados(usuario) {
  try {

    resultado.textContent = "Consultando múltiples servicios...";

    const urlGitHub = `https://api.github.com/users/${usuario}`;
    const urlClima = "https://api.open-meteo.com/v1/forecast?latitude=21.5&longitude=-104.9&current_weather=true";

    // Ejecutamos ambas consultas al mismo tiempo
    const [gitResponse, climaResponse] = await Promise.all([
      fetch(urlGitHub),
      fetch(urlClima)
    ]);

    if (!gitResponse.ok || !climaResponse.ok) {
      throw new Error("Error en una de las APIs");
    }

    const gitData = await gitResponse.json();
    const climaData = await climaResponse.json();

    // FILTRADO
    const repos = gitData.public_repos;
    const followers = gitData.followers;
    const temperatura = climaData.current_weather.temperature;

    // SUMA
    const totalActividad = repos + followers;

    // MOSTRAR RESULTADO
    resultado.innerHTML = `
      <h3>Resumen Combinado</h3>
      <table>
        <tr><th>Usuario</th><td>${gitData.login}</td></tr>
        <tr><th>Repositorios</th><td>${repos}</td></tr>
        <tr><th>Seguidores</th><td>${followers}</td></tr>
        <tr><th>Total Actividad</th><td>${totalActividad}</td></tr>
        <tr><th>Temperatura en Tepic</th><td>${temperatura} °C</td></tr>
      </table>
    `;

  } catch (error) {
    resultado.innerHTML = "Error al consultar servicios combinados.";
    console.error(error);
  }
}
//////////////////////////////////////////
const form = document.getElementById("formBusqueda");
const inputBusqueda = document.getElementById("busqueda");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // evita recarga

  const usuario = inputBusqueda.value.trim();

  if (usuario !== "") {
    consultarServiciosCombinados(usuario);
  }
});
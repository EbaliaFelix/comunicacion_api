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

    const data = await response.json();

    resultado.textContent = JSON.stringify(data, null, 2);

  } catch (error) {
    resultado.textContent = "Ocurrió un error al consultar la API.";
    console.error(error);
  }
}
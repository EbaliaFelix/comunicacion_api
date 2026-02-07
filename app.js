const btn = document.getElementById("cargarBtn");
const contenedor = document.getElementById("contenedor");
const apiKey = "395f3abc3cfa6bf9cb5cd50c9de0e266";

btn.addEventListener("click", buscarPeliculas);

async function buscarPeliculas() {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=cultura`;


   try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    mostrarPeliculas(data.results);
  } catch (error) {
    console.log("Error:", error);
  }
}

function mostrarPeliculas(peliculas) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  peliculas.forEach(pelicula => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${pelicula.title}</h3>
      <p>${pelicula.overview || "Sin descripción"}</p>
      <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="">
    `;

    contenedor.appendChild(card);
  });
}

buscarPeliculas();
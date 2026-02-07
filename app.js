const btn = document.getElementById("cargarBtn");
const contenedor = document.getElementById("contenedor");

btn.addEventListener("click", obtenerUsuarios);

async function obtenerUsuarios() {
  contenedor.innerHTML = "<p>Cargando datos...</p>";

  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {
      throw new Error("Error al obtener los datos");
    }

    const datos = await respuesta.json();
    mostrarUsuarios(datos);

  } catch (error) {
    contenedor.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function mostrarUsuarios(usuarios) {
  contenedor.innerHTML = "";

  usuarios.forEach(user => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card");

    tarjeta.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Ciudad:</strong> ${user.address.city}</p>
      <p><strong>Empresa:</strong> ${user.company.name}</p>
    `;

    contenedor.appendChild(tarjeta);
  });
}

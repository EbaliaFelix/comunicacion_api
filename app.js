async function consultarAPI() {
  try {
    const response = await fetch("https://api.github.com/users/octocat");
    const data = await response.json();

    document.getElementById("resultado").textContent =
      JSON.stringify(data, null, 2);

  } catch (error) {
    console.error("Error:", error);
  }
}
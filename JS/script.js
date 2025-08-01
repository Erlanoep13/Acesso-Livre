const btnSalvar = document.getElementById("btnSalvar");

if (btnSalvar) {
  btnSalvar.addEventListener("click", function () {
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const rampa = document.getElementById("rampa").checked;
    const banheiro = document.getElementById("banheiro").checked;
    const libras = document.getElementById("libras").checked;
    const localizacao = document.getElementById("localizacao").value;

    console.log({
      nome,
      descricao,
      categoria,
      acessibilidade: { rampa, banheiro, libras },
      localizacao,
    });

    const msg = document.getElementById("mensagem");
    msg.classList.remove("hidden");

    setTimeout(() => {
      msg.classList.add("hidden");
    }, 3000);
  });
}


//navbar
  const menuButton = document.getElementById("menuButton"); 
  const sideMenu = document.getElementById("sideMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (menuButton && sideMenu && closeMenu) {
    menuButton.addEventListener("click", () => {
      sideMenu.classList.remove("-translate-x-full");
    });

    closeMenu.addEventListener("click", () => {
      sideMenu.classList.add("-translate-x-full");
    });
  }


// Mapa Leaflet
document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return; // evita erro

  const map = L.map("map").setView([-5.12798, -39.733], 13);


  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  }).addTo(map);

  // Exemplo de marcador
  const marker = L.marker([-5.12628, -39.730,8])
    .addTo(map)
    .bindPopup("<b>Praça Monsenhor José Cândidol</b><br>Vaga para deficientes e rampa para cadeirantes em frente à Tropikaly.")
    .openPopup();
});

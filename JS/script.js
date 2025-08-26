// --- NAVBAR ---
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

// --- POPUP (Botão flutuante) ---
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const popupModal = document.getElementById("popupModal");

if (openPopup && closePopup && popupModal) {
  openPopup.addEventListener("click", () => {
    popupModal.classList.remove("hidden");
  });

  closePopup.addEventListener("click", () => {
    popupModal.classList.add("hidden");
  });

  // Fecha ao clicar fora do modal
  popupModal.addEventListener("click", (e) => {
    if (e.target === popupModal) {
      popupModal.classList.add("hidden");
    }
  });
}

// --- LOGIN / LOGOUT ---
document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const loginLink = document.querySelector('a[href="login.html"]');

  if (usuarioLogado && usuarioLogado.logado) {
    // Troca "Login" por "Sair"
    if (loginLink) {
      loginLink.textContent = "Sair";
      loginLink.href = "#";

      loginLink.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
      });
    }
  }
});
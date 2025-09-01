
//renderizando locais com coração clicável
function renderizarLocal(local, favoritosIds = []) {
  const isFavorito = favoritosIds.includes(local.id_local);
  const coracao = isFavorito ? "IMGs/coracao_cheio.png" : "IMGs/coracao.png";

  return `
    <div class="bg-white text-black p-3 rounded-md shadow">
      <h2 class="font-semibold">${local.nome_local}</h2>
      <p class="text-sm">${local.descricao}</p>
      <img src="${local.imagem}" alt="${local.nome_local}" class="mt-2 rounded-md max-h-40 mx-auto">
      <input 
        type="image" 
        src="${coracao}" 
        id="fav-${local.id_local}"
        width="24" height="24"
        onclick="toggleFavorito(${local.id_local})">
    </div>
  `;
}


// --- FAVORITAR ---
async function favoritarLocal(id_local) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario || !usuario.logado) {
    alert("Você precisa estar logado para favoritar.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/favoritos/favoritar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chave_user: usuario.chave_user,
        id_local: id_local
      })
    });

    const data = await response.json();
    alert(data.mensagem || "Favorito adicionado!");
  } catch (err) {
    console.error("Erro ao favoritar:", err);
    alert("Erro ao favoritar local");
  }
}

// --- LISTAR FAVORITOS ---
async function carregarFavoritos() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado || !usuarioLogado.chave_user) {
    document.querySelector("#listaFavoritos").innerHTML = 
      "<p class='text-red-500'>Você precisa estar logado para ver seus favoritos.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/favoritos/${usuarioLogado.chave_user}`);
    const favoritos = await response.json();

    const lista = document.querySelector("#listaFavoritos");
    lista.innerHTML = "";

    if (favoritos.length === 0) {
      lista.innerHTML = "<p>Você ainda não tem locais salvos nos favoritos.</p>";
    } else {
      favoritos.forEach(local => {
        const card = `
          <div class="bg-white text-black p-3 rounded-md shadow">
            <h2 class="font-semibold">${local.nome_local}</h2>
            <p class="text-sm">${local.descricao}</p>
            <img src="${local.imagem}" alt="${local.nome_local}" class="mt-2 rounded-md max-h-40 mx-auto">
          </div>
        `;
        lista.innerHTML += card;
      });
    }
  } catch (err) {
    console.error("Erro ao carregar favoritos:", err);
    document.querySelector("#listaFavoritos").innerHTML =
      "<p class='text-red-500'>Erro ao carregar favoritos.</p>";
  }
  
//toggle favorito
  async function toggleFavorito(id_local) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado || !usuarioLogado.chave_user) {
    alert("Você precisa estar logado para favoritar locais.");
    return;
  }

  const img = document.getElementById(`fav-${id_local}`);
  const isFavorito = img.src.includes("coracao_cheio.png");

  try {
    if (isFavorito) {
      // --- REMOVER FAVORITO ---
      await fetch("http://localhost:3000/favoritos/remover", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chave_user: usuarioLogado.chave_user, id_local })
      });
      img.src = "IMGs/coracao_vazio.png";
    } else {
      // --- ADICIONAR FAVORITO ---
      await fetch("http://localhost:3000/favoritos/favoritar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chave_user: usuarioLogado.chave_user, id_local })
      });
      img.src = "IMGs/coracao_cheio.png";
    }
  } catch (err) {
    console.error("Erro ao atualizar favorito:", err);
  }
}

}

// só executa se for a página favoritos.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("favoritos.html")) {
    carregarFavoritos();
  }
});
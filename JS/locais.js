//JS/locais.js

// const API_BASE = "http://localhost:3000"; // Para teste local
const API_BASE = "https://acesso-livre.onrender.com"; // Para produção

function getContainerLista() {
  return document.getElementById("lista-locais") || document.querySelector("section.grid");
}

function criaCard(local, favoritosIds = []) {
  const card = document.createElement("div");
  card.className = "bg-white text-black p-3 md:p-4 rounded-md shadow h-full flex flex-col justify-between";

  // botão favoritar
  const coracao = document.createElement("input");
  coracao.type = "image";
  coracao.src = favoritosIds.includes(local.id_local) ? "IMGs/coracao_cheio.png" : "IMGs/coracao.png";
  coracao.alt = "Favoritar";
  coracao.width = 16;
  coracao.height = 16;
  coracao.className = "cursor-pointer";

  coracao.addEventListener("click", async () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      alert("Você precisa estar logado para favoritar locais.");
      return;
    }

    const isFavorito = coracao.src.includes("coracao_cheio.png");

    try {
      if (isFavorito) {
        // --- REMOVER FAVORITO ---
        await fetch(`${API_BASE}/favoritos/remover`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chave_user: usuarioLogado.chave_user,
            id_local: local.id_local
          })
        });
        coracao.src = "IMGs/coracao.png";
      } else {
        // --- ADICIONAR FAVORITO ---
        await fetch(`${API_BASE}/favoritos/favoritar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chave_user: usuarioLogado.chave_user,
            id_local: local.id_local
          })
        });
        coracao.src = "IMGs/coracao_cheio.png";
      }
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
    }
  });

  // botão editar (usando JSON.stringify do Código 1)
  const editar = document.createElement("input");
  editar.type = "image";
  editar.src = "IMGs/lapis.png";
  editar.alt = "Editar";
  editar.width = 15;
  editar.height = 15;
  editar.className = "cursor-pointer";

  const payloadEditar = `
    editarLocal({
      id_local: ${JSON.stringify(`${local.id_local}`)},
      coordenadas: ${JSON.stringify(`${local.latitude}, ${local.longitude}`)},
      nome: ${JSON.stringify(local.nome_local)},
      localizacao: ${JSON.stringify(local.localizacao)},
      tipoAcessibilidade: ${JSON.stringify(local.tipo_acessibilidade)},
      categoria: ${JSON.stringify(local.categoria)},
      descricao: ${JSON.stringify(local.descricao || "")},
      foto: ${JSON.stringify(local.imagem || "IMGs/default.jpg")}
    })
  `.trim();

  editar.setAttribute("onclick", payloadEditar);

  // conteúdo do card
  card.innerHTML = `
    <h2 class="font-semibold text-base md:text-lg">${local.nome_local}</h2>
    <p class="text-sm md:text-base">
      ${local.localizacao || ""}<br>
      <strong>Acessibilidade:</strong> ${local.tipo_acessibilidade || "—"}<br>
      <strong>Descrição:</strong> ${local.descricao || "Sem descrição"}
    </p>
  `;


  // CRIE O BOTÃO DE REMOVER
  const remover = document.createElement("input");
  remover.type = "image";
  remover.src = "IMGs/lixeira.png";
  remover.alt = "Remover";
  remover.title = "Remover";
  remover.width = 16;
  remover.height = 16;
  remover.className = "cursor-pointer";
  // Adiciona o evento de clique para chamar a função que criamos no leaflet.js
  remover.setAttribute("onclick", `deletarLocal(${local.id_local})`);


  // conteúdo do card
  card.innerHTML = `
    <h2 class="font-semibold text-base md:text-lg">${local.nome_local}</h2>
    <p class="text-sm md:text-base">
      ${local.localizacao || ""}<br>
      <strong>Acessibilidade:</strong> ${local.tipo_acessibilidade || "—"}<br>
      <strong>Descrição:</strong> ${local.descricao || "Sem descrição"}
    </p>
  `;

  // ações
  const acoes = document.createElement("div");
  acoes.className = "flex gap-2 mt-2";
  acoes.appendChild(editar);
  acoes.appendChild(coracao);
  acoes.appendChild(remover); // ADICIONE O BOTÃO DE REMOVER ÀS AÇÕES
  card.appendChild(acoes);

  return card;
}

async function carregarLocais() {
  const container = getContainerLista();
  if (!container) {
    console.error("Container da lista de locais não encontrado.");
    return;
  }

  try {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let favoritosIds = [];

    if (usuarioLogado && usuarioLogado.chave_user) {
      const respFav = await fetch(`${API_BASE}/favoritos/${usuarioLogado.chave_user}`);
      if (respFav.ok) {
        const favoritos = await respFav.json();
        favoritosIds = favoritos.map(f => f.id_local);
      }
    }

    const resp = await fetch(`${API_BASE}/locais`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const payload = await resp.json();
    const locais = Array.isArray(payload) ? payload : (payload.locais || []);

    container.innerHTML = "";
    if (!locais.length) {
      container.innerHTML = `<p class="text-gray-500">Nenhum local encontrado.</p>`;
      return;
    }

    locais.forEach(local => container.appendChild(criaCard(local, favoritosIds)));
  } catch (err) {
    console.error("Erro ao carregar locais:", err);
    if (container) {
      container.innerHTML = `<p class="text-red-500">Erro ao carregar locais.</p>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", carregarLocais);

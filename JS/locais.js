const API_BASE = "http://localhost:3000"; // ajuste se sua porta/host for diferente

function getContainerLista() {
  // tenta por id primeiro; se não existir, pega a <section> com classe grid
  return document.getElementById("lista-locais") || document.querySelector("section.grid");
}

function criaCard(local) {
  const card = document.createElement("div");
  card.className = "bg-white text-black p-3 md:p-4 rounded-md shadow h-full flex flex-col justify-between";

  // usar JSON.stringify para evitar quebrar HTML se houver aspas no texto
  const payloadEditar = `
    editarLocal({
      coordenadas: ${JSON.stringify(`${local.latitude}, ${local.longitude}`)},
      nome: ${JSON.stringify(local.nome_local)},
      localizacao: ${JSON.stringify(local.localizacao)},
      tipoAcessibilidade: ${JSON.stringify(local.tipo_acessibilidade)},
      categoria: ${JSON.stringify(local.categoria)},
      descricao: ${JSON.stringify(local.descricao || "")},
      foto: ${JSON.stringify(local.imagem || "IMGs/default.jpg")}
    })
  `.trim();

  card.innerHTML = `
    <h2 class="font-semibold text-base md:text-lg">${local.nome_local}</h2>
    <p class="text-sm md:text-base">
      ${local.localizacao || ""}<br>
      <strong>Acessibilidade:</strong> ${local.tipo_acessibilidade || "—"}<br>
      <strong>Descrição:</strong> ${local.descricao || "Sem descrição"}
    </p>
    <div class="flex gap-2 mt-2">
      <input type="image" src="IMGs/lapis.png" alt="Editar" width="15" height="15"
        class="cursor-pointer" onclick='${payloadEditar}'>
      <input type="image" src="IMGs/coracao.png" alt="Favoritar" width="16" height="16" class="cursor-pointer">
    </div>
  `;
  return card;
}

async function carregarLocais() {
  const container = getContainerLista();
  if (!container) {
    console.error("Container da lista de locais não encontrado. Garanta que a <section> tem id='lista-locais' ou a classe 'grid'.");
    return;
  }

  try {
    const resp = await fetch(`${API_BASE}/locais`);
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }
    const payload = await resp.json();

    // aceita { encontrados, locais } OU um array direto
    const locais = Array.isArray(payload) ? payload : (payload.locais || []);

    container.innerHTML = ""; // limpa cards estáticos
    if (!locais.length) {
      container.innerHTML = `<p class="text-gray-500">Nenhum local encontrado.</p>`;
      return;
    }

    locais.forEach(local => container.appendChild(criaCard(local)));
  } catch (err) {
    console.error("Erro ao carregar locais:", err);
    const container = getContainerLista();
    if (container) {
      container.innerHTML = `<p class="text-red-500">Erro ao carregar locais. Verifique o servidor e a rota /locais.</p>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", carregarLocais);

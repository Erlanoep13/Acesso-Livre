// LEAFLET

// const API_URL = "http://localhost:3000"; // Para teste local
const API_URL = "https://acesso-livre.onrender.com"; // Para produção

document.addEventListener("DOMContentLoaded", async function () {
    const mapContainer = document.getElementById("mapContainer");
    if (!mapContainer) return;

    // Ícones personalizados
    const iconeMotora = L.icon({
        iconUrl: 'IMGs/IconeMotora.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const iconeVisual = L.icon({
        iconUrl: 'IMGs/IconeVisual.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const iconeAmbas = L.icon({
        iconUrl: 'IMGs/IconeAmbas.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const iconeFalta = L.icon({
        iconUrl: 'IMGs/IconeFalta.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    // Inicia o mapa
    const map = L.map("map").setView([-5.12798, -39.733], 14.5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // Buscar locais reais do backend
    try {
        // Use a nova variável API_URL
        const resposta = await fetch(`${API_URL}/locais`);
        const locais = await resposta.json();

        locais.forEach(local => {
            let icone;
            // ... (Seu código do switch para os ícones fica aqui, sem alterações) ...
            switch (local.tipo_acessibilidade.toLowerCase()) {
                case "motora": icone = iconeMotora; break;
                case "visual": icone = iconeVisual; break;
                case "ambas": icone = iconeAmbas; break;
                default: icone = iconeFalta;
            }

            // AQUI ADICIONAMOS O BOTÃO DE REMOVER
            const popupContent = `
            <div class="text-sm">
                <p><strong>${local.nome_local}</strong></p>
                <p>${local.localizacao}</p>
                <p class="mt-1">${local.descricao}</p>
                <div style="margin-top: 15px; display: flex; gap: 8px;">
                    <input type="image" src="IMGs/lapis.png" alt="Editar" title="Editar" width="16" height="16" onclick="editarLocal({ id_local: '${local.id_local}', coordenadas: '${local.latitude},${local.longitude}', nome: '${local.nome_local}', localizacao: '${local.localizacao}', tipoAcessibilidade: '${local.tipo_acessibilidade}', categoria: '${local.categoria}', recursos: '${local.recursos || ""}', descricao: '${local.descricao || ""}', foto: '${local.imagem || ""}', chave_usr: '${local.chave_user}' })">
                    <input type="image" src="IMGs/coracao.png" alt="Favoritar" title="Favoritar" width="16" height="16">
                    <input type="image" src="IMGs/lixeira.png" alt="Remover" title="Remover" width="16" height="16" onclick="deletarLocal(${local.id_local})">
                </div>
            </div>
            `;

            L.marker([local.latitude, local.longitude], { icon: icone })
                .addTo(map)
                .bindPopup(popupContent);
        });

    } catch (erro) {
        console.error("Erro ao carregar locais do backend:", erro);
    }

    // Clique para adicionar novo local
    map.on("click", function (e) {
        const { lat, lng } = e.latlng;

        const popup = L.popup()
            .setLatLng(e.latlng)
            .setContent(`
            <div class="text-sm">
                <p>Adicionar novo local aqui?</p>
                <button onclick="redirecionarParaFormulario(${lat}, ${lng})"
                class="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                Sim
                </button>
            </div>
            `)
            .openOn(map);
    });

    // Botão de expandir mapa
    const toggleMapSizeBtn = document.getElementById("toggleMapSize");
    if (toggleMapSizeBtn && mapContainer) {
        toggleMapSizeBtn.addEventListener("click", () => {
            mapContainer.classList.toggle("fullscreen");
            map.invalidateSize();
        });
    }
});

function redirecionarParaFormulario(lat, lng) {
    window.location.href = `adicionarLocal.html?lat=${lat}&lng=${lng}`;
}

function editarLocal(dados) {
    const params = new URLSearchParams(dados).toString();
    window.location.href = `adicionarLocal.html?${params}&id_local=${dados.id_local}`;
}

async function deletarLocal(id) {
    const confirmou = confirm("Tem certeza que deseja remover este local? Esta ação não pode ser desfeita.");

    if (!confirmou) {
        return; // Cancela a operação se o usuário clicar em "Cancelar"
    }

    try {
        const response = await fetch(`${API_URL}/locais/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro.message || 'Não foi possível remover o local.');
        }

        alert('Local removido com sucesso!');
        window.location.reload(); // Recarrega a página para atualizar o mapa e a lista

    } catch (error) {
        console.error('Erro ao remover local:', error);
        alert(`Erro: ${error.message}`);
    }
}
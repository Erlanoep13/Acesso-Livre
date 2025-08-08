// LEAFLET

document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("mapContainer");
    if (!mapContainer) return; // evita erro

    // Ícones personalizados
    const iconeMotora = L.icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const iconeVisual = L.icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const iconeAmbas = L.icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });


    const map = L.map("map").setView([-5.12798, -39.733], 14.5);


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    }).addTo(map);


    // Exemplos mockados
    const locaisAcessiveis = [
        {
            nome: "Praça da Matriz",
            descricao: "Vaga de motorista reservada para pessoas com deficiência e rampa de acesso à praça em frente à Tropikaly.",
            tipo: "motora", // vermelho
            localizacao: "Praça Monsenhor José Cândido - Centro",
            coordenadas: [-5.12628, -39.730],
            foto: "IMGs/IgrejaMatriz.jpg"
        },
        {
            nome: "Biblioteca Pública",
            descricao: "Leitor de tela disponível.",
            tipo: "visual", // verde
            localizacao: "Rua 26 de Junho, 128 - Centro",
            coordenadas: [-5.12628, -39.740]
        },
        {
            nome: "Hospital Municipal",
            descricao: "Acessível para todas as deficiências.",
            tipo: "ambas", // azul
            localizacao: "Rua 21 de novembro, 12 - Centro",
            coordenadas: [-5.12628, -39.720]
        }
    ];

    locaisAcessiveis.forEach(local => {
        let icone;

        switch (local.tipo) {
            case "motora":
                icone = iconeMotora;
                break;
            case "visual":
                icone = iconeVisual;
                break;
            case "ambas":
                icone = iconeAmbas;
                break;
        }

        const popupContent = `
        <div class="text-sm">
            <p><strong>${local.nome}</strong></p>
            <p>${local.localizacao}</p>
            <p class="mt-1">${local.descricao}</p>
            ${local.foto
                ? `<img src="${local.foto}" alt="Foto do local" class="mt-2 rounded w-full max-w-[200px]"/>`
                : ""
            }
            <input style="margin-top: 20px;" type="image" src="IMGs/lapis.jpg" alt="Editar" width="15" height="15" onclick="editarLocal({
                coordenadas: '-5.12628, -39.730',
                nome: 'Praça da Matriz',
                localizacao: 'Praça Monsenhor José Cândido - Centro',
                tipoAcessibilidade: 'Motora',
                categoria: 'Lazer',
                recursos: 'Rampa, Vaga PCD',
                descricao: 'Vaga de motorista reservada para pessoas com deficiência e rampa de acesso à praça em frente à Tropikaly.',
                foto: 'IMGs/IgrejaMatriz.jpg'
            })">
            <input type="image" src="IMGs/coracao.jpg" alt="Favoritar" width="16" height="16">
        </div>
        `;

        L.marker(local.coordenadas, { icon: icone })
            .addTo(map)
            .bindPopup(popupContent);

    });

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

    const toggleMapSizeBtn = document.getElementById("toggleMapSize");

    if (toggleMapSizeBtn && mapContainer) {
        toggleMapSizeBtn.addEventListener("click", () => {
            mapContainer.classList.toggle("fullscreen");
            map.invalidateSize(); // Leaflet precisa disso para ajustar o tamanho
        });
    }
});

function redirecionarParaFormulario(lat, lng) {
    window.location.href = `adicionarLocal.html?lat=${lat}&lng=${lng}`;
}

function editarLocal(dados) {
    // Montar URL com todos os dados
    const params = new URLSearchParams(dados).toString();
    window.location.href = `adicionarLocal.html?${params}`;
}

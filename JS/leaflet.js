// LEAFLET

document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map");
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
            coordenadas: [-5.12628, -39.730, 8],
            foto: "IMGs/IgrejaMatriz.jpg"
        },
        {
            nome: "Biblioteca Pública",
            descricao: "Leitor de tela disponível.",
            tipo: "visual", // verde
            localizacao: "Rua 26 de Junho, 128 - Centro",
            coordenadas: [-5.12628, -39.740, 8]
        },
        {
            nome: "Hospital Municipal",
            descricao: "Acessível para todas as deficiências.",
            tipo: "ambas", // azul
            localizacao: "Rua 21 de novembro, 12 - Centro",
            coordenadas: [-5.12628, -39.720, 8]
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

});

function redirecionarParaFormulario(lat, lng) {
    window.location.href = `adicionarLocal.html?lat=${lat}&lng=${lng}`;
}
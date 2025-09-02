document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-adicionar-local");
    const mensagemDiv = document.getElementById("mensagemLocal");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Pegar valores do form
            const coordenadas = document.getElementById("coordenadas").value.trim();
            const nome_local = document.getElementById("nome_local").value.trim();
            const localizacao = document.getElementById("localizacao").value.trim();
            const tipo_acessibilidade = document.getElementById("tipo_acessibilidade").value;
            const categoria = document.getElementById("categoria").value.trim();
            const recursos = document.getElementById("recursos").value.trim();
            const descricao = document.getElementById("descricao").value.trim();

            // Foto opcional
            const uploadInput = document.getElementById("upload");
            let imagem = null;
            if (uploadInput.files.length > 0) {
                // por enquanto só pega o nome do arquivo
                imagem = uploadInput.files[0].name;
            }

            // Separar latitude e longitude
            let latitude = null;
            let longitude = null;
            if (coordenadas.includes(",")) {
                const [lat, lng] = coordenadas.split(",").map((c) => c.trim());
                latitude = parseFloat(lat);
                longitude = parseFloat(lng);
            }

            // Pegar chave_user do localStorage
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

            if (!usuarioLogado || !usuarioLogado.logado) {
                mensagemDiv.textContent = "⚠️ Você precisa estar logado para adicionar ou editar locais.";
                mensagemDiv.className = "mt-2 text-center text-red-500";
                return;
            }

            const chave_user = usuarioLogado.chave_user;

            // Montar JSON
            const novoLocal = {
                nome_local,
                tipo_acessibilidade,
                categoria,
                imagem,
                descricao,
                localizacao,
                latitude,
                longitude,
                chave_user: parseInt(chave_user),
                recursos: recursos ? recursos.split(",").map((r) => r.trim()) : []
            };

            // Verifica se é edição (id_local vem pela URL)
            const urlParams = new URLSearchParams(window.location.search);
            const id_local = urlParams.get("id_local");

            try {
                let resposta;
                if (id_local) {
                    // EDITAR LOCAL → PUT
                    resposta = await fetch(`http://localhost:3000/locais/atualizar/${id_local}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(novoLocal),
                    });
                } else {
                    // CRIAR LOCAL → POST
                    resposta = await fetch("http://localhost:3000/locais/criar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(novoLocal),
                    });
                }

                const dados = await resposta.json();

                if (resposta.ok) {
                    mensagemDiv.textContent = id_local
                        ? "Local atualizado com sucesso!"
                        : "Local adicionado com sucesso!";
                    mensagemDiv.className = "mt-2 text-center text-green-600";

                    // Redireciona pro mapa depois de salvar
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1500);
                } else {
                    mensagemDiv.textContent = dados.message || "Erro ao salvar local.";
                    mensagemDiv.className = "mt-2 text-center text-red-500";
                }
            } catch (erro) {
                console.error("Erro ao conectar:", erro);
                mensagemDiv.textContent = "Erro ao conectar com servidor.";
                mensagemDiv.className = "mt-2 text-center text-red-500";
            }
        });
    }
});
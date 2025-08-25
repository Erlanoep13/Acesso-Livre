// conexaoUsuario.js
document.addEventListener("DOMContentLoaded", () => {

    // --- CADASTRO ---
    const form = document.getElementById("form-criar-conta");
    const mensagemDiv = document.getElementById("mensagem");
    const inputNome = document.getElementById("nome");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = inputNome.value;

            try {
                const resposta = await fetch("http://localhost:3000/usuarios/criar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nome }),
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    // Mensagem com destaque apenas na chave
                    mensagemDiv.innerHTML = `
                        Conta criada com sucesso! Sua chave de acesso é: 
                        <span class="text-green-500 font-bold text-xl">${dados.chave_user}</span>
                    `;

                    // Limpa o input e dá foco novamente
                    inputNome.value = "";
                    inputNome.focus();
                } else {
                    mensagemDiv.textContent = dados.error || "Erro ao criar conta.";
                    mensagemDiv.classList.remove("text-green-500");
                    mensagemDiv.classList.add("text-red-500");
                }
            } catch (erro) {
                console.error("Erro ao conectar com backend:", erro);
                mensagemDiv.textContent = "Erro ao conectar com o servidor.";
                mensagemDiv.classList.remove("text-green-500");
                mensagemDiv.classList.add("text-red-500");
            }
        });
    }

    // --- LOGIN ---
    const formLogin = document.getElementById("form-login");
    const msgDiv = document.getElementById("mensagem");

    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const chave_user = document.getElementById("chave_user").value;

            try {
                const resposta = await fetch("http://localhost:3000/usuarios/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, chave_user })
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    // salva no localStorage para usar depois na index.html
                    localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));

                    // redireciona para página inicial
                    window.location.href = "index.html";
                } else {
                    msgDiv.textContent = dados.error || "Falha no login.";
                }
            } catch (erro) {
                console.error("Erro no login:", erro);
                msgDiv.textContent = "Erro ao conectar com o servidor.";
            }
        });
    }
});
// conexaoUsuario.js
document.addEventListener("DOMContentLoaded", () => {

    // --- CADASTRO ---
    const formCadastro = document.getElementById("form-criar-conta");
    const mensagemDiv = document.getElementById("mensagem");
    const inputNome = document.getElementById("nome");

    if (formCadastro) {
        formCadastro.addEventListener("submit", async (e) => {
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
    const formLogin = document.querySelector("form#form-login");
    const inputLoginNome = document.getElementById("nome");
    const inputLoginChave = document.getElementById("chave_user"); // <-- corrigido

    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = inputLoginNome.value;
            const chave_user = inputLoginChave.value;

            try {
                const resposta = await fetch("http://localhost:3000/usuarios/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nome, chave_user }),
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    // Salva login no localStorage
                    localStorage.setItem("usuarioLogado", JSON.stringify({
                        logado: true,
                        chave_user: dados.chave_user,
                        nome: dados.nome
                    }));

                    // Redireciona para a página principal
                    window.location.href = "index.html";
                } else {
                    alert(dados.error || "Erro ao fazer login.");
                }
            } catch (erro) {
                console.error("Erro ao conectar com backend:", erro);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }
});

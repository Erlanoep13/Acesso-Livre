const inputPesquisa = document.getElementById("barra-pesquisa");
const btnBuscar = document.getElementById("btn-buscar");
const divResultado = document.getElementById("resultado");

// Função para buscar locais
async function buscarLocais() {
  const nome = inputPesquisa.value.trim();

  if (!nome) {
    divResultado.classList.add("hidden");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/locais/buscar?nome=${encodeURIComponent(nome)}`);
    const data = await response.json();

    divResultado.innerHTML = "";

    if (data.encontrados && data.locais.length > 0) {
      data.locais.forEach(local => {
        const item = document.createElement("div");
        item.classList.add(
          "px-4", "py-2", "cursor-pointer", "hover:bg-gray-100", "text-black", "border-b"
        );

        item.innerHTML = `
          <h3 class="font-semibold">${local.nome_local}</h3>
          <p class="text-sm text-gray-700"><strong>Endereço:</strong> ${local.localizacao}</p>
          <p class="text-sm text-gray-700"><strong>Acessibilidade:</strong> ${local.tipo_acessibilidade}</p>
          <p class="text-sm text-gray-600 italic">${local.descricao ?? "Sem descrição"}</p>
        `;

        // Clicar no item preenche o input com o nome do local
        item.addEventListener("click", () => {
          inputPesquisa.value = local.nome_local;
          divResultado.classList.add("hidden");
        });

        divResultado.appendChild(item);
      });

      divResultado.classList.remove("hidden");
    } else {
      divResultado.innerHTML = `<div class="px-4 py-2 text-gray-500">Nenhum local encontrado</div>`;
      divResultado.classList.remove("hidden");
    }
  } catch (err) {
    console.error("Erro ao buscar locais:", err);
    divResultado.innerHTML = `<div class="px-4 py-2 text-red-500">Erro ao buscar</div>`;
    divResultado.classList.remove("hidden");
  }
}

// Eventos
btnBuscar.addEventListener("click", buscarLocais);
inputPesquisa.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    buscarLocais();
  } else {
    buscarLocais(); // busca enquanto digita
  }
});

// Fechar dropdown ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest(".relative")) {
    divResultado.classList.add("hidden");
  }
});

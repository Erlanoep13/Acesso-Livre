document.getElementById("btnSalvar").addEventListener("click", function () {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const categoria = document.getElementById("categoria").value;
  const rampa = document.getElementById("rampa").checked;
  const banheiro = document.getElementById("banheiro").checked;
  const libras = document.getElementById("libras").checked;
  const localizacao = document.getElementById("localizacao").value;

  console.log({
    nome,
    descricao,
    categoria,
    acessibilidade: { rampa, banheiro, libras },
    localizacao,
  });

  const msg = document.getElementById("mensagem");
  msg.classList.remove("hidden");

  setTimeout(() => {
    msg.classList.add("hidden");
  }, 3000);
});

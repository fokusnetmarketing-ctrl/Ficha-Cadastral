const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    data: document.getElementById("data").value,
    nome: document.getElementById("nome").value,
    rg: document.getElementById("rg").value,
    cpf: document.getElementById("cpf").value,
    nascimento: document.getElementById("nascimento").value,
    endereco: document.getElementById("endereco").value,
    complemento: document.getElementById("complemento").value,
    uf: document.getElementById("uf").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    numero: document.getElementById("numero").value,
    cep: document.getElementById("cep").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    plano: document.getElementById("plano").value,
    valor: document.getElementById("valor").value,
    taxaInstalacao: document.getElementById("taxaInstalacao").value,
    vencimento: document.getElementById("vencimento").value,
    comodato: document.querySelector('input[name="comodato"]:checked').value,
    condRoteador: document.getElementById("condRoteador").value,
    condPagamento: document.getElementById("condPagamento").value,
    vendedor: document.getElementById("vendedor").value,
    observacao: document.getElementById("observacao").value,
    score: document.getElementById("score").value,
    codigo: document.getElementById("codigo").value,
    cor: document.getElementById("cor").value
  };

  try {
    await fetch("https://script.google.com/macros/s/AKfycbzs5uwV0bdvDXKRREyO4L9J50h2HutsMZT4pt3An-r8MWB6jVO47rwXiHpKlhn4iS84/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data)
    });

    alert("Cadastro enviado com sucesso!");
    form.reset();

  } catch (error) {
    alert("Erro ao enviar.");
    console.error(error);
  }
});

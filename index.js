const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("data", document.getElementById("data").value);
  formData.append("nome", document.getElementById("nome").value);
  formData.append("rg", document.getElementById("rg").value);
  formData.append("cpf", document.getElementById("cpf").value);
  formData.append("nascimento", document.getElementById("nascimento").value);
  formData.append("endereco", document.getElementById("endereco").value);
  formData.append("complemento", document.getElementById("complemento").value);
  formData.append("uf", document.getElementById("uf").value);
  formData.append("bairro", document.getElementById("bairro").value);
  formData.append("cidade", document.getElementById("cidade").value);
  formData.append("numero", document.getElementById("numero").value);
  formData.append("cep", document.getElementById("cep").value);
  formData.append("telefone", document.getElementById("telefone").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("plano", document.getElementById("plano").value);
  formData.append("valor", document.getElementById("valor").value);
  formData.append("taxaInstalacao", document.getElementById("taxaInstalacao").value);
  formData.append("vencimento", document.getElementById("vencimento").value);

  const comodatoSelecionado = document.querySelector('input[name="comodato"]:checked');
  formData.append("comodato", comodatoSelecionado ? comodatoSelecionado.value : "");

  formData.append("condRoteador", document.getElementById("condRoteador").value);
  formData.append("condPagamento", document.getElementById("condPagamento").value);
  formData.append("vendedor", document.getElementById("vendedor").value);
  formData.append("observacao", document.getElementById("observacao").value);
  formData.append("score", document.getElementById("score").value);
  formData.append("codigo", document.getElementById("codigo").value);
  formData.append("cor", document.getElementById("cor").value);

  try {
    await fetch("https://script.google.com/macros/s/AKfycbzgcfVVtIvp3Edr8hBfVYYUuijfMce-G8oLHB-IpWtbIPdKxty4dzDaoojHwRQv8Zup/exec", {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    alert("Cadastro enviado com sucesso!");
    form.reset();

  } catch (error) {
    alert("Erro ao enviar.");
    console.error(error);
  }
});

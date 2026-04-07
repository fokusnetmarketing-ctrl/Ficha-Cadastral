const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const comodato = document.querySelector('input[name="comodato"]:checked');
  formData.set("comodato", comodato ? comodato.value : "");

  try {
    const response = await fetch("SUA_NOVA_URL_AQUI", {
      method: "POST",
      body: new URLSearchParams(formData)
    });

    const result = await response.text();
    console.log(result);

    alert("Cadastro enviado com sucesso!");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Erro ao enviar.");
  }
});

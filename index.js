document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("formCadastro");

  const campos = [
    "nome","rg","cpf","nascimento","endereco","numero","complemento",
    "cidade","bairro","uf","cep","telefone","email","plano","valor",
    "taxaInstalacao","vencimento","condRoteador","condPagamento",
    "vendedor","observacao","score","codigo","cor"
  ];

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const comodato = document.querySelector('input[name="comodato"]:checked')?.value || "";

    const params = new URLSearchParams();

    campos.forEach(c => {
      params.append(c, document.getElementById(c).value || "");
    });

    params.append("comodato", comodato);

    try {
      const response = await fetch("SUA_URL_DO_WEB_APP_AQUI", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Cadastro salvo com sucesso ✅");
        form.reset();
      } else {
        throw new Error(data.mensagem || "Erro desconhecido");
      }

    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar dados ❌\nVeja o console (F12)");
    }
  });

});

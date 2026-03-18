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
      const response = await fetch("https://script.google.com/macros/s/AKfycbybZea1lHnHFsRoaPB8HZx3t2cTWXnQsTFqyPrmGkGMQHxkn7wYa9jEhfLpNykY_WNvcQ/exec", {
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

  // ===== Formatações =====

  const cpf = document.getElementById("cpf");
  const rg = document.getElementById("rg");
  const telefone = document.getElementById("telefone");
  const valor = document.getElementById("valor");
  const taxaInstalacao = document.getElementById("taxaInstalacao");

  // CPF
  cpf.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = v;
  });

  // RG
  rg.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1})$/, "$1-$2");
    e.target.value = v;
  });

  // TELEFONE
  telefone.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = v;
  });

  // MOEDA
  function formatarMoeda(campo) {
    campo.addEventListener("input", function(e) {
      let v = e.target.value.replace(/\D/g, "");
      v = (v / 100).toFixed(2);
      v = v.replace(".", ",");
      v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      e.target.value = "R$ " + v;
    });
  }

  formatarMoeda(valor);
  formatarMoeda(taxaInstalacao);

});

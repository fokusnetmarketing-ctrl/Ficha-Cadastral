document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("formCadastro");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const comodato = document.querySelector('input[name="comodato"]:checked')?.value || "";

    const params = new URLSearchParams({
      nome: nome.value,
      rg: rg.value,
      cpf: cpf.value,
      nascimento: nascimento.value,
      endereco: endereco.value,
      numero: numero.value,
      complemento: complemento.value,
      cidade: cidade.value,
      bairro: bairro.value,
      uf: uf.value,
      cep: cep.value,
      telefone: telefone.value,
      email: email.value,
      plano: plano.value,
      valor: valor.value,
      taxaInstalacao: taxaInstalacao.value,
      vencimento: vencimento.value,
      comodato: comodato,
      condRoteador: condRoteador.value,
      condPagamento: condPagamento.value,
      vendedor: vendedor.value,
      observacao: observacao.value,
      score: score.value,
      codigo: codigo.value,
      cor: cor.value
    });

    try {

      const response = await fetch("https://script.google.com/macros/s/AKfycbwkEU8mZ9qs8BB1kT3Mc6owRRSuyrcEEQKR8D9YK9L-yzCRe1-SUWWY7rmx8L_foo3VlA/exec", {
        method: "POST",
        body: params
      });

      const resultado = await response.json();

      if (resultado.status === "ok") {
        alert("Cadastro salvo e PDF gerado 🚀");
        window.open(resultado.pdf, "_blank");
        form.reset();
      } else {
        alert("Erro ao gerar PDF.");
      }

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar dados.");
    }

  });

  // ===== CPF =====
  cpf.addEventListener("input", function(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = v;
  });

  // ===== RG =====
  rg.addEventListener("input", function(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1})$/, "$1-$2");
    e.target.value = v;
  });

  // ===== TELEFONE =====
  telefone.addEventListener("input", function(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = v;
  });

  // ===== MOEDA =====
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

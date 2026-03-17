document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("formCadastro");

  const nome = document.getElementById("nome");
  const rg = document.getElementById("rg");
  const cpf = document.getElementById("cpf");
  const nascimento = document.getElementById("nascimento");
  const endereco = document.getElementById("endereco");
  const numero = document.getElementById("numero");
  const complemento = document.getElementById("complemento");
  const cidade = document.getElementById("cidade");
  const bairro = document.getElementById("bairro");
  const uf = document.getElementById("uf");
  const cep = document.getElementById("cep");
  const telefone = document.getElementById("telefone");
  const email = document.getElementById("email");
  const plano = document.getElementById("plano");
  const valor = document.getElementById("valor");
  const taxaInstalacao = document.getElementById("taxaInstalacao");
  const vencimento = document.getElementById("vencimento");
  const condRoteador = document.getElementById("condRoteador");
  const condPagamento = document.getElementById("condPagamento");
  const vendedor = document.getElementById("vendedor");
  const observacao = document.getElementById("observacao");
  const score = document.getElementById("score");
  const codigo = document.getElementById("codigo");
  const cor = document.getElementById("cor");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const comodato = document.querySelector('input[name="comodato"]:checked')?.value || "";

    const params = new URLSearchParams({
      nome: nome.value || "",
      rg: rg.value || "",
      cpf: cpf.value || "",
      nascimento: nascimento.value || "",
      endereco: endereco.value || "",
      numero: numero.value || "",
      complemento: complemento.value || "",
      cidade: cidade.value || "",
      bairro: bairro.value || "",
      uf: uf.value || "",
      cep: cep.value || "",
      telefone: telefone.value || "",
      email: email.value || "",
      plano: plano.value || "",
      valor: valor.value || "",
      taxaInstalacao: taxaInstalacao.value || "",
      vencimento: vencimento.value || "",
      comodato: comodato,
      condRoteador: condRoteador.value || "",
      condPagamento: condPagamento.value || "",
      vendedor: vendedor.value || "",
      observacao: observacao.value || "",
      score: score.value || "",
      codigo: codigo.value || "",
      cor: cor.value || ""
    });

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyZEiVljxyujwS-fs-PeUYcv6Z08zpfVBisD9RHnlZxiNf5eyBWHGXNj4h60H9cc3nPOQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      });

      const resultado = await response.json();

      if (resultado.status === "ok") {
        alert("Cadastro salvo com sucesso ✅");
        form.reset();
      } else {
        alert("Erro ao salvar cadastro.");
        console.log(resultado);
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

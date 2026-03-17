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

    // ✅ Dados em JSON
    const dados = {
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
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwtuYjVg9YTcqXY0S8n02pZiWU-Q7tY3R3MOyYJaoctO2fNATn251bh3Lz7W8xfAYMmaw/exec", {
        method: "POST",
        mode: "no-cors", // 🔥 resolve erro no GitHub
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      // ⚠️ no-cors não permite ler resposta
      alert("Cadastro enviado com sucesso ✅");
      form.reset();

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

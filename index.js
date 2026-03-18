document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("formCadastro");

  // ===== CAMPOS =====
  const campos = {
    nome: document.getElementById("nome"),
    rg: document.getElementById("rg"),
    cpf: document.getElementById("cpf"),
    nascimento: document.getElementById("nascimento"),
    endereco: document.getElementById("endereco"),
    numero: document.getElementById("numero"),
    complemento: document.getElementById("complemento"),
    cidade: document.getElementById("cidade"),
    bairro: document.getElementById("bairro"),
    uf: document.getElementById("uf"),
    cep: document.getElementById("cep"),
    telefone: document.getElementById("telefone"),
    email: document.getElementById("email"),
    plano: document.getElementById("plano"),
    valor: document.getElementById("valor"),
    taxaInstalacao: document.getElementById("taxaInstalacao"),
    vencimento: document.getElementById("vencimento"),
    condRoteador: document.getElementById("condRoteador"),
    condPagamento: document.getElementById("condPagamento"),
    vendedor: document.getElementById("vendedor"),
    observacao: document.getElementById("observacao"),
    score: document.getElementById("score"),
    codigo: document.getElementById("codigo"),
    cor: document.getElementById("cor")
  };

  // ===== ENVIO DO FORM =====
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const comodato = document.querySelector('input[name="comodato"]:checked')?.value || "";

    const params = new URLSearchParams();

    // adiciona todos os campos automaticamente
    for (let key in campos) {
      params.append(key, campos[key].value || "");
    }

    params.append("comodato", comodato);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyZEiVljxyujwS-fs-PeUYcv6Z08zpfVBisD9RHnlZxiNf5eyBWHGXNj4h60H9cc3nPOQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      });

      // tenta ler resposta
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Resposta inválida do servidor");
      }

      if (data.status === "success") {
        alert("Cadastro salvo com sucesso ✅");
        form.reset();
      } else {
        throw new Error("Erro retornado pelo script");
      }

    } catch (error) {
      console.error("Erro detalhado:", error);
      alert("Erro ao enviar dados ❌\nVeja o console (F12)");
    }
  });

  // ===== FORMATAÇÕES =====

  // CPF
  campos.cpf.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = v;
  });

  // RG
  campos.rg.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1})$/, "$1-$2");
    e.target.value = v;
  });

  // TELEFONE
  campos.telefone.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = v;
  });

  // MOEDA
  function formatarMoeda(campo) {
    campo.addEventListener("input", function (e) {
      let v = e.target.value.replace(/\D/g, "");
      v = (v / 100).toFixed(2);
      v = v.replace(".", ",");
      v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      e.target.value = "R$ " + v;
    });
  }

  formatarMoeda(campos.valor);
  formatarMoeda(campos.taxaInstalacao);

});

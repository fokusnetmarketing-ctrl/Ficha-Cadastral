document.getElementById("senhaInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    fazerLogin();
  }
});

function fazerLogin() {
  const senha = document.getElementById("senhaInput").value;
  const erro = document.getElementById("erroLogin");

  if (senha === senhaCorreta) {
    sessionStorage.setItem("logado", "true");

    document.getElementById("loginScreen").style.opacity = "0";

    setTimeout(() => {
      document.getElementById("loginScreen").style.display = "none";
    }, 300);

  } else {
    erro.textContent = "Senha incorreta ❌";
  }
}

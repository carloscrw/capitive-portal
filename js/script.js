// Função para extrair parâmetros da URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Verifica se há parâmetros na URL
var continueURL = getParameterByName("continue");
var userHash = getParameterByName("user_hash");

// Se houver continueURL e userHash, redireciona para a URL especificada e autentica o usuário
if (continueURL && userHash) {
  // Informações de autenticação do usuário
  var password = "The000vd@"; // Senha do usuário

  // Construção dos parâmetros da solicitação de autenticação
  var authenticationParams = {
    username: "", // Não temos o nome de usuário, apenas a senha
    password: password,
    user_hash: userHash,
  };

  // Construção da URL de autenticação
  var authenticationURL =
    "https://meucaptive.intelbras.com.br:2061/cp/itbcaptive.cgi";

  // Envia a solicitação de autenticação
  fetch(authenticationURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authenticationParams),
  })
    .then((response) => {
      if (response.ok) {
        // Autenticação bem-sucedida, redireciona o usuário para a URL especificada
        window.location.href = continueURL;
      } else {
        // Autenticação falhou, exibe mensagem de erro
        console.error("Erro de autenticação");
        // Você pode exibir uma mensagem de erro na tela se desejar
        // alert("Erro de autenticação. Por favor, tente novamente.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      // Trate o erro conforme necessário
    });
}

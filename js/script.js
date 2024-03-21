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
  // Informações do seu AP360
  var apMac = "80:85:44:1C:F3:09";
  var apIp = "10.0.0.1";
  var apRadio = "ap360";
  var ssid = "TESTE";
  var redirectUri = "https://www.instagram.com";

  // Substitua esta parte pelo código de autenticação do seu AP360
  // Por enquanto, vamos apenas redirecionar para a URL especificada
  window.location.href = continueURL;

  // Se precisar passar mais informações, você pode enviar uma requisição para o seu servidor com esses parâmetros
  // Exemplo de como enviar informações para o servidor usando fetch API:
  /*fetch('URL_do_seu_servidor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ap_mac: apMac,
      ap_ip: apIp,
      ap_radio: apRadio,
      client_mac: 'coloque_o_endereço_mac_do_cliente_aqui',
      timestamp: 'coloque_o_timestamp_aqui',
      user_hash: userHash,
      ssid: ssid,
      redirect_uri: redirectUri,
      username: 'coloque_o_nome_de_usuario_aqui',
      password: 'coloque_a_senha_aqui'
    })
  })
  .then(response => response.json())
  .then(data => {
    // Aqui você pode manipular a resposta do servidor, se necessário
  })
  .catch(error => {
    console.error('Erro:', error);
  });*/
}

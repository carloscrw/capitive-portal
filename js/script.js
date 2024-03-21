document.addEventListener("DOMContentLoaded", function () {
  var liberarInternetBtn = document.getElementById("liberarInternet");

  liberarInternetBtn.addEventListener("click", function () {
    liberarAcessoInternet();
  });

  function liberarAcessoInternet() {
    var continueUrl = "http://www.intelbras.com.br"; // URL que o usuário tentou acessar
    var apIp = "10.0.0.1"; // Endereço IP do Access Point
    var apMac = "00:11:22:33:44:66"; // Endereço MAC do Access Point
    var clientMac = "00:11:22:33:44:55"; // Endereço MAC do cliente Wireless
    var radio = "radio0"; // Nome do rádio Wireless
    var ssid = "MY_CAPTIVE"; // Nome do SSID Wireless
    var ts = Math.floor(Date.now() / 1000); // Timestamp atual em segundos
    var redirectUri = "http://10.0.0.1:2061/cp/itbcaptive.cgi"; // URL de redirecionamento
    var userHash = generateUserHash(); // Gerar user_hash aleatório

    var finalUrl =
      redirectUri +
      "?" +
      "continue=" +
      encodeURIComponent(continueUrl) +
      "&ip=" +
      apIp +
      "&ap_mac=" +
      apMac +
      "&mac=" +
      clientMac +
      "&radio=" +
      radio +
      "&ssid=" +
      ssid +
      "&ts=" +
      ts +
      "&redirect_uri=" +
      encodeURIComponent(redirectUri) +
      "&user_hash=" +
      userHash;

    window.location.href = finalUrl;
  }

  function generateUserHash() {
    // Função para gerar um user_hash aleatório
    return Math.random().toString(36).substring(2);
  }
});

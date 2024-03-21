document.addEventListener("DOMContentLoaded", function () {
  var instagramLink = document.querySelector(".instagram");
  var whatsappLink = document.querySelector(".whatsapp");

  // Monitorando cliques nos links do Instagram e WhatsApp
  instagramLink.addEventListener("click", function () {
    liberarAcessoInternet();
  });

  whatsappLink.addEventListener("click", function () {
    liberarAcessoInternet();
  });

  function liberarAcessoInternet() {
    var user_hash = getUserHash(); // Função para obter o user_hash (pode ser gerado aleatoriamente)
    var ts = Math.floor(Date.now() / 1000); // Timestamp atual em segundos
    var redirect_uri = "http://10.0.0.1:2061/cp/itbcaptive.cgi"; // URL de redirecionamento conforme a documentação
    var final_url = redirect_uri + "?ts=" + ts + "&user_hash=" + user_hash; // Construir a URL final

    window.location.href = final_url;
  }

  function getUserHash() {
    // Função para gerar um user_hash aleatório
    return Math.random().toString(36).substring(2);
  }
});

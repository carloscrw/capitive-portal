const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");
const config = require("./config");

const app = express();
const { serverIP, serverPort } = config;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Função para gerar o token HMAC SHA-256
function generateToken(user_hash, ts, secret) {
  const data = `${user_hash}|${ts}`;
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

// Rota para lidar com a entrada no servidor
app.get("/", (req, res) => {
  res.json({ message: "SERVIDOR ONLINE" });
});

// Rota para lidar com o envio do formulário
app.post("/submit", (req, res) => {
  const { fullname, phone } = req.body;
  const redirect_uri = req.query.redirect_uri;
  const user_hash = req.query.user_hash;
  const ts = Math.floor(Date.now() / 1000); // Timestamp em segundos
  const secret = process.env.SECRET_KEY; // Chave secreta compartilhada configurada no AP

  // Gerar o token HMAC SHA-256
  const token = generateToken(user_hash, ts, secret);

  // Construir a URL final para redirecionamento após a autenticação
  const finalRedirectUrl = `http://${serverIP}:${serverPort}/submit?continue=${encodeURIComponent(
    redirect_uri
  )}&ts=${ts}&user_hash=${user_hash}&token=${token}`;

  // Salvar os dados em um arquivo de log
  const logData = `${new Date().toISOString()} - Nome Completo: ${fullname}, Telefone: ${phone}\n`;
  fs.appendFile("log.txt", logData, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados:", err);
      res.status(500).send("Erro ao salvar os dados");
    } else {
      // Redirecionar o navegador do usuário para a URL final
      // Isso desencadeará a autenticação e redirecionamento para a URL desejada
      res.redirect(finalRedirectUrl);
    }
  });
});

// Iniciar o servidor
app.listen(serverPort, serverIP, () => {
  console.log(`Servidor rodando em http://${serverIP}:${serverPort}`);
});

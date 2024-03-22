const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Função para gerar o token HMAC SHA-256
function generateToken(user_hash, ts, secret) {
  const data = `${user_hash}|${ts}`;
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

// Rota para lidar com a entrada no servidor
app.get("/server", (req, res) => {
  res.json({ message: "SERVIDOR ONLINE" });
});

// Rota para lidar com o envio do formulário
app.post("/submit", (req, res) => {
  const { fullname, phone } = req.body;
  const redirect_uri = req.query.redirect_uri;
  const user_hash = req.query.user_hash;
  const ts = Math.floor(Date.now() / 1000); // Timestamp em segundos
  const secret = process.env.SECRET_KEY || "The000vd@"; // Chave secreta compartilhada configurada no AP

  // Gerar o token HMAC SHA-256
  const token = generateToken(user_hash, ts, secret);

  // Montar os parâmetros para redirecionamento
  const redirectParams = new URLSearchParams({
    continue: redirect_uri,
    ts: ts,
    user_hash: user_hash,
    token: token,
  });

  // Construir a URL final para redirecionamento
  const finalRedirectUrl = `${redirect_uri}?${redirectParams.toString()}`;

  // Salvar os dados em um arquivo de log
  const logData = `${new Date().toISOString()} - Nome Completo: ${fullname}, Telefone: ${phone}\n`;
  fs.appendFile("log.txt", logData, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados:", err);
      res.status(500).send("Erro ao salvar os dados");
    } else {
      // Redirecionar o navegador do usuário para a URL final
      res.redirect(finalRedirectUrl);
    }
  });
});

// Log IP e porta do servidor a cada 15 segundos
setInterval(() => {
  console.log(`Servidor rodando na porta ${PORT}`);
}, 15000);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

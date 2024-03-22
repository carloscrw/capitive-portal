require("dotenv").config();
console.log("Valor de SECRET_KEY:", process.env.SECRET_KEY);
module.exports = {
  serverIP: process.env.SERVER_IP || "127.0.0.1",
  serverPort: process.env.SERVER_PORT || 3333,
};

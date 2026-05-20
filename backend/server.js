const app = require("./app");
const { testConnection } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Serveur lance sur http://localhost:${PORT}`);
  });
}

startServer();

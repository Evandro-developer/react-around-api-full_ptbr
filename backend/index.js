import app from "./app";

const PORT = process.env.PORT || 3001;
const IP = process.env.IP || "0.0.0.0"; // Alterado para ouvir em todos os IPs disponíveis

app.listen(PORT, IP, () => {
  console.log(`Servidor escutando em http://${IP}:${PORT}`);
});

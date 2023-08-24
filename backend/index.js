import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://127.0.0.1:${PORT}`);
});

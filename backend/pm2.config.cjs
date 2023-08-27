module.exports = {
  apps: [
    {
      name: "MyAwesomeApp",
      script: "index.js", // Nome do arquivo principal, que é "index.js" de acordo com o seu package.json
      interpreter: "node", // Caminho para o executável do Node.js
      interpreter_args: "--es-module-specifier-resolution=node index.js", // Argumentos do Node.js para módulos ES
      watch: true, // Ativar o modo de observação
    },
  ],
};

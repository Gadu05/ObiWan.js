const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client){
    console.log("O cliente está pronto para ser utilizado.");

    loadCommands(client);
  }
}

//
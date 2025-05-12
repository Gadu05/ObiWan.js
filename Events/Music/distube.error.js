const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "error",

  execute(error, queue, song){
    console.log(`Erro \`${error}\` \nAo tentar Tocar \`${song.name}`);
  }

}

//
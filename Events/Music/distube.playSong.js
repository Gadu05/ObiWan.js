const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "playSong",

  execute(queue, song, client){
    console.log(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`);
  }

}

//
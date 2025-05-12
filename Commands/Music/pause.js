const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("pausar")
    .setDescription("Pausa a playlist."),
    
    /**
    * @param { ChatInputCommandInteraction } interaction
    * @param { Client } client
    */

    execute(interaction, client){

      //PREVINE DE RODAR O CODIGO SEM FILA
      if (!client.distube.getQueue(interaction)){
        interaction.reply({
          content: 'Não há nenhuma playlist ativa',
          ephemeral: true
        });
        return;
      }

      client.distube.pause(interaction);

      interaction.reply({
        content: 'Playslist pausada',
        ephemeral: false
      });

      
    }
};


//
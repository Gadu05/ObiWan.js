const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Aleatoriza as músicas da playlist."),
    
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

      
      client.distube.suffle(interaction);

      interaction.reply({
        content: 'A playlist foi aleatorizada',
        ephemeral: false
      });


    }
};

//
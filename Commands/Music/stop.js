const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop playing songs."),
    
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


      client.distube.stop(interaction);

      interaction.reply({
        content: 'Stopped the queue',
        ephemeral: false
      });

      
    }
};

//
const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");
const { default: DisTube } = require("distube");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("retomar")
    .setDescription("Despausa a playlist."),
    
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
      console.log(client.distube.getQueue(interaction));

      
      client.distube.resume(interaction);

      interaction.reply({
        content: 'A playslist voltou a tocar',
        ephemeral: false
      });


    }
};

//
const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Alterna o modo automático entre ON/OFF."),
    
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

      client.distube.getQueue(interaction).toggleAutoplay(interaction);

      let txt = "DESATIVADO";
      if (client.distube.getQueue(interaction).autoplay)
        txt = "ATIVADO";

      interaction.reply({
        content: 'O modo de reprodução automática está ' + txt,
        ephemeral: false
      });
      
    }
};


//
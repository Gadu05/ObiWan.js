const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");



module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pula a música atual."),
    
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

      let queue = client.distube.getQueue(interaction);

      try{
        if (!queue.autoplay && queue.songs.length == 1)
          client.distube.stop(interaction);
        else
          client.distube.skip(interaction);
      }
      catch(e){
        //if (e.name == "NO_UP_NEXT")
          console.log(e);
      }
      
      interaction.reply({
        content: 'A música atual foi pulada!',
        ephemeral: false
      });


    }


};

//


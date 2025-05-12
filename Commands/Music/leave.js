const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Obi Wan \"Ben\" Kenobi sairá do canal de voz."),
    
    /**
    * @param { ChatInputCommandInteraction } interaction
    * @param { Client } client
    */

    execute(interaction, client){

      client.distube.voices.leave(interaction);

      interaction.reply({
        content: 'BYE THERE!',
        ephemeral: false
      });
      interaction.deleteReply();
      
    }
};

//
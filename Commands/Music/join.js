const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Obi Wan \"Ben\" Kenobi entrará no canal de voz."),
    
    /**
    * @param { ChatInputCommandInteraction } interaction
    * @param { Client } client
    */

    execute(interaction, client){

      if (!interaction.member.voice.channel){
        interaction.reply({
          content: "Você não está em nenhum canal de voz",
          ephemeral: true });
          return;
      }

      client.distube.voices.join(interaction.member.voice.channel);

      interaction.reply({
        content: 'HELLO THERE!',
        ephemeral: false
      });

      
    }
};


//
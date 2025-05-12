const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Muda o volume do áudio.")
    .addIntegerOption(option =>
		  option.setName('vol')
  			.setDescription('Escreva o volume da música.')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100)),
        
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

      const vol = interaction.options.getInteger("vol");
      client.distube.setVolume(interaction, vol);

      interaction.reply({
        content: "Volume alterado para " + vol + "%.",
        ephemeral: true
      });
      
    }
};

//
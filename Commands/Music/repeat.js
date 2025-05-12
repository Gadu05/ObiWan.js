const { log } = require("console");
const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const { RepeatMode } = require("distube");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Choose the repeat mode.")
    .addStringOption(option =>
		option.setName('mode')
			.setDescription('Repeat song / Repeat queue / OFF')
			.setRequired(true)
			.addChoices(
				{ name: 'OFF', value: '0' },
				{ name: 'Song', value: '1' },
				{ name: 'Queue', value: '2' }
			)),

    /**
    * @param { ChatInputCommandInteraction } interaction
    * @param { Client } client
    */

    execute(interaction, client){
      const mode = parseInt(interaction.options.getString("mode"));
      const modeList = ["OFF", "Song", "Queue"];

      //PREVINE DE RODAR O CODIGO SEM FILA
      if (!client.distube.getQueue(interaction)){
        interaction.reply({
          content: 'Não há nenhuma playlist ativa',
          ephemeral: true
        });
        return;
      }
      
      client.distube.setRepeatMode(interaction, mode);

      interaction.reply({
        content: `Succesfully set repeat mode to ${modeList[mode]}`,
        ephemeral: false
      });
      

    }
};



//
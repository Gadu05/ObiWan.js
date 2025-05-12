const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

const imageUrl = "https://cdn.discordapp.com/avatars/798184652250546187/62c560c9fceac64eb4f758851b7accf7.webp?size=128"

let hello = ["https://media.tenor.com/Bks2Si272y4AAAAd/obi-wan-kenobi-hello-there.gif", 
             "https://media.tenor.com/qA9u4ETE66MAAAAC/hello-there-kenobi.gif"];

const helloThere = new EmbedBuilder()
  .setColor(0xFF00CC)
  .setTitle('Hello There!')
  .setAuthor({ name: "Obi-Wan 'Ben' Kenobi", iconURL: imageUrl })
  .setImage(hello[between(0, 1)]);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Will greet you back."),
  /**
  * @param { ChatInputCommandInteraction } interaction
  */
 
  execute(interaction){
    interaction.reply({ embeds: [helloThere] });
  }
};

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

//
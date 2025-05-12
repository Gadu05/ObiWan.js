const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const imageUrl = "https://cdn.discordapp.com/avatars/798184652250546187/62c560c9fceac64eb4f758851b7accf7.webp?size=128"
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


const helloThere = new EmbedBuilder()
  .setColor(0xFF00CC)
  .setTitle('Hello There!')
  .setAuthor({ name: "Obi-Wan \"Ben\" Kenobi", iconURL: imageUrl });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("conversar")
    .setDescription("Will greet you back.")
    .addStringOption(option =>
		  option.setName('question')
  			.setDescription('Escreva o que deseja conversar, jovem padawan.')
        .setRequired(true)),
  /**
  * @param { ChatInputCommandInteraction } interaction
  */
 
  async execute(interaction){
    const question = interaction.options.getString("question");

    const prompt = "Contexto: Você é o Grande Mestre Jedi Obi-Wan Kenobi, um mentor cauteloso e conservador. Pergunta: " + question;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    helloThere.setDescription(text);
    interaction.reply({ embeds: [helloThere] });
  }
};



//
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const imageUrl = "https://cdn.discordapp.com/avatars/798184652250546187/62c560c9fceac64eb4f758851b7accf7.webp?size=128";
const helloThere = new EmbedBuilder()
  .setColor(0xFF00CC)
  .setTitle('Hello There!')
  .setAuthor({ name: 'Obi-Wan "Ben" Kenobi', iconURL: imageUrl });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Adiciona uma música à playlist")
    .addStringOption(option =>
      option
        .setName("url")
        .setDescription("Escreva o nome ou cole o link da música que deseja tocar.")
        .setRequired(true)
    ),

  /**
   * @param { ChatInputCommandInteraction } interaction
   * @param { import("discord.js").Client } client
   */
  async execute(interaction, client) {
    const url = interaction.options.getString("url");
    const voiceChannel = interaction.member?.voice?.channel;

    if (!voiceChannel) {
      helloThere.setDescription("Você precisa estar em um canal de voz para utilizar este comando!");
      return interaction.reply({ embeds: [helloThere], ephemeral: true });
    }

    await interaction.deferReply();

    try {

      await client.distube.play(voiceChannel, url, {
        textChannel: interaction.channel,
        member: interaction.member,
        metadata: { interaction }
      });

      const queue = client.distube.getQueue(interaction);
      const song = queue.songs.at(-1); // última adicionada

      const resolvedSong = song.stream?.song ?? song;

      const musica = new EmbedBuilder()
        .setColor(0xFF00CC)
        .setTitle(`${resolvedSong.name}  -  [${resolvedSong.formattedDuration}]`)
        .setDescription(`${interaction.user.username} adicionou uma música à playlist`)
        .setImage(resolvedSong.thumbnail)
        .setURL(resolvedSong.url);

      /*
      const musica = new EmbedBuilder()
        .setColor(0xFF00CC)
        .setTitle(`${song.name}  -  [${song.formattedDuration}]`)
        .setDescription(`${interaction.user.username} adicionou uma música à playlist`)
        .setImage(song.thumbnail)
        .setURL(song.url);
        */

      await interaction.editReply({ embeds: [musica] });

    } catch (error) {
      console.error(error);

      helloThere.setDescription("❌ Não foi possível encontrar a música.\nTente com um nome mais específico ou envie o link.");
      await interaction.editReply({ embeds: [helloThere] });
    }
  },
};

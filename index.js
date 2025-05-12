require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection, ActivityType, Activity, Emoji } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { YouTubePlugin } = require("@distube/youtube");
const { SpotifyPlugin } = require("@distube/spotify");
const { DirectLinkPlugin } = require("@distube/direct-link");
const { FilePlugin } = require("@distube/file");


const fs = require("fs");


const client = new Client({ 
  intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
  partials: [User, Message, GuildMember, ThreadMember]
});

const { loadEvents } = require("./Handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();

//const path = "/home/codespace/.python/current/bin/yt-dlp";
const path = "C:\\yt-dlp\\yt-dlp.exe"; // caminho completo para o yt-dlp.exe
const cookieText = fs.readFileSync("cookies.txt", "utf8");

const ytdlpPlugin = new YtDlpPlugin({
  update: false,
  cookies: cookieText,
});

ytdlpPlugin.ytdlpBin = "C:\\yt-dlp\\yt-dlp.exe";

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  savePreviousSongs: true,
  plugins: [
    new YouTubePlugin(),
    new SpotifyPlugin(),
    new DirectLinkPlugin(),
    new FilePlugin(),
    ytdlpPlugin
  ]
});

client.plugin

loadEvents(client);

client.login(process.env.TOKEN).then(() => {
  console.log(`Cliente logado como ${client.user.username}`);
  client.user.setActivity(`com o meu sabre de luz.`, { type: ActivityType.Playing});
})
  .catch((err) => console.log(err));

//

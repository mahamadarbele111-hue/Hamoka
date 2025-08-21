const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const express = require("express");
const moment = require("moment-timezone");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Bot is running..."));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences
  ]
});
// Import packages
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

// ---------------------
// Web server (24/7 uptime)
const app = express();
app.get("/", (req, res) => {
  res.send("✅ Bot is alive and running!");
});
app.listen(3000, () => {
  console.log("🌍 Web server running on port 3000");
});

// ---------------------
// Discord Bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,          // server events
    GatewayIntentBits.GuildMessages,   // messages
    GatewayIntentBits.MessageContent   // message content
  ]
});

// When bot is ready
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// Example command
client.on("messageCreate", message => {
  if (message.author.bot) return; // بۆتێک ناوە
  if (message.content === "!ping") {
    message.reply("🏓 Pong!");
  }
});

// Login with token
client.login(process.env.TOKEN);

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!stats") {
    const guild = message.guild;
    const totalMembers = guild.memberCount;
    const bots = guild.members.cache.filter((m) => m.user.bot).size;
    const online = guild.members.cache.filter(
      (m) => m.presence && m.presence.status !== "offline"
    ).size;
    const voiceMembers = guild.members.cache.filter((m) => m.voice.channel).size;
    const iraqTime = moment().tz("Asia/Baghdad").format("YYYY-MM-DD HH:mm:ss");

    message.channel.send(
      `📊 **Server Stats:**
👥 Total Members: ${totalMembers}
🤖 Bots: ${bots}
🟢 Online: ${online}
🎙️ In Voice: ${voiceMembers}
🕒 Iraq Time: ${iraqTime}`
    );
  }
});

client.login(process.env.TOKEN);

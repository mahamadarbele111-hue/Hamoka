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

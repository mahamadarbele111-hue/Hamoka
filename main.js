// main.js

require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// دروستکردنی کلایەنت
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,             // بۆ گەڕان بە سێرڤەر
    GatewayIntentBits.GuildMessages,      // بۆ خوێندنەوەی نامە
    GatewayIntentBits.MessageContent      // بۆ خوێندنەوەی ناوەرۆکی نامە
  ]
});

// ئەمێت هەڵدەبێت کاتێک بۆتەکە لۆگین بکات
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// وەڵامدانەوە بە کاتێک بەکارهێنەر بنووسێت "!ping"
client.on("messageCreate", message => {
  if (message.content === "!ping") {
    message.reply("🏓 Pong!");
  }
});

// تۆکن لە .env دێت
client.login(process.env.TOKEN);

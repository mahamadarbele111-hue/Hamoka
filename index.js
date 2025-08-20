const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

let statsMessageId = null;

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

function getIraqTime() {
  const now = new Date();
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Baghdad",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);
}

async function createStatsEmbed(guild) {
  const membersCount = guild.members.cache.size;
  const botsCount = guild.members.cache.filter(m => m.user.bot).size;
  const onlineCount = guild.members.cache.filter(m => m.presence?.status === "online").size;
  const voiceCount = guild.members.cache.filter(m => m.voice.channel).size;
  const iraqTime = getIraqTime();

  return new EmbedBuilder()
    .setTitle(`📊 Server Statistics for ${guild.name}`)
    .addFields(
      { name: "🧑‍🤝‍🧑 Total Members", value: `${membersCount}`, inline: true },
      { name: "🤖 Bots", value: `${botsCount}`, inline: true },
      { name: "💻 Online Members", value: `${onlineCount}`, inline: true },
      { name: "🎤 Voice Channel Members", value: `${voiceCount}`, inline: true },
      { name: "🕒 Current Time (Iraq)", value: `${iraqTime}`, inline: false }
    )
    .setColor("Blue");
}

async function postOrUpdateStats(interaction) {
  const guild = interaction.guild;
  await guild.members.fetch();
  const channel = guild.channels.cache.get(config.statsChannelId);
  if (!channel) return interaction.reply("❌ Stats channel not found!");

  const embed = await createStatsEmbed(guild);

  if (!statsMessageId) {
    const msg = await channel.send({ embeds: [embed] });
    statsMessageId = msg.id;
  } else {
    const msg = await channel.messages.fetch(statsMessageId);
    await msg.edit({ embeds: [embed] });
  }
}

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "serverstats") {
    await interaction.reply("📊 Server stats are being displayed in the channel!");
    await postOrUpdateStats(interaction);

    setInterval(async () => {
      await postOrUpdateStats(interaction);
      console.log("🔄 Stats updated");
    }, config.updateInterval);
  }
});

client.login(config.token);

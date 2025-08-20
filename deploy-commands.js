const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const commands = [
  new SlashCommandBuilder()
    .setName("serverstats")
    .setDescription("Show server statistics (auto-updating embed)")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
  try {
    console.log("🟢 Refreshing slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );
    console.log("✅ Commands registered!");
  } catch (err) {
    console.error(err);
  }
})();

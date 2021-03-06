const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
const prefix = '!';

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Execute commands dynamically
client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const commandName = message.content.slice(prefix.length).trim().toLowerCase();

  const command = client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
    command.execute(message);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command :(');
  }
});

client.login(process.env.BOT_TOKEN);

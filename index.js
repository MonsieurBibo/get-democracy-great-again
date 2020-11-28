require('dotenv').config()
const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const prefix = config.prefix || "=" ;

const client = new Client();

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands/").filter(f => f.endsWith('.js'));

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command)
  console.log(`${file} loaded!`);
}

client.once('ready', () => {
  console.log('Client initialised!');
  client.user
    .setPresence({
      status: "online",
      game: {
        name: "with discord.js",
        url: "https://discord.js.org",
        type: "PLAYING"
      },
    })
    .catch(console.error);

})

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.member.send("there was an error trying to execute that command!");
  }
  
});


client.login(process.env.CLIENT_TOKEN);
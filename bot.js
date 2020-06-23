const Discord = require('discord.js');

const greetingsMap = new Map();

// Initialize Discord Bot
const client = new Discord.Client();
client.on('ready', function (evt) {
    console.log('Connected');
});

client.on('presenceUpdate', (old, newP) => {
  let userId = newP.user.id;
  let today = new Date().getDate();
  if (greetingsMap.has(userId)) {
    console.log(`${newP.user} está no mapa`);
    if (greetingsMap.get(userId) == today) {
      console.log(`${newP.user} já foi mencionado hoje`);
      return;
    }
  }

  if (old && old.status == 'online') {
    console.log(`${newP.user} já estava online`);
    return;
  }

  if (newP.status == 'online') {
    greetingsMap.set(userId, today);
    newP.guild.systemChannel.send(`${newP.user} E aí, Edmar?`);
  }
});

client.login(process.env.BOT_TOKEN);

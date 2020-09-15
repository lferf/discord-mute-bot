module.exports = {
  name: 'config',
  description: 'Creates a new text channel to control the bot.',
  execute (message) {
    message.channel.send('Configurando Hypno...')
      .then(() => {
        message.guild.createChannel(name, 'mute-bot');
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

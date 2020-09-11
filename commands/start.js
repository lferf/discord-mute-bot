module.exports = {
  name: 'start',
  aliases: ['st'],
  description: 'Message with reactions to control the muted status of a voice channel',
  execute (message) {
    if (message.channel.id === '751467327551176905') {
      message.channel.send('Reacciona con 🤫 para silenciar o con 👻 para que todos hablen')
        .then(response => {
          response.react('🤫');
          response.react('👻');

          const filter = (reaction, user) => {
            return ['🤫', '👻'].includes(reaction.emoji.name) && user.id !== response.author.id;
          };

          const collector = response.createReactionCollector(filter);

          collector.on('collect', (reaction, user) => {
            const reactioner = response.guild.member(user.id);

            if (reaction.emoji.name === '🤫' && reactioner.voice.channel) {
              const channel = message.guild.channels.cache.get(reactioner.voice.channel.id);
              for (const [memberID, member] of channel.members) {
                console.log(memberID);
                member.voice.setMute(true);
              }
            } else if (reaction.emoji.name === '👻' && reactioner.voice.channel) {
              const channel = response.guild.channels.cache.get(message.member.voice.channel.id);
              for (const [memberID, member] of channel.members) {
                console.log(memberID);
                member.voice.setMute(false);
              }
            }

            response.reactions.removeAll().catch(error => console.error('Failed to remove all reactions', error));
            response.react('🤫');
            response.react('👻');

            // reaction.remove().catch(error => console.error('Failed to remove reactions: ', error));
            // response.react(reaction.emoji);
          });

          collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
          });
        })
        .catch(() => console.error('Failed to write message'));
    }
  }
};

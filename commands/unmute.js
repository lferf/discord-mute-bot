module.exports = {
  name: 'unmute',
  aliases: ['unsho', 'desho', 'dessho', 'nosho', 'u'],
  description: 'Command used to unmute everyone on the same voice channel.',
  execute (message) {
    if (message.member.voice.channel) {
      const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      for (const [member] of channel.members) {
        member.voice.setMute(false);
      }
    }
  }
};

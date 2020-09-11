module.exports = {
  name: 'mute',
  aliases: ['sho', 'm', 's'],
  description: 'Command used to mute everyone on the same voice channel.',
  execute (message) {
    if (message.member.voice.channel) {
      const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {
        console.log(memberID);
        member.voice.setMute(true);
      }
    }
  }
};

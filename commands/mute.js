module.exports = {
  name: 'mute',
  description: 'Command used to mute everyone on the same voice channel.',
  execute(message) {   
    if (message.member.voice.channel) {
      let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {
        member.voice.setMute(true);
      }
    }
  }
};
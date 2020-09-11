module.exports = {
  name: 'stop',
  description: 'Stops listening for reactions and cleans the text channel from bot messages',
  execute (message) {
    if (message.channel.id === '751467327551176905') {
      message.channel.messages.fetch({ limit: 10 })
        .then(messages => message.channel.bulkDelete(messages))
        .catch(console.log('No messages where retrieved.'));
    }
    console.log(message.channel.id);
  }
};

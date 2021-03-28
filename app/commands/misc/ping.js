module.exports = {
  name: "ping",
  commands: ['ping', 'pingBot', 'pBot', 'pingB'],
  commandDescription:  'Is used to get bot responce time.',
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    message.channel.send(`PONG! | Latency is: **${Date.now() - message.createdTimestamp}ms.**`);
    message.channel.send(message.channel.id)
  
  },
}

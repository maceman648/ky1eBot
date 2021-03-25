module.exports = {
    name: 'ping',
    description: 'Is used to get bot responce time.',
    usage: ' ',
    
    execute(message, args) {
        //this really isnt perfect but it works might update it idk
        message.channel.send(`PONG! | Latency is: **${Date.now() - message.createdTimestamp}ms.**`);
    },
};

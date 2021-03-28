const fs = require('fs');

module.exports = {
    name: 'randomName',
    commands: ['randomName', 'rn', 'randomN', 'rName'],
    commandDescription: 'Gives a random name.',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        var output = '';
        var names = fs.readFileSync('./app/utils/names.txt').toString('utf-8');
        var namesByLine = names.split("\n");
        var rand = Math.floor((Math.random() * namesByLine.length));
        output = namesByLine[rand] ;
        message.channel.send(output);
    },
};

const fs = require('fs');

module.exports = {
    name: 'rName',
    description: 'Is used to get a random name',
    usage: ' ',
    
    execute(message, args) {
        var output = '';
        var names = fs.readFileSync('./main/commands/commandfiles/names.txt').toString('utf-8');
        var namesByLine = names.split("\n");
        var rand = Math.floor((Math.random() * namesByLine.length));
        output = namesByLine[rand] ;
        message.channel.send(output);
    },
};

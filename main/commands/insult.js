//speical thanks to frisly for most of the insults.
//https://github.com/YoFrisly

const fs = require("fs");


module.exports = {
    name: 'insult',
    description: 'The bot will kindly insult the givin name.',
    usage: '[name]',
    

    execute(message, args) {
    const name = args[0] ;
    if(name === undefined) return message.channel.send('come on give me a name to insult!');
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() ;

    var insults = fs.readFileSync('./main/commands/commandfiles/insults.txt').toString('utf-8'); 
    var insultsByLine = insults.split("\n");
    var randInsult = '';

    var rand = Math.floor((Math.random() * insultsByLine.length));
    randInsult = insultsByLine[rand] ;

    message.delete(); // deletes the message of who reqested it
    message.channel.send(`${nameCapitalized}${randInsult}`);
    
    console.log(`${nameCapitalized}${randInsult}`)    
    },
};

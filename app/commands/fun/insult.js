//speical thanks to frisly for most of the insults.
//https://github.com/YoFrisly

const fs = require("fs");


module.exports = {
    name: 'insult',
    commands: ['insult', 'i', 'beMean'],
    commandDescription: 'ky1e will kindky insult the givin name.',
    expectedArgs:'[name]',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {

    const name = arguments[0] ;
    if(name === undefined) return message.channel.send('come on give me a name to insult!');
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() ;

    var insults = fs.readFileSync('./app/utils/insults.txt').toString('utf-8'); 
    var insultsByLine = insults.split("\n");
    var randInsult = '';

    var rand = Math.floor((Math.random() * insultsByLine.length));
    randInsult = insultsByLine[rand] ;

    message.delete(); 
    message.channel.send(`${nameCapitalized}${randInsult}`);
    
    console.log(`${nameCapitalized}${randInsult}`)    
    },
};

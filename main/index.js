//to do
// host the bot onlie https://www.youtube.com/watch?v=h97jPO2v3Tc

const Discord = require("discord.js");
const fs = require('fs');
const { token, version } = require('./config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFlies = fs.readdirSync('./main/commands').filter(file => file.endsWith('.js'));




//loops through and loads all command files
for (const file of commandFlies) {
    const command = require(`./commands/${file}`);
    

    client.commands.set(command.name, command);
}

var colorCount = 20;


client.on('ready', () =>{
    var config = JSON.parse(fs.readFileSync('./main/config.json', 'utf-8'));// if config gets updated
    

    console.log(client.user.tag, "online");
    console.log(`client version ${version}`)
    console.log(commandFlies) ;

    client.user.setPresence({
        status: 'online',
        activity:{ 
            name: 'sponsored by monster | $help',
        }
    })

})


client.on('message', message => {
    var config = JSON.parse(fs.readFileSync('./main/config.json', 'utf-8'));// if config gets updated
    var rbowHex = JSON.parse(fs.readFileSync('./main/commands/commandfiles/rainbowHex.json', 'utf-8'));
    

    if (!message.content.includes(config.prefix))return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift();

    const command = client.commands.get(commandName) ||
                     client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return; 

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.author.send(`I can\'t execute '${message}' inside DMS!`);
    }


    try {
        command.execute(message, args);


        //make bot color cycle through a rainbow everytime a command is excuted.
        config.botColor = rbowHex.colors[colorCount] ;
        fs.writeFileSync('./main/config.json', JSON.stringify(config, null, 2));
        colorCount++ ;
        if(colorCount == 22) return colorCount = 0 ;
    }
    catch (error) {
        console.error(error);
        message.reply(`Whoops! thats an issue on our end... \n${error}`);
    }
});

client.login(token);
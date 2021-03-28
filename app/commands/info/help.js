const loadCommands = require('../../handlers/load-commands.js') 
const fs = require('fs')
const Discord = require('discord.js')
const { version } = require('../../config.json')

module.exports = {
    name: 'help',
    commands: ['help', 'h', 'botHelp',],
    expectedArgs: '<command>',
    commandDescription:  'Get a full list of all commands/extra info.',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        //const lookUpCommand = arguments[0]
        var config = JSON.parse(fs.readFileSync('./app/config.json', 'utf-8')); // if prefix gets updated

        const commands = loadCommands()
        console.log(commands)
           

            const embed = new Discord.MessageEmbed()
            .setColor(config.botColor) 
            .setTitle('Here\'s a list of all commands!')
            .setTimestamp()
            .setThumbnail('https://imgur.com/kGAkNgC.jpg')
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        
            
            embed.addField('\u200b', commands.map(command => `[${command.name}]`,false)) 
            //embed.addField('\u200b', `**Use ${config.prefix}help [command name] to get more info on a command!**` ,false)
            embed.addField('\u200b', `Current prefix ${config.prefix}`,false) 
            embed.addField('🤖 Bot version', config.version, false)
            embed.addField('💾 Source code!', 'https://github.com/maceman648/ky1eBot', true)

        return message.channel.send(embed)
        
        //to do
        //fix output of commandInfo

        // const nameT = arguments[0];
        // const command = commands.get(nameT) 
        
        // if (!commands) {
        //     return message.reply('yeah, I dont got that command bro...');
        // }

        // const embedCommandInfo = new Discord.MessageEmbed()
        // .setColor(config.botColor) 
        // .setTitle(`**Name:** ${commands[1].name}`);

        // if (command.description) embedCommandInfo.addField('**Description:**',`${command.description}`, false ) ;
        // if (command.usage === ' ') embedCommandInfo.addField('**Usage:**',`${config.prefix}${command.name}`, false) ;
        // else if(command.usage) embedCommandInfo.addField('**Usage:**', `${config.prefix}${command.name} ${command.usage}`, false) ;
        // if (command.example) embedCommandInfo.addField('**Example:**', `${command.example}`, false) ;
        // if (command.extraInfo) embedCommandInfo.addField('**extraInfo:**', `${command.extraInfo}`, false) ;



        //message.reply(embedCommandInfo) ;
    },
}

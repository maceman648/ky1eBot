const Discord = require("discord.js");
const fs = require("fs");


module.exports = {
    name: 'help',
    description: 'Get a full list of all commands/extra info.',
    usage: '<command>',
    execute(message, args) {
        const { commands } = message.client;
        var config = JSON.parse(fs.readFileSync('./main/config.json', 'utf-8')); // if prefix gets updated

        //posibly update look of embed
        //https://leovoel.github.io/embed-visualizer/
        //https://embedbuilder.nadekobot.me/
        
        

        if (!args.length) {
            const embedList = new Discord.MessageEmbed()
                .setColor(config.botColor) 
                .setTitle('Here\'s a list of all commands!')
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                //.addField('Source code!', 'https://github.com/maceman648/maceManFunBot', true)

            embedList.addField('\u200b', commands.map(command => `[${command.name}]`,false)) ;
            embedList.addField('\u200b', `**Use ${config.prefix}help [command name] to get more info on a command!**` ,false)
            //embedList.addField('\u200b', '\u200b', false)
            embedList.addField('🤖 Bot version', config.version, false)
            embedList.addField('💾 Source code!', 'https://github.com/maceman648/maceManFunBot', true)
            //console.log(embedList.toJSON()) ;
        
            return message.channel.send(embedList)
            
        }

        const name = args[0];
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		
        if (!command) {
			return message.reply('yeah, I dont got that command bro...');
		}

        const embedCommandInfo = new Discord.MessageEmbed()
        .setColor(config.botColor) 
        .setTitle(`**Name:** ${command.name}`);

		if (command.description) embedCommandInfo.addField('**Description:**',`${command.description}`, false ) ;
        if (command.usage === ' ') embedCommandInfo.addField('**Usage:**',`${config.prefix}${command.name}`, false) ;
        else if(command.usage) embedCommandInfo.addField('**Usage:**', `${config.prefix}${command.name} ${command.usage}`, false) ;
        if (command.example) embedCommandInfo.addField('**Example:**', `${command.example}`, false) ;
        if (command.extraInfo) embedCommandInfo.addField('**extraInfo:**', `${command.extraInfo}`, false) ;



        message.reply(embedCommandInfo) ;
    },
};

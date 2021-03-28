const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'catch',
    commands: ['catch', 'c', 'snipe'],
    commandDescription: 'Use this to catch someones sus message in 4k.',
    expectedArgs:'[id]',
    commandHelp: `https://i.gyazo.com/a83cb335de7cbe9929303a3de5eb11ce.gif`,
    extraInfo: `Message must be in the same channel as the channel catch is being excuted in.`,
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        var config = JSON.parse(fs.readFileSync('./app/config.json', 'utf-8'));// if config gets updated
        const givenId = arguments[0] ;

       
        message.channel.messages.fetch(`${givenId}`)
            .then(message =>{
                const embed = new Discord.MessageEmbed()
                    .setColor(config.botColor)
                    .setTitle(`Damn looks like ky1e caught ${message.author.username} in 4k!`)
                    .addField(`${message.author.username} said:`,`${message.content}`, false)
                    .setThumbnail('https://imgur.com/6hc8GNT.jpg')
                    .setTimestamp()
                    .setFooter(`Sent by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))


                message.channel.send(embed)

                console.log(message.author.username)
                console.log(message.content)

        })      
        .catch((error) =>{

            message.channel.send(`Please specify a message id: \nGivin id must be from the same channel as the channel ${config.prefix}catch was excuted in.\nHow do I get a message id? You may ask: \nhttps://i.gyazo.com/a83cb335de7cbe9929303a3de5eb11ce.gif`)
            
        })
    },
};

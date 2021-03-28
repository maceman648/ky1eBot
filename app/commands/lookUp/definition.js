const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {
    name: 'definition',
    commands: ['definition', 'define', 'd', 'lookUpWord'],
    expectedArgs: '[word]',
    commandDescription: 'Use to find a definition of a word.',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        var config = JSON.parse(fs.readFileSync('./app/config.json', 'utf-8'));// if config gets updated

        const responce = [];
        var word = arguments[0];

        if(word === undefined) return message.channel.send(`Please specify a word you\'d like a defintion for.`)

        var url=`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;
        var obj ;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            obj = JSON.stringify(data, null, 2);
        })
        .then(() =>{
            fs.writeFileSync('./app/utils/output.json', obj);

            fs.readFile('./app/utils/output.json', 'utf-8', (err, jsonString)=>{
                if(err){
                    console.log(err);
                }else{
                    try {
                        const data = JSON.parse(jsonString);
                        
                        //output isnt perfect...

                        //to do 
                        //if output has many definitions then display those definitions up to 3

                        const embed = new Discord.MessageEmbed()
                            .setColor(config.botColor)
                            .setTitle(`Ky1e kindly found the definition of "${data[0].word}" just for you!`)//word
                            .setDescription(`${data[0].phonetics[0].text}`)//text
                            .addFields(
                                {name: '1.', value: `${data[0].meanings[0].definitions[0].definition}`},
                                //{name: '2.', value: `${data[0].meanings[0].definitions[1].definition}`},
                                {name: 'synonyms', value: `${data[0].meanings[0].definitions[0].synonyms}`},
                                {name: '\u200B', value: `${url}`}
                            )
                            .setThumbnail('https://imgur.com/aDnTU2z.jpg')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                        
                        

                        console.log(data[0].meanings[0].definitions[1])

                        message.channel.send(embed);
                        console.log(embed.toJSON())
                            
                        
                    } catch(err) {

                        const errorEmbed = new Discord.MessageEmbed()
                        .setColor(config.botColor)
                        .setTitle('OH NO!')
                        .setDescription(`Sorry we couldn\'t find a definition for the word ${word} :( \n \n You can try the search again at later time or head to the web instead. `)
                        .setFooter(url);

                        message.channel.send(errorEmbed);


                        console.log('Error parsing JSON', err);
                    }
                }
            });               
        });
    },
};
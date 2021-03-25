const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {
    name: 'definition',
    description: 'Use to find a definition of a word',
    usage: '[word]',
    execute(message, args) {

        var config = JSON.parse(fs.readFileSync('./main/config.json', 'utf-8'));// if prefix gets updated

        const responce = [];
        var word = args[0];

        if(word === undefined) return message.channel.send(`Please specify a word you\'d like a defintion for.`)

        var url=`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;
        var obj ;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            obj = JSON.stringify(data, null, 2);
        })
        .then(() =>{
            fs.writeFileSync('./main/commands/commandfiles/output.json', obj);

            fs.readFile('./main/commands/commandfiles/output.json', 'utf-8', (err, jsonString)=>{
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
                            .setTitle(`${data[0].word}`)//word
                            .setDescription(`${data[0].phonetics[0].text}`)//text
                            .addFields(
                                {name: '1.', value: `${data[0].meanings[0].definitions[0].definition}\n **synonyms** \n *${data[0].meanings[0].definitions[0].synonyms}*`},
                                //{name: '2.', value: `${data[0].meanings[0].definitions[1].definition}`},
                                //{name: 'synonyms', value: `${data[0].meanings[0].definitions[0].synonyms}`}
                            )
                            .setFooter(url);

                        // a possibly fix
                        // for(var i = 0; i = 3; i++){
                        //     embed.addField(`${i+1}.`,`${data[0].meanings[0].definitions[i].definition[0]}`, false)
                        // }

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
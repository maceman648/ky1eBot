const fs = require("fs");

module.exports = {
    name: 'changePrefix',
    description: 'Changes bots prefix.',
    usage: '[newPrefix]',
    extraInfo: 'It is not recommended to change prefix to "#" "@" "/".',

    execute(message, args) {
        const newPrefix = args[0] ;

        if(newPrefix === undefined) return message.channel.send("Please specify a new prefix");
        
        var oldPrefix = JSON.parse(fs.readFileSync('./main/config.json', 'utf-8'));

        oldPrefix.prefix = newPrefix ;

        fs.writeFileSync('./main/config.json', JSON.stringify(oldPrefix, null, 2));
        message.channel.send(`Prefix has been updated to "${newPrefix}"!`)
        console.log(oldPrefix) ;
            
    },
};

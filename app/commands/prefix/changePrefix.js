const mongo = require('../../handlers/mongo')
const prefixSchema = require('../../handlers/schemas/prefixSchema')
const commandBase = require('../../handlers/command-base')

module.exports = {
    name: 'changePrefix',
    commands: ['changePrefix', 'cp', 'changeP', 'cPrefix'],
    expectedArgs: '[newPrefix]',
    commandDescription: 'Changes bots prefix.',
    extraInfo: 'It is not recommended to change prefix to "#" "@" "/".',
    permissionError: 'You need admin permissions to run this command',
    permissions: 'ADMINISTRATOR',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {
        const  guildId  = message.guild.id
        const newPrefix = arguments[0]

        await mongo().then(async (mongoose)=>{
            try{
                await prefixSchema.findOneAndUpdate({
                    _id: guildId
                },{
                    _id: guildId,
                    prefix: newPrefix
                },{
                    upsert: true
                })

                message.channel.send(`Prefix has been updated to "${newPrefix}"!`)
                console.log(`Prefix has been updated to "${newPrefix}" in guild "${guildId}"!`) ;
                
                commandBase.updateCache(guildId, newPrefix)

            }finally{
                mongoose.connection.close()
            }
        })
    } 
}
const mongo = require('../../handlers/mongo')
const prefixSchema = require('../../handlers/schemas/prefixSchema')
const commandBase = require('../../handlers/command-base')
const { defaultPrefix } = require('../../config.json')

module.exports = {
    name: 'restorePrefix',
    commands: ['restorePrefix', 'rp', 'restoreP', 'rPrefix'],
    commandDescription:  'Restores bot\'s prefix to the default prefix "kyle$".',
    permissionError: 'You need admin permissions to run this command',
    permissions: 'ADMINISTRATOR',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
        const  guildId  = message.guild.id

        await mongo().then(async (mongoose)=>{
            try{
                await prefixSchema.findOneAndUpdate({
                    _id: guildId
                },{
                    _id: guildId,
                    prefix: defaultPrefix 
                },{
                    upsert: true
                })

                message.channel.send(`Prefix has been restored to default!`)
                console.log(`Prefix has been restored to default! in guild "${guildId}"!`) ;
                
                
                commandBase.updateCache(guildId, defaultPrefix)

            }finally{
                mongoose.connection.close()
            }
        })
    }
}
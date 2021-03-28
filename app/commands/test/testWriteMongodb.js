const mongo = require('../../handlers/mongo.js')
const testSchema = require('../../handlers/schemas/testSchema')
const { Guild, Channel } = require('discord.js')
module.exports = {
    name: 'testWriteToMongoDB',
    commands: ['testWrite', 'tw'],
    expectedArgs: '[testMessage]',
    commandDescription: 'test write to the mongoDB',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: async(message, arguments, text) => {
        const {channel, guild} = message

        //welcomeMessage = arguments[0]

        await mongo().then(async (mongoose) =>{
            try{
                await testSchema.findOneAndUpdate( {
                    _id: guild.id
                }, {
                    _id: guild.id,
                    text,
                }, {
                    upsert: true
                })
            
            }finally{
                mongoose.connection.close()
            }
        })
    },
    permissions: 'ADMINISTRATOR',
}
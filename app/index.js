const Discord = require('discord.js')
const client = new Discord.Client()

const { token, version } = require('./config.json');
const loadCommands = require('./handlers/load-commands.js')
const commandBase = require('./handlers/command-base.js')
const mongo = require('./handlers/mongo.js')


client.on('ready', async () => {
    
    console.log(client.user.tag, "online");
    console.log(`client version ${version}`)
    
    await mongo().then(mongoose =>{
        try{
            console.log('connected to mongo')
        }finally{
            mongoose.connection.close()
        }
    })
    commandBase.loadPrefixes(client)
    loadCommands(client)
    

    client.user.setPresence({
        status: 'online',
        activity:{ 
            name: 'sponsored by monster | $help',
        }
    })
})

client.login(token)

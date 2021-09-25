const { Client } = require('discord.js');
const { readdirSync, statSync, readdir } = require('fs');
const { join } = require('path')

const cmd_db = require('../../models/commands')

module.exports = class extends Client {
    constructor (options){
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }

    async registerCommands(){

        //Only at 1 server
       var addComand =  await this.guilds.cache.get(process.env.GUILD_ID).commands.set(this.commands)
       console.log('Todos os comandos foram registrados!') 

       var cmd = addComand.toJSON()
       for (var i = 0; i < cmd.length ; i++){
            cmd_db.findOneAndUpdate(
                { cmdName: cmd[i].name },
                { $set: {
                    cmdName: cmd[i].name, 
                    cmdDesc: cmd[i].description, 
                    cmdID: cmd[i].id}},
                {upsert: true, new: true}
            ).exec()
       }

        //All servers
        //this.application.commands.set(this.commands) DO NOT UNCOMMENT THIS BEFORE PRODUCTION
    }

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)

        for (const category of categories){
            const commands = readdirSync(`${path}/${category}`)
            for(const command of commands){
                const cmdClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (cmdClass)(this)
                this.commands.push(cmd)
            }
        }
    }

    loadEvents(path = 'src/events'){
        const categories = readdirSync(path)
        for (const category of categories){
            const events = readdirSync(`${path}/${category}`)
            for(const event of events){
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)
                this.on(evt.name, evt.run)
            }
        }
    }
}
const Event = require('../../structures/Event')
const cmd_db = require('../../../models/commands')

module.exports = class extends Event {
    constructor(client){
        super(client, {
            name: 'ready'
        })
    }

    run =  () => {
        console.log(`Bot logged in as ${this.client.user.username} in ${this.client.guilds.cache.size} servers`)
        this.client.registerCommands()
    }
}
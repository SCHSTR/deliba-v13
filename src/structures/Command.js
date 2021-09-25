class Command {
    constructor(client, options){
        this.client = client
        this.name = options.name
        this.description = options.description
        this.category = options.category
        this.options = options.options
    }
}

module.exports = Command
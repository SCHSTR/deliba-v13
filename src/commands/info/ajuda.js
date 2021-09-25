const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ajuda',
            category: 'info',
            description: 'Precisa de ajuda? Só me chamar! 🆘'
        })
    }

    run = (interaction) => {
        //interaction.reply('Hello World!') all users can see the response from bot

        interaction.reply({
            content: 'world! ;D',
            ephemeral: true //only for the user
        })
    }
}


const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'track',
            category: 'utilidade',
            description: 'Eu faço o rastreamento pra você e te atualizo quando chega algo novo 🤯'
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

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'edit',
            category: 'utilidade',
            description: 'Registrou o track com nome errado? Ou só quer mudar o nome? Só chamar esse comando ✏️',
            options: [
                {
                    name: 'atual',
                    type: 'STRING',
                    description: 'O apelido atual que você registrou'
                },
                {
                    name: 'novo',
                    type: 'STRING',
                    description: 'O novo apelido que deve ser aplicado'
                },
        ]
        })
    }

    run = async (interaction) => {
        //interaction.reply('Hello World!') all users can see the response from bot

        interaction.reply({
            content: 'world! ;D',
            ephemeral: true //only for the user
        })
    }
}
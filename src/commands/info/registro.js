const Command = require('../../structures/Command');
const axios = require('axios');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'registro',
            category: 'info',
            description: 'Faça seu registro agora! 🙍‍♀️',
            options:[
                {
                    name: 'email',
                    type: 'STRING',
                    description: 'Digite o seu email',
                    required: true
                }
            ]
        })
    }



    run = async (interaction) => {
        
        const discordId = interaction.user.id
        const email = interaction.options.getString('email')
        const testedEmail =  validateEmail(email)

        if(!testedEmail) return interaction.reply({content: 'Parece que você digitou um email inválido 😢', ephemeral: true})

        axios.post(`${process.env.API_URL}/auth/register/discord`, {
            email: email,
            discordId: discordId
        }).then(res => {
            console.log(res.data)
            if(res.data.data.code === 'P2002') return interaction.reply({
                content: 'Este e-mail parece já estar sendo usado 😳',
                ephemeral: true
            })

            interaction.reply({
                content: 'Seu registro foi realizado com sucesso!',
                ephemeral: true
            })
        }).catch(err => console.log(err))
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

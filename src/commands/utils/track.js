const { MessageActionRow, MessageButton } = require('discord.js');
const Command = require('../../structures/Command');
const axios = require('axios')

const actionRow = new MessageActionRow()
    .addComponents(
        [
            new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('Quero me registrar ✍️')
                .setCustomId('register')
        ]
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'track',
            category: 'utilidade',
            description: 'Eu faço o rastreamento pra você e te atualizo quando chega algo novo 🤯'
        })
    }

    run = async (interaction) => {

        // axios.post(`${process.env.API_URL}/track/discord`, {
        //     id: interaction.user.id
        // }).then(res => {
        //     console.log(res.data)
        // })

        const query = await axios.post(`${process.env.API_URL}/track/discord`, {
            id: interaction.user.id
        })

        const isAuth = query.data.authorized

        //if(!isAuth) return(
            const reply = await interaction.reply({
                content: `Parece que você não está registrado no nosso sistema ainda 😭`,
                components: [actionRow],
                fetchReply: true
            })


            
            const filter = (btn) => btn.user.id === interaction.user.id
            const collector = reply.createMessageComponentCollector({ filter, time: 30000 })

            collector.on('collect', (i) => {

                i.update(
                    {
                        content: `Digite o seu email aqui`,
                        components: []
                    }
                )
            })

            collector.on('end', (collected, reason) => {
                if(reason === 'time') interaction.editReply({
                    content: `Acabou o tempo do botão, caso queira se registrar digite \`/registro\``,
                    components: []
                })
            })
       //)


        console.log(isAuth)
        
        // interaction.reply({
        //     content: 'world! ;D',
        //     ephemeral: true //only for the user
        // })
    }
}

const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');
const axios = require('axios')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'rastreio',
            category: 'utilidade',
            description: 'Quer saber onde está sua encomenda? 🚚',
            options: [{
                name: 'código',
                type: 'STRING',
                description: 'Insira o seu código aqui. ex: OO388427182BR',
                required: true
            }]
        })
    }

    run = async (interaction) => {
        const trackCode = interaction.options.getString('código')

        const types = [
            {name: 'Correios', value: 'correios'},
            {name: 'Type 2', value: 'type2'},
            {name: 'Type 3', value: 'type3'},
        ]

        const dropdown = new MessageActionRow()
            .addComponents([
                new MessageSelectMenu()
                .setCustomId('methodSelection')
                .setPlaceholder('Selecione sua forma de transporte')
                .addOptions(
                    types.map(t =>{
                        return{
                            label: t.name,
                            value: t.value
                        }
                    })
                )
            ])
            
        const reply = await interaction.reply({
            content: 'Qual transportadora você tá usando? 🤔',
            components: [dropdown],
            fetchReply: true
        })

        const filter = (int) => int.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({filter, max: 1, time: (60 * 1000)})

        collector.on('collect', (int) => {
            const method = int.values[0]
            switch(method){
                case 'correios':
                    if(trackCode.length != 13) return interaction.editReply({content: 'O código parece ser inválido, verifique e tente novamente 😢', components: []})

                    axios.get(`${process.env.API_URL}/rastreio/${method}/${trackCode}`).then(res => {
                        if(!res.data) return interaction.editReply({content: 'Parece que o produto ainda não foi registrado no serviço dos correios, tente novamente mais tarde 😢', components: []})
        
                        const responseEmbed = new MessageEmbed()
                            .setColor('GOLD')
                            .setTitle(`Status: ${res.data.status}`)
                            .addFields(
                                { name: 'Data', value: `${res.data.data}`, inline: true },
                                { name: 'Hora', value: `${res.data.hora}`, inline: true },
                                { name: 'Local', value: `${res.data.local}`}
                            )
                            .setFooter('made with 💕 schstr#5420')
                            .setTimestamp()
                    
                        interaction.editReply({content: 'Aqui está o status da sua encomenda 😋', embeds: [ responseEmbed ], components: [], ephemeral: true})
                    })
                break

                case 'type2':
                    interaction.editReply({content: 'Método indisponível atualmente, tente outro 😢', components: []})
                break

                case 'type3':
                    interaction.editReply({content: 'Método indisponível atualmente, tente outro 😢', components: []})
                break
            }
        })

        collector.on('end', (collected, reason) => {
            if(reason === 'time') interaction.editReply({content: 'Você demoroui muito pra selecionar o método de transporte, execute o comando novamente 😢', components: []})
        })
    }
}

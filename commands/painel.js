const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('painel')
        .setDescription('Painel premium da Vortex Diamonds'),

    async execute(interaction) {

        const embed = new EmbedBuilder()

            .setColor('#a855f7')

            .setTitle('💎 VORTEX DIAMONDS')

            .setDescription(`
# 👑 CENTRAL DE ATENDIMENTO

Bem-vindo ao suporte oficial da **Vortex Diamonds**.

Selecione uma categoria abaixo para abrir atendimento com nossa equipe.

## 📋 Categorias Disponíveis

💎 Comprar Diamantes  
🛠 Suporte Técnico  
💰 Pagamentos  
🤝 Revendedores  

⚡ Atendimento rápido, seguro e profissional.
            `)

            .setThumbnail(
                'https://cdn-icons-png.flaticon.com/512/5968/5968756.png'
            )

            .setImage(
                'https://cdn.discordapp.com/attachments/1474613054703669453/1507169383653314570/7fabe658-acf0-4dda-baf4-7a3e3eb9c690.png?ex=6a10ec5e&is=6a0f9ade&hm=b91c214c2dc361901e05cd389e032639d5c0400bbd8c22ff9605c3a17bf3bd6c'
            )

            .setFooter({
                text: 'Vortex Diamonds • Sistema Premium'
            });

        const menu = new StringSelectMenuBuilder()

            .setCustomId('ticket_menu')

            .setPlaceholder('📩 Selecione uma categoria')

            .addOptions([

                {
                    label: 'Comprar Diamantes',
                    description: 'Abrir ticket para compras',
                    emoji: '💎',
                    value: 'compras'
                },

                {
                    label: 'Suporte',
                    description: 'Abrir ticket de suporte',
                    emoji: '🛠',
                    value: 'suporte'
                },

                {
                    label: 'Pagamentos',
                    description: 'Ajuda com pagamentos',
                    emoji: '💰',
                    value: 'pagamentos'
                },

                {
                    label: 'Revendedores',
                    description: 'Área de revendedores',
                    emoji: '🤝',
                    value: 'revendedores'
                }

            ]);

        const row = new ActionRowBuilder()
            .addComponents(menu);

        await interaction.channel.send({

            embeds: [embed],

            components: [row]

        });

        await interaction.reply({

            content: '✅ Painel enviado com sucesso.',

            ephemeral: true

        });

    }

};
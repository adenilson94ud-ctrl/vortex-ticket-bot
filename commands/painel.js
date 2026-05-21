const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('painel')
        .setDescription('Painel Ultra Premium'),

    async execute(interaction) {

        const embed = new EmbedBuilder()

            // COR ROXO NEON
            .setColor('#a855f7')

            // TITULO
            .setTitle('💎 VORTEX DIAMONDS')

            // DESCRIÇÃO
            .setDescription(`
# 👑 CENTRAL PREMIUM

Bem-vindo ao atendimento oficial da **Vortex Diamonds**.

━━━━━━━━━━━━━━━━━━

## 📋 ÁREAS DISPONÍVEIS

💎 Compra de Diamantes  
🛠 Suporte Técnico  
💰 Pagamentos  
🤝 Revendedores  

━━━━━━━━━━━━━━━━━━

⚡ Atendimento rápido  
🔒 Compra segura  
👑 Sistema profissional
            `)

            // LOGO
            .setThumbnail(
'https://cdn-icons-png.flaticon.com/512/5968/5968756.png'
            )

            // BANNER ROXO
            .setImage(
'https://cdn.discordapp.com/attachments/1474613054703669453/1507169383653314570/7fabe658-acf0-4dda-baf4-7a3e3eb9c690.png?ex=6a10ec5e&is=6a0f9ade&hm=b91c214c2dc361901e05cd389e032639d5c0400bbd8c22ff9605c3a17bf3bd6c'
            )

            // FOOTER
            .setFooter({
                text: 'Vortex Diamonds • Sistema Ultra Premium'
            });

        // MENU
        const menu = new StringSelectMenuBuilder()

            .setCustomId('ticket_menu')

            .setPlaceholder('📩 Selecione uma categoria')

            .addOptions([

                {
                    label: 'Comprar Diamantes',
                    description: 'Abrir ticket de compras',
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

        // ENVIAR PAINEL
        await interaction.channel.send({

            embeds: [embed],

            components: [row]

        });

        // RESPOSTA
        await interaction.reply({

            content: '✅ Painel ultra premium enviado.',

            ephemeral: true

        });

    }

};
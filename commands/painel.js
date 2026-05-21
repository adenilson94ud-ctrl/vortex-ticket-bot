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

        // COR ROXA
        .setColor('#a855f7')

        // TITULO
        .setTitle('💎 VORTEX DIAMONDS')

        // DESCRIÇÃO
        .setDescription(`
# 👑 CENTRAL DE ATENDIMENTO

Bem-vindo ao sistema oficial da **Vortex Diamonds**.

Selecione uma categoria abaixo para abrir um ticket com nossa equipe.

## 📋 Categorias Disponíveis

💎 Comprar Diamantes  
🛠 Suporte Técnico  
💰 Pagamentos  
🤝 Revendedores  

⚡ Atendimento rápido, seguro e profissional.
        `)

        // LOGO
        .setThumbnail(
'https://cdn-icons-png.flaticon.com/512/5968/5968756.png'
        )

        // SUA IMAGEM ROXA
        .setImage(
'https://cdn.discordapp.com/attachments/1506785864058015835/1507163196828684349/image_2026-05-21_152817584.png?ex=6a10e69b&is=6a0f951b&hm=de1bfe034a9b318cec42bc3459c0ecd89c81c997d0e2670ae4f4e4c67474fa4e'
        )

        // FOOTER
        .setFooter({
            text: 'Vortex Diamonds • Sistema Premium'
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

            components: [row],

            files: [
                './vortex-roxa.png'
            ]

        });

        await interaction.reply({

            content: '✅ Painel premium enviado.',

            ephemeral: true

        });

    }

};
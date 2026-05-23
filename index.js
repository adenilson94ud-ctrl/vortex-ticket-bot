require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    SlashCommandBuilder,
    REST,
    Routes
} = require('discord.js');

const discordTranscripts = require('discord-html-transcripts');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const config = {

    ticketCategory: '1506785757866754241',
    supportRole: '1506801175348121672',
    logChannel: '1506865070091669668'

};

client.once('ready', async () => {

    console.log('BOT ONLINE');

    const commands = [

        new SlashCommandBuilder()
            .setName('painel')
            .setDescription('Enviar painel premium')

    ].map(cmd => cmd.toJSON());

    const rest = new REST({ version: '10' })
        .setToken(process.env.TOKEN);

    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
    );

});

client.on('interactionCreate', async interaction => {

    // COMANDO /PAINEL
    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === 'painel') {

            const embed = new EmbedBuilder()

                .setColor('#a855f7')

                .setTitle('💎 VORTEX DIAMONDS')

                .setDescription(`
# 👑 CENTRAL PREMIUM

Selecione uma categoria abaixo.

━━━━━━━━━━━━━━━━━━

💎 Comprar Diamantes  
🛠 Suporte Técnico  
💰 Pagamentos  
🤝 Revendedores  

━━━━━━━━━━━━━━━━━━

⚡ Atendimento rápido  
🔒 Compra segura  
👑 Sistema profissional
                `)

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
                        value: 'compras',
                        emoji: '💎'
                    },

                    {
                        label: 'Suporte',
                        value: 'suporte',
                        emoji: '🛠'
                    },

                    {
                        label: 'Pagamentos',
                        value: 'pagamentos',
                        emoji: '💰'
                    },

                    {
                        label: 'Revendedores',
                        value: 'revendedores',
                        emoji: '🤝'
                    }

                ]);

            const row = new ActionRowBuilder()
                .addComponents(menu);

            await interaction.channel.send({

                embeds: [embed],

                components: [row]

            });

            await interaction.reply({

                content: '✅ Painel enviado.',

                ephemeral: true

            });

        }

    }

    // MENU TICKET
    if (interaction.isStringSelectMenu()) {

        if (interaction.customId === 'ticket_menu') {

            const ticketExiste =
interaction.guild.channels.cache.find(
c => c.topic === interaction.user.id
);

            if (ticketExiste) {

                return interaction.reply({

                    content:
'❌ Você já possui um ticket aberto.',

                    ephemeral: true

                });

            }

            const canal = await interaction.guild.channels.create({

                name:
`ticket-${interaction.user.username}`,

                type: ChannelType.GuildText,

                parent: config.ticketCategory,

                topic: interaction.user.id,

                permissionOverwrites: [

                    {
                        id: interaction.guild.id,
                        deny: [
PermissionsBitField.Flags.ViewChannel
                        ]
                    },

                    {
                        id: interaction.user.id,
                        allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages
                        ]
                    },

                    {
                        id: config.supportRole,
                        allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages
                        ]
                    }

                ]

            });

            const embed = new EmbedBuilder()

                .setColor('#a855f7')

                .setTitle('🎫 Ticket Criado')

                .setDescription(`
Olá ${interaction.user}

Nossa equipe responderá em breve.

━━━━━━━━━━━━━━━━━━

👑 Sistema Premium  
⚡ Atendimento rápido  
🔒 Suporte seguro
                `);

            const buttons =
new ActionRowBuilder().addComponents(

                new ButtonBuilder()

                    .setCustomId('assumir_ticket')

                    .setLabel('Assumir')

                    .setEmoji('👑')

                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()

                    .setCustomId('fechar_ticket')

                    .setLabel('Fechar')

                    .setEmoji('🔒')

                    .setStyle(ButtonStyle.Danger)

            );

            await canal.send({

                content:
`${interaction.user}`,

                embeds: [embed],

                components: [buttons]

            });

            const logChannel =
interaction.guild.channels.cache.get(
config.logChannel
);

            if (logChannel) {

                logChannel.send({

                    content:
`✅ Ticket criado por ${interaction.user}`

                });

            }

            await interaction.reply({

                content:
`✅ Ticket criado: ${canal}`,

                ephemeral: true

            });

        }

    }

    // BOTÕES
    if (interaction.isButton()) {

        // ASSUMIR
        if (interaction.customId === 'assumir_ticket') {

            await interaction.reply({

                content:
`👑 Ticket assumido por ${interaction.user}`

            });

        }

        // FECHAR
        if (interaction.customId === 'fechar_ticket') {

            const attachment =
await discordTranscripts.createTranscript(
interaction.channel
);

            const logChannel =
interaction.guild.channels.cache.get(
config.logChannel
);

            if (logChannel) {

                await logChannel.send({

                    content:
`🔒 Ticket fechado por ${interaction.user}`,

                    files: [attachment]

                });

            }

            const estrelas =
new ActionRowBuilder().addComponents(

                new ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('⭐')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('2')
                    .setLabel('⭐⭐')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('3')
                    .setLabel('⭐⭐⭐')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('4')
                    .setLabel('⭐⭐⭐⭐')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('5')
                    .setLabel('⭐⭐⭐⭐⭐')
                    .setStyle(ButtonStyle.Success)

            );

            await interaction.reply({

                content:
'⭐ Avalie o atendimento:',

                components: [estrelas]

            });

            setTimeout(async () => {

                await interaction.channel.delete();

            }, 10000);

        }

        // AVALIAÇÃO
        if (
['1','2','3','4','5']
.includes(interaction.customId)
        ) {

            const logChannel =
interaction.guild.channels.cache.get(
config.logChannel
);

            if (logChannel) {

                await logChannel.send({

                    content:
`⭐ ${interaction.user} avaliou o atendimento com ${interaction.customId} estrelas.`

                });

            }

            await interaction.reply({

                content:
'✅ Avaliação enviada.',

                ephemeral: true

            });

        }

    }

});

client.login(process.env.TOKEN);
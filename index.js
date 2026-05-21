require('dotenv').config();

const fs = require('fs');

const {
    Client,
    GatewayIntentBits,
    Collection,
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const config = require('./config/config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands')
.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

client.once('ready', () => {

    console.log('BOT ONLINE');

});

client.on('interactionCreate', async interaction => {

    // COMANDOS

    if (interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {

            await command.execute(interaction);

        } catch (error) {

            console.error(error);

        }

    }

    // MENU

    if (interaction.isStringSelectMenu()) {

        if (interaction.customId === 'ticket_menu') {

            const existingChannel = interaction.guild.channels.cache.find(
                c => c.name === `ticket-${interaction.user.username}`
            );

            if (existingChannel) {

                return interaction.reply({
                    content: '❌ Você já possui um ticket aberto.',
                    ephemeral: true
                });

            }

            const canal = await interaction.guild.channels.create({

                name: `ticket-${interaction.user.username}`,

                type: ChannelType.GuildText,

                parent: config.ticketCategory,

                permissionOverwrites: [

                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
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

            .setTitle('🎫 Ticket Criado')

            .setDescription(
                `Olá ${interaction.user}, aguarde nossa equipe.`
            )

            .setColor('Blue');

            const fechar = new ButtonBuilder()

            .setCustomId('fechar_ticket')

            .setLabel('Fechar Ticket')

            .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()

            .addComponents(fechar);

            await canal.send({

                content: `<@&${config.supportRole}>`,

                embeds: [embed],

                components: [row]

            });

            await interaction.reply({

                content: `✅ Ticket criado: ${canal}`,

                ephemeral: true

            });

        }

    }

    // BOTÃO FECHAR

    if (interaction.isButton()) {

        if (interaction.customId === 'fechar_ticket') {

            await interaction.reply({

                content: '🔒 Fechando ticket em 5 segundos...',

                ephemeral: true

            });

            setTimeout(() => {

                interaction.channel.delete();

            }, 5000);

        }

    }

});

client.login(process.env.TOKEN);
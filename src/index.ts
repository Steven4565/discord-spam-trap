import {
  Client,
  Collection,
  Interaction,
  Events,
  GatewayIntentBits,
  PermissionsBitField,
} from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import path from 'node:path';
import config from './config/config';
import { Command } from './types';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = new Collection<string, Command>();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, (c: Client<true>) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.on(Events.MessageCreate, (message) => {
  if (!config.channelId) return console.log('trap channel has not been set');
  if (message.channelId != config.channelId) return;
  if (message.author.bot) return console.log('member is a bot');
  if (message.guild?.ownerId == message.author.id)
    return console.log('member is the owner');
  if (!message.member?.bannable) return console.log('member not bannable');
  try {
    message.member?.ban();
    // TODO: delete message
  } catch (error) {
    console.error();
  }
});

client.login(process.env.token);

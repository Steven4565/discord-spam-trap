import { Interaction, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import { Command } from './src/types';

dotenv.config();

const commandId = '1055745395990474832'; // CHANGE THIS TO DELETE

const commands: Command[] = [];
const commandFiles = fs
  .readdirSync('./src/commands/')
  .filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN ?? '');

(async () => {
  try {
    rest
      .delete(Routes.applicationCommand(process.env.CLIENT_ID ?? '', commandId))
      .then(() => console.log('Successfully deleted application command'))
      .catch(console.error);
  } catch (error) {
    console.error(error);
  }
})();

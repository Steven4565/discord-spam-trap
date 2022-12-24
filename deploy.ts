import { Interaction, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import { Command } from './src/types';

dotenv.config();

const commands: Command[] = [];
const commandFiles = fs
  .readdirSync('./src/commands/')
  .filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.token ?? '');

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data: any = await rest.put(
      Routes.applicationCommands(process.env.client_id ?? ''),

      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

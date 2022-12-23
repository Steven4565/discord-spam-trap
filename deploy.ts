import { Interaction, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import { Command } from './src/types';

dotenv.config();

const commands: Command[] = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
  .readdirSync('./src/commands/')
  .filter((file: string) => file.endsWith('.ts'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.token ?? '');

// and deploy your commands!
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

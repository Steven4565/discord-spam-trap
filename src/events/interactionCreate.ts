import { Events, Interaction } from 'discord.js';
import { DiscordClient } from '../DiscordClient';
import { EventObject } from '../types';

const interactionCreate: EventObject = {
  name: Events.InteractionCreate,
  execute: async (client: DiscordClient, interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
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
  },
};

module.exports = interactionCreate;

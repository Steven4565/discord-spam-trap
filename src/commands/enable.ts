import {
  SlashCommandBuilder,
  Interaction,
  SlashCommandBooleanOption,
} from 'discord.js';

import config from '../config/config';
import { replyEphemeral } from '../utils/commandHelpers';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enable')
    .setDescription('Enables or disables the bot')
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option.setName('on').setDescription('Sets the bot on or off')
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const option = interaction.options.getBoolean('on');
    if (option !== null) return (config.enabled = option);

    config.enabled = true;
    replyEphemeral(interaction, 'Watching trap channel');
  },
};

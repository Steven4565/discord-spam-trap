import {
  SlashCommandBuilder,
  Interaction,
  SlashCommandBooleanOption,
  PermissionFlagsBits,
} from 'discord.js';
import config from '../config/config';
import { replyEphemeral } from '../utils/commandHelpers';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enable')
    .setDescription('Enables or disables the bot')
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option.setName('on').setDescription('Sets the bot on or off')
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.ManageChannels
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const option = interaction.options.getBoolean('on');

    if (option! !== null && option == false) {
      config.enabled = false;
      return replyEphemeral(interaction, 'Stopped watching trap channel');
    }

    config.enabled = true;
    replyEphemeral(interaction, 'Watching trap channel');
  },
};

import {
  SlashCommandBuilder,
  Interaction,
  SlashCommandBooleanOption,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import { getGuildConfig, updateConfig } from '../config/config';
import { DiscordClient } from '../DiscordClient';
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
    )
    .setDMPermission(false),
  async execute(
    client: DiscordClient,
    interaction: ChatInputCommandInteraction
  ) {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.guildId)
      return replyEphemeral(interaction, 'Could not access guild id');
    const guildConfig = getGuildConfig(client.config, interaction.guildId);

    const option = interaction.options.getBoolean('on');

    if (option! !== null && option == false) {
      guildConfig.enabled = false;
      return replyEphemeral(interaction, 'Stopped watching trap channel');
    }

    guildConfig.enabled = true;
    replyEphemeral(interaction, 'Watching trap channel');
    updateConfig(client.config);
  },
};

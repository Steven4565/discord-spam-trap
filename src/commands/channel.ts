import {
  SlashCommandBuilder,
  Interaction,
  SlashCommandSubcommandBuilder,
  SlashCommandStringOption,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';

import { getGuildConfig, updateConfig } from '../config/config';
import { SubcommandObject } from '../types';
import { parseSubcommands, replyEphemeral } from '../utils/commandHelpers';
import { getChannel } from '../utils/apiHelper';
import { DiscordClient } from '../DiscordClient';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channel')
    .setDescription('Manages the trap channel')
    .addSubcommand((subCommand: SlashCommandSubcommandBuilder) =>
      subCommand
        .setName('set')
        .setDescription('Sets the trap channel')
        .addStringOption((option: SlashCommandStringOption) =>
          option
            .setName('id')
            .setDescription('Id of the trap channel')
            .setRequired(true)
        )
    )
    .addSubcommand((subCommand: SlashCommandSubcommandBuilder) =>
      subCommand
        .setName('get')
        .setDescription('Gets the current trap channel name')
    )
    .addSubcommand((subCommand: SlashCommandSubcommandBuilder) =>
      subCommand.setName('remove').setDescription('Removes the trap channel')
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

    const subcommands: SubcommandObject[] = [
      {
        name: 'set',
        execute(interaction) {
          const newChannelId = interaction.options.getString('id') ?? '';
          const newChannel = getChannel(newChannelId, interaction);
          if (!newChannel)
            return replyEphemeral(
              interaction,
              'Could not find any channel with that id'
            );

          guildConfig.channelId = newChannelId;
          updateConfig(client.config);
          replyEphemeral(
            interaction,
            'Successfully set channel to ' + newChannel.name
          );
        },
      },
      {
        name: 'remove',
        execute(interaction) {
          guildConfig.channelId = undefined;
          updateConfig(client.config);
          replyEphemeral(interaction, 'Removed channel');
        },
      },
      {
        name: 'get',
        execute(interaction) {
          if (!guildConfig.channelId)
            return replyEphemeral(
              interaction,
              'Channel id has not been set yet'
            );

          replyEphemeral(
            interaction,
            'Current trap channel is ' +
              getChannel(guildConfig.channelId, interaction)!.name
          );
        },
      },
    ];

    parseSubcommands(interaction, subcommands);
  },
};

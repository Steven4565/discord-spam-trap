import {
  SlashCommandBuilder,
  Interaction,
  SlashCommandSubcommandBuilder,
  SlashCommandStringOption,
  PermissionFlagsBits,
} from 'discord.js';

import config from '../config/config';
import { SubcommandObject } from '../types';
import { parseSubcommands, replyEphemeral } from '../utils/commandHelpers';
import { getChannel } from '../utils/getConfig';

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
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

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

          config.channelId = newChannelId;
          replyEphemeral(
            interaction,
            'Successfully set channel to ' + newChannel.name
          );
        },
      },
      {
        name: 'remove',
        execute(interaction) {
          config.channelId = undefined;
          replyEphemeral(interaction, 'Removed channel');
        },
      },
      {
        name: 'get',
        execute(interaction) {
          if (!config.channelId)
            return replyEphemeral(
              interaction,
              'Channel id has not been set yet'
            );

          replyEphemeral(
            interaction,
            'Current trap channel is ' +
              getChannel(config.channelId, interaction)!.name
          );
        },
      },
    ];

    parseSubcommands(interaction, subcommands);
  },
};

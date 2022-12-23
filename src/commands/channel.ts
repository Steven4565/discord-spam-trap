import {
  SlashCommandBuilder,
  Interaction,
  SlashCommandSubcommandBuilder,
  SlashCommandStringOption,
  GuildBasedChannel,
} from 'discord.js';

import config from '../config/config';

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
      subCommand.setName('remove').setDescription('Removes the trap channel')
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    if (interaction.options.getSubcommand() === 'set') {
      const newChannelId = interaction.guild?.channels.cache
        .map((channel: GuildBasedChannel) => channel.id)
        .find((id: string) => id == interaction.options.getString('id'));

      if (!newChannelId) return;

      const channelName =
        interaction.guild?.channels.cache.get(newChannelId)?.name;

      if (!newChannelId)
        interaction.reply('Could not find any channel with that id');

      config.channelId = newChannelId;
      interaction.reply('Successfully set channel to ' + channelName);
    } else if (interaction.options.getSubcommand() == 'remove') {
      config.channelId = undefined;
      interaction.reply('Removed channel');
    }
  },
};

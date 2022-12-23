import { Interaction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: Interaction): void;
}

export interface Config {
  channelId: undefined | string;
  enabled: boolean;
  excluded: number[];
}

import {
  ChatInputCommandInteraction,
  Events,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js';
import { DiscordClient } from './DiscordClient';

export interface Command {
  data: SlashCommandBuilder;
  execute(
    client: DiscordClient,
    interaction: ChatInputCommandInteraction
  ): void;
}

export interface GuildConfig {
  channelId: undefined | string;
  enabled: boolean;
  excluded: number[];
}

export type GuildListConfig = Record<string, GuildConfig>;

export interface EventObject {
  name: Events;
  execute(client: DiscordClient, ...args: any[]): void;
}

export interface SubcommandObject {
  name: string;
  execute(interaction: ChatInputCommandInteraction): void;
}

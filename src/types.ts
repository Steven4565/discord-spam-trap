import {
  ChatInputCommandInteraction,
  Events,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js';
import { DiscordClient } from './DiscordClient';

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: Interaction): void;
}

export interface Config {
  channelId: undefined | string;
  enabled: boolean;
  excluded: number[];
}

export interface EventObject {
  name: Events;
  execute(client: DiscordClient, ...args: any[]): void;
}

export interface SubcommandObject {
  name: string;
  execute(interaction: ChatInputCommandInteraction): void;
}

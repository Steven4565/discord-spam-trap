import {
  ChatInputCommandInteraction,
  Interaction,
  InteractionResponse,
} from 'discord.js';
import { SubcommandObject } from '../types';

export async function replyEphemeral(
  interaction: ChatInputCommandInteraction,
  content: string
): Promise<InteractionResponse<boolean>> {
  return interaction.reply({
    content: content,
    ephemeral: true,
  });
}

export function parseSubcommands(
  interaction: ChatInputCommandInteraction,
  subcommands: SubcommandObject[]
) {
  const choice = interaction.options.getSubcommand();
  for (const subcmd of subcommands) {
    if (choice == subcmd.name) {
      subcmd.execute(interaction);
      break;
    }
  }
}

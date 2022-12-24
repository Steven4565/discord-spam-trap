import {
  ChatInputCommandInteraction,
  Interaction,
  InteractionResponse,
} from 'discord.js';

export async function replyEphemeral(
  interaction: ChatInputCommandInteraction,
  content: string
): Promise<InteractionResponse<boolean>> {
  return interaction.reply({
    content: content,
    ephemeral: true,
  });
}

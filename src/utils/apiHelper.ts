import { GuildBasedChannel, Interaction } from 'discord.js';

export function getChannel(
  channelId: string,
  interaction: Interaction
): GuildBasedChannel | undefined {
  if (!channelId) return undefined;

  const channel = interaction.guild?.channels.cache.get(channelId);
  return channel;
}

import { Events, Message } from "discord.js";
import { getGuildConfig } from "../config/config";
import { DiscordClient } from "../DiscordClient";
import { EventObject } from "../types";

const messageCreate: EventObject = {
  name: Events.MessageCreate,
  execute: async (client: DiscordClient, message: Message) => {
    if (!message.guildId)
      return console.log("Could not access guild id from message object");
    const guildConfig = getGuildConfig(client.config, message.guildId);

    if (!guildConfig.enabled) return;
    if (!guildConfig.channelId)
      return console.log("trap channel has not been set");
    if (message.channelId != guildConfig.channelId) return;
    if (message.author.bot) return console.log("member is a bot");
    if (message.guild?.ownerId == message.author.id)
      return console.log("member is the owner");
    if (!message.member?.bannable)
      return console.log("member not bannable");
    try {
      message.member?.ban({
        deleteMessageSeconds: 3600,
        reason: "AutoBan breached/compromised account.",
      });
    } catch (error) {
      console.error();
    }
  },
};

module.exports = messageCreate;

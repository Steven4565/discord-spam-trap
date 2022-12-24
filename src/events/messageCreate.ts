import { Events, Message } from 'discord.js';
import config from '../config/config';
import { DiscordClient } from '../DiscordClient';
import { EventObject } from '../types';

const messageCreate: EventObject = {
  name: Events.MessageCreate,
  execute: (client: DiscordClient, message: Message) => {
    if (!config.enabled) return;
    if (!config.channelId) return console.log('trap channel has not been set');
    if (message.channelId != config.channelId) return;
    if (message.author.bot) return console.log('member is a bot');
    if (message.guild?.ownerId == message.author.id)
      return console.log('member is the owner');
    if (!message.member?.bannable) return console.log('member not bannable');
    try {
      message.member?.ban();
    } catch (error) {
      console.error();
    }
  },
};

module.exports = messageCreate;

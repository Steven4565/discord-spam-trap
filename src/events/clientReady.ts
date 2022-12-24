import { Events, Client } from 'discord.js';
import { DiscordClient } from '../DiscordClient';
import { EventObject } from '../types';

const clientReady: EventObject = {
  name: Events.ClientReady,
  execute: (c: DiscordClient) => {
    console.log(`Ready! Logged in as ${c.user?.tag}`);
  },
};

module.exports = clientReady;

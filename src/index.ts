import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import { DiscordClient } from './DiscordClient';

const client = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

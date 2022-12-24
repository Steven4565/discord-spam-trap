import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './types';
import fs from 'node:fs';
import path from 'node:path';

export class DiscordClient extends Client {
  public commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection<string, Command>();
    this.login(process.env.token);
    this.loadCommands();
    this.loadEvents();
  }

  private loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ('data' in command && 'execute' in command) {
        this.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  private loadEvents() {
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith('.ts'));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        this.once(event.name, (...args) => event.execute(this, ...args));
      } else {
        this.on(event.name, (...args) => event.execute(this, ...args));
      }
    }
  }
}

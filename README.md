# Discord Spam Trap Bot

Watches a channel for any messages, bans the author of the message
Used for trapping compromised discord accounts which spams @everyone at every channel

## Deployment

1. Create a `.env` file with the template from `.example.env`
2. Run `npm i` to install all dependencies
3. Register the slash commands to discord by running `npm run script:deploy` after inviting your discord bot to the server
4. Run `npm start` to run the bot

## Docker Deployment

1. Create a `.env` file with the template from `.example.env`
2. Run `docker compose up -d`

## Usage

- Set the trap channel by running `/channel set [channelId]`
- Use `/channel get` to see the current set channel
- Toggle bot by using the `/channel enable [true|false]` command

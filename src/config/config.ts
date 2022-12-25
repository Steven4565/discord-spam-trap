import { GuildConfig, GuildListConfig } from "../types";
import fs from "fs";
import yaml from "js-yaml";

const configPath = "config.yaml";

export function loadConfig() {
  let config: GuildListConfig = {} as GuildListConfig;

  try {
    try {
      fs.writeFileSync(configPath, "", { flag: "wx" });
    } catch (e) {}

    config = (yaml.load(fs.readFileSync(configPath, "utf8")) ??
      config) as GuildListConfig;
  } catch (e) {
    console.log(e);
  }
  return config;
}

export function updateConfig(config: GuildListConfig) {
  try {
    const configYaml = yaml.dump(config);
    fs.writeFileSync(configPath, configYaml);
  } catch (e) {
    console.log(e);
  }
}

export function getGuildConfig(
  config: GuildListConfig,
  guildId: string
): GuildConfig {
  if (!config || !config[guildId]) {
    const newConfig = newGuildConfig();

    config[guildId] = newConfig;
    return newConfig;
  }
  return config[guildId] as GuildConfig;
}

export function newGuildConfig(): GuildConfig {
  return {
    channelId: undefined,
    enabled: true,
    excluded: [],
  };
}

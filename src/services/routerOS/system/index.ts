import { RouterOSClient } from "routeros-client";
import * as Models from "../../../models";

import { SupportedCommands } from "../../../interfaces/routerOS";
import { deleteUnsafeKey } from "../routerOS.service";

const baseCommand = "system";

const commands = Object.keys(SupportedCommands).map(
  key => key as keyof typeof SupportedCommands
);

const saveMany = async (
  command: keyof typeof SupportedCommands,
  data: any[]
) => {
  const model = Models[SupportedCommands[command]];
  if (SupportedCommands[command] in Models) {
    return await model.collection.insertMany(data);
  }
  return data;
};

const modelByCommand = (command: keyof typeof SupportedCommands) => {
  return Models[SupportedCommands[command]];
};

const retrieveMany = async (n = 3) => {
  const requests = commands.map(async command => {
    const model = modelByCommand(command);
    const results = await model.find({}).limit(n);
    return results;
  });
  const response = await Promise.all(requests);
  return response;
};

const requestCommand = async (
  parameter: keyof typeof SupportedCommands,
  api: RouterOSClient
) => {
  const command = `/${baseCommand}/${parameter}`;

  try {
    const client = await api.connect();
    const data: any[] = await client.menu(command).get();
    const sanitisedData = data.map(deleteUnsafeKey);
    await saveMany(parameter, sanitisedData);
    await api.close();
    return sanitisedData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const requestAll = async (api: RouterOSClient) => {
  let response: any[] = [];

  for (const command of commands) {
    const result = await requestCommand(command, api);
    response = [...response, ...result];
  }

  return response;
};

export const System = {
  retrieveMany,
  modelByCommand,
  requestCommand,
  requestAll,
  SupportedCommands
};

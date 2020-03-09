import { RouterOSClient, IRosOptions } from "routeros-client";
import { System } from "./system";
import { streamTool } from "./stream";

export const deleteUnsafeKey = (item: any): any => {
  if (Array.isArray(item)) {
    return item.map(deleteUnsafeKey);
  }

  if (item && item.$$path) {
    item.path = item.$$path;
    delete item.$$path;
  }

  return item;
};

class RouterOSService {
  public api: RouterOSClient;

  constructor(options: IRosOptions) {
    this.api = new RouterOSClient(options);
  }

  // Public convenience methods
  // Not all paths are supported
  public system = {
    all: async () => await System.requestAll(this.api),
    identity: async () => await System.requestCommand("identity", this.api),
    resource: async () => await System.requestCommand("resource", this.api),
    hardware: async () => await System.requestCommand("hardware", this.api),
    package: async () => await System.requestCommand("package", this.api),
    clock: async () => await System.requestCommand("clock", this.api),
    note: async () => await System.requestCommand("note", this.api)
  };

  public stream = {
    tool: (command: string, address: string, timerMode = false, n?: number) =>
      streamTool(this.api, command, address, timerMode, n)
  };
}

export default RouterOSService;

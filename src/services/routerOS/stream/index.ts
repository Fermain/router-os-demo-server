import { RouterOSClient, RStream } from "routeros-client";
import { BandwidthTestModel } from "../../../models/routerOS";
import { BandwidthTest } from "../../../interfaces";
import { deleteUnsafeKey } from "../routerOS.service";

const saveTest = async (bandwidthTest: BandwidthTest) => {
  try {
    return await new BandwidthTestModel(bandwidthTest).save();
  } catch {
    return new BandwidthTestModel();
  }
};

const getRstream = async (
  api: RouterOSClient,
  command: string,
  params: object,
  callback: Function
) => {
  const client = await api.connect();
  const data = client.menu(command);
  return data.where({ ...params }).stream(callback);
};

const streamForN = async (
  api: RouterOSClient,
  command: string,
  params: object,
  timerMode = false,
  n = 100
) => {
  n = Number(n);
  let count = 0;
  let results: any[] = [];

  if (timerMode) {
    n = 60;
  }

  const chunkHandler = (error: any, chunk: any[], rStream: RStream) => {
    if (timerMode && count === 0) {
      n = parseInt(chunk[0].timeRemaining || chunk[0]["time-remaining"]);
    }
    if (count > n || error) {
      return;
    }
    count += 1;
    const timestamp = Date.now().toString();
    results = [...results, ...deleteUnsafeKey(chunk)];

    if (count === n) {
      rStream.emit("done");
      rStream.stop();
      rStream.removeAllListeners();
      api.close().then();
      saveTest({
        command,
        params,
        results,
        timestamp
      } as BandwidthTest);
    }

    return;
  };

  return await getRstream(api, command, { ...params }, chunkHandler);
};

export const streamTool = async (
  api: RouterOSClient,
  command: string,
  address: string,
  timerMode = false,
  n?: number
) => {
  return streamForN(api, `/tool ${command}`, { address }, timerMode, n);
};

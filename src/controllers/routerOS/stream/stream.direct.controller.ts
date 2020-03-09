import express, { Request, Response } from "express";
import { ControllerBase } from "../../../interfaces";
import RouterOSService from "../../../services/routerOS/routerOS.service";
import { BandwidthPacket } from "../.././../common/routerOS/";
import { validationResult, query } from "express-validator";

export class StreamDirectController implements ControllerBase {
  public router = express.Router();
  public scope = "direct";

  constructor(private device: RouterOSService) {
    this.initRoutes();
  }

  private getStream = async (request: Request, response: Response) => {
    try {
      validationResult(request).throw();

      response.chunkedEncoding = true;
      const timerMode = request.query.command === "speed-test";
      const stream = await this.device.stream.tool(
        request.query.command,
        request.query.address,
        timerMode,
        request.query.n
      );

      response.write("[");

      stream.on("data", (chunk: BandwidthPacket) => {
        const chunkString = `${JSON.stringify(chunk)},`;
        response.write(chunkString);
      });

      stream.on("done", () => {
        response.write("{}]");
        response.status(200).send();
      });
    } catch (error) {
      if (error.response) {
        response.status(422).send(error.response);
      } else {
        response.status(500).send(error);
      }
    }
  };

  public initRoutes() {
    this.router.get(
      "/tool",
      [
        query("address")
          .isIP()
          .withMessage(`Property: 'address' must be a valid IP.`)
      ],
      this.getStream
    );
  }
}

import express, { Request, Response } from "express";
import { ControllerBase, BandwidthTest } from "../../../interfaces";
import { validationResult, query } from "express-validator";
import { BandwidthTestModel } from "../../../models/routerOS";
import { StreamDirectController } from "./stream.direct.controller";
import RouterOSService from "../../../services/routerOS/routerOS.service";

export class StreamController implements ControllerBase {
  public router = express.Router();
  public scope = "stream";

  constructor(private device: RouterOSService) {
    this.router.use("/direct", new StreamDirectController(this.device).router);
    this.initRoutes();
  }

  private async getTestFromDB(request: Request, response: Response) {
    try {
      validationResult(request).throw();

      const command = `/tool ${request.query.command}`;
      const address = request.query.address;
      const conditions = {
        command: { $eq: command },
        "params.address": { $eq: address }
      };
      const test: BandwidthTest | null = await BandwidthTestModel.findOne(
        conditions
      ).sort("-timestamp");
      if (test) {
        response.status(200).send(test.results);
      } else {
        response.status(200).send([]);
      }
    } catch (error) {
      response.status(422).send(error);
    }
  }

  public initRoutes() {
    this.router.get(
      "/tool",
      [
        query("address")
          .isIP()
          .withMessage(`Property: 'address' must be a valid IP.`)
      ],
      this.getTestFromDB
    );
  }
}

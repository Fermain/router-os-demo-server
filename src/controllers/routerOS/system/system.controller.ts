import express, { Request, Response } from "express";
import {
  SystemIdentity,
  SystemNote,
  SystemResource,
  SystemHardware,
  SystemPackage,
  SystemClock
} from "../../../interfaces/routerOS";
import {
  SystemIdentityModel,
  SystemNoteModel,
  SystemResourceModel,
  SystemHardwareModel,
  SystemPackageModel,
  SystemClockModel
} from "../../../models/routerOS/system";
import { SystemDirectController } from "./system.direct.controller";
import { ControllerBase } from "../../../interfaces";
import { System } from "../../../services/routerOS/system";
import RouterOSService from "../../../services/routerOS/routerOS.service";

export class SystemController implements ControllerBase {
  public router = express.Router();
  public scope = "system";
  public n = 3;

  constructor(private device: RouterOSService) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.use("/direct", new SystemDirectController(this.device).router);

    this.router.get("/", async (request: Request, response: Response) => {
      try {
        const results = await System.retrieveMany(request.query.n || this.n);
        response.status(200).send(results);
      } catch (error) {
        response.status(404).send(error);
      }
    });

    this.router.get(
      "/identity",
      async (request: Request, response: Response) => {
        try {
          const result: SystemIdentity[] = await SystemIdentityModel.find().limit(
            request.query.n || this.n
          );
          response.status(200).send(result);
        } catch (error) {
          response.status(404).send(error);
        }
      }
    );

    this.router.get(
      "/resource",
      async (request: Request, response: Response) => {
        try {
          const result: SystemResource[] = await SystemResourceModel.find().limit(
            request.query.n || this.n
          );
          response.status(200).send(result);
        } catch (error) {
          response.status(404).send(error);
        }
      }
    );

    this.router.get(
      "/hardware",
      async (request: Request, response: Response) => {
        try {
          const result: SystemHardware[] = await SystemHardwareModel.find().limit(
            request.query.n || this.n
          );
          response.status(200).send(result);
        } catch (error) {
          response.status(404).send(error);
        }
      }
    );

    this.router.get(
      "/package",
      async (request: Request, response: Response) => {
        try {
          const result: SystemPackage[] = await SystemPackageModel.find().limit(
            request.query.n || this.n
          );
          response.status(200).send(result);
        } catch (error) {
          response.status(404).send(error);
        }
      }
    );

    this.router.get("/clock", async (request: Request, response: Response) => {
      try {
        const result: SystemClock[] = await SystemClockModel.find().limit(
          request.query.n || this.n
        );
        response.status(200).send(result);
      } catch (error) {
        response.status(404).send(error);
      }
    });

    this.router.get("/note", async (request: Request, response: Response) => {
      try {
        const result: SystemNote[] = await SystemNoteModel.find().limit(
          request.query.n || this.n
        );
        response.status(200).send(result);
      } catch (error) {
        response.status(404).send(error);
      }
    });
  }
}

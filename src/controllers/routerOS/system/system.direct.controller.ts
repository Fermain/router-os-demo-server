import express, { Request, Response } from "express";
import { SystemIdentity } from "../../../interfaces/routerOS";
import { ControllerBase } from "../../../interfaces";
import RouterOSService from "../../../services/routerOS/routerOS.service";

export class SystemDirectController implements ControllerBase {
  public router = express.Router();
  public scope = "direct";

  constructor(private device: RouterOSService) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", async (_req: Request, res: Response) => {
      try {
        const result = await this.device.system.all();
        res.status(200).send(result);
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    this.router.get("/identity", async (_req: Request, res: Response) => {
      try {
        const result: SystemIdentity[] = await this.device.system.identity();
        res.status(200).send(result);
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    this.router.get("/resource", async (_req: Request, res: Response) => {
      try {
        const result = await this.device.system.resource();
        res.status(200).send(result);
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    this.router.get("/hardware", async (_req: Request, res: Response) => {
      try {
        const result = await this.device.system.hardware();
        res.status(200).send(result);
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    this.router.get("/package", async (_req: Request, res: Response) => {
      try {
        const result = await this.device.system.package();
        res.status(200).send(result);
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    this.router.get("/clock", async (_req: Request, res: Response) => {
      try {
        const result = await this.device.system.clock();
        res.status(200).send(result);
      } catch (e) {
        res.status(404).send(e.message);
      }
    });

    // this.router.get('/history', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.history();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    // this.router.get('/license', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.license();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    // this.router.get('/routerboard', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.routerboard();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    // this.router.get('/routerboard', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.routerboard();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    // this.router.get('/upgrade', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.upgrade();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    // this.router.get('/health', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.health();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    // this.router.get('/leds', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.leds();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    // this.router.get('/logging', async (_req: Request, res: Response) => {
    //     try {
    //         const result = await this.device.system.logging();
    //         res.status(200).send(result);
    //     } catch (e) {
    //         res.status(404).send(e.message);
    //     }
    // });

    this.router.get("/note", async (_req: Request, res: Response) => {
      try {
        const result = await this.device.system.note();
        res.status(200).send(result);
      } catch (e) {
        res.status(404).send(e.message);
      }
    });
  }
}

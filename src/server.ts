import cors from "cors";
import * as bodyParser from "body-parser";
import express, { Application } from "express";
import { setupDb } from "./db";
import { SystemController, StreamController } from "./controllers/routerOS";

import dotenv from "dotenv";
import RouterOSService from "./services/routerOS/routerOS.service";
import { IRosOptions } from "routeros-client";

dotenv.config();

const setupControllers = (
  server: Application,
  routerOSService: RouterOSService
) => {
  const systemController = new SystemController(routerOSService);

  const streamController = new StreamController(routerOSService);

  server.use(`/${systemController.scope}`, systemController.router);

  server.use(`/${streamController.scope}`, streamController.router);
};

const setupTasks = async () => {
  try {
    await setupDb(process.env.MONGODB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.MONGODB_OPTIONS_USER,
      pass: process.env.MONGODB_OPTIONS_PASS
    });
  } catch (error) {
    console.error(error);
  }

  const routerOSService = new RouterOSService({
    host: process.env.ROUTEROS_HOST,
    user: process.env.ROUTEROS_USER,
    password: process.env.ROUTEROS_PASSWORD
  } as IRosOptions);

  const server = express();

  server.use(cors());

  server.use(bodyParser.json());

  server.use(bodyParser.urlencoded({ extended: true }));

  server.listen(process.env.PORT);

  setupControllers(server, routerOSService);

  return `App setup and listening on Port:${process.env.PORT}`;
};

setupTasks().then(console.log);

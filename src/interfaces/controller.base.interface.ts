import { Router } from "express";

export interface ControllerBase {
  initRoutes(): any;
  router: Router;
  scope: string;
}

import { Router } from "express";
import { Container } from "inversify";
import { ILoadInteractor } from "../interfaces/load/ILoadInteractor";
import { INTERFACE_TYPE } from "../utils";
import { LoadInteractor } from "../interactors/loadInteractor";
import { LoadController } from "../controllers/loadController";
import { LoadRepository } from "../repositories/loadRepository";

const container = new Container()
const loadRouter = Router();


container.bind<ILoadInteractor>(INTERFACE_TYPE.LoadInteractor).to(LoadInteractor);
container.bind(INTERFACE_TYPE.LoadController).to(LoadController);
container.bind(INTERFACE_TYPE.LoadRepository).to(LoadRepository);

const controller = container.get<LoadController>(INTERFACE_TYPE.LoadController);

loadRouter.post("/createLoad", controller.OnCreateLoad.bind(controller));
loadRouter.get("/getAllLoads/:page/:pageSize", controller.OnGetAllLoads.bind(controller));
export default loadRouter;
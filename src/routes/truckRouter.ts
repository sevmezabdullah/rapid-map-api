import { Router } from "express";
import { Container } from "inversify";
import { ITruckInteractor } from "../interfaces/truck/ITruckInteractor";
import { INTERFACE_TYPE } from "../utils";
import { TruckInteractor } from "../interactors/truckInteractor";
import { TruckController } from "../controllers/truckController";
import { TruckRepository } from "../repositories/truckRepository";


const container = new Container()

const truckRouter = Router();

container.bind<ITruckInteractor>(INTERFACE_TYPE.TruckInteractor).to(TruckInteractor);

container.bind(INTERFACE_TYPE.TruckController).to(TruckController);
container.bind(INTERFACE_TYPE.TruckRepository).to(TruckRepository);

const controller = container.get<TruckController>(INTERFACE_TYPE.TruckController);



truckRouter.post('/create', controller.onCreateTruck.bind(controller));
truckRouter.get('/getAll', controller.onGetAll.bind(controller));

export default truckRouter;
import { inject, injectable } from "inversify";
import { ITruckInteractor } from "../interfaces/truck/ITruckInteractor";
import { INTERFACE_TYPE } from "../utils";
import { NextFunction, Request, Response } from "express";

@injectable()
export class TruckController {
    private interactor: ITruckInteractor;
    constructor(@inject(INTERFACE_TYPE.TruckInteractor) interactor: ITruckInteractor) {
        this.interactor = interactor;
    }

    async onCreateTruck(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = await this.interactor.createTruck({ plate: body.plate, type: body.type });
            return res.status(200).json({ message: result });
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(400).json({ message: "Truck already exists" });
            } else {
                return res.status(500).json({ message: error });
            }

        }
    }

    async onGetAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.interactor.getAllTrucks();
            res.status(200).json({ message: result });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }

    async onUpdateTruckDriver(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = await this.interactor.updateTruckDriver(body.truckId, body.newDriverId);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async onUpdateTruckLocation(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = await this.interactor.updateTruckLocationByDriverId(body.driverId, body.longitude, body.latitude);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async getTruckByPlate(req: Request, res: Response, next: NextFunction) {
        try {
            const plate = req.params.plate;
            const result = await this.interactor.getTruckByPlate(plate);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }
    async getTruckById(req: Request, res: Response, next: NextFunction) {
        try {
            const truckId = req.params.truckId;
            const result = await this.interactor.getTruckById(truckId);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }
    async onUpdateTruckStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = await this.interactor.updateTruckStatus(body.truckId, body.newStatus);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async onUpdateTruckLoadNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = await this.interactor.updateTruckLoadNumber(body.truckId, body.newLoadNumber);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }
    async onGetTrucksByPage(req: Request, res: Response, next: NextFunction) {
        try {
            const page = req.params.page;
            const pageSize = req.params.pageSize;
            const result = await this.interactor.getTrucksPaged(Number(page), Number(pageSize));
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async onGetTrucksCount(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.interactor.getTrucksCount();
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }
}
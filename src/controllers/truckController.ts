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
}
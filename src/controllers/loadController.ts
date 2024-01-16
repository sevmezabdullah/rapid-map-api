import { inject, injectable } from "inversify";
import { ILoadInteractor } from "../interfaces/load/ILoadInteractor";
import { INTERFACE_TYPE } from "../utils";
import { Request, Response } from "express";
@injectable()
export class LoadController {
    private interactor: ILoadInteractor;
    constructor(@inject(INTERFACE_TYPE.LoadInteractor) interactor: ILoadInteractor) {
        this.interactor = interactor;
    }

    async OnCreateLoad(req: Request, res: Response) {
        try {

            const body = req.body;
            const result = await this.interactor.createLoad({ loadNumber: body.loadNumber, customerId: body.customerId, loadType: body.loadType, weight: body.weight, loadAddress: body.loadAddress, unloadAddress: body.unloadAddress });
            return res.status(200).json({ message: result });
        } catch (error) {

            return res.status(400).json({ message: error });

        }
    }
}
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

    async OnGetAllLoads(req: Request, res: Response) {
        try {
            const page = parseInt(req.params.page as string);
            const pageSize = parseInt(req.params.pageSize as string);
            const result = await this.interactor.getLoadsPaginated(page, pageSize);
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    async OnGetLoadsCount(req: Request, res: Response) {
        try {
            const result = await this.interactor.getLoadsCount();
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
    async OnGetLoadByLoadNumber(req: Request, res: Response) {
        try {
            const loadNumber = req.params.loadNumber as string;
            const result = await this.interactor.getLoadByLoadNumber(loadNumber);
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
}
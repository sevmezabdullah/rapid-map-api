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
            const loadAddress = (body.loadAddress as string).toLowerCase();
            const unloadAddress = (body.unloadAddress as string).toLowerCase();
            console.log(loadAddress, unloadAddress)
            const result = await this.interactor.createLoad({ loadNumber: body.loadNumber, customerId: body.customerId, loadType: body.loadType, weight: body.weight, loadAddress: loadAddress, unloadAddress: unloadAddress });
            return res.status(200).json({ message: result });
        } catch (error) {

            return res.status(400).json({ message: error });

        }
    }

    async OnGetAllLoads(req: Request, res: Response) {
        try {
            const page = parseInt(req.params.page as string);
            const pageSize = parseInt(req.params.pageSize as string);
            const loadNumber = req.query.loadNumber as string;
            const loadType = req.query.loadType as string;
            const weight = req.query.weight as string;
            const loadAddress = req.query.loadAddress as string;
            const unloadAddress = req.query.unloadAddress as string;

            console.log(unloadAddress)
            const result = await this.interactor.getLoadsPaginated(page, pageSize, loadNumber, loadType, weight, loadAddress, unloadAddress);
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
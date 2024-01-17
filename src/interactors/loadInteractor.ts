import { inject, injectable } from "inversify";
import { Load } from "../entities/Load";
import { ILoadInteractor } from "../interfaces/load/ILoadInteractor";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class LoadInteractor implements ILoadInteractor {

    private repository: ILoadInteractor;
    constructor(@inject(INTERFACE_TYPE.LoadRepository) repository: ILoadInteractor) {
        this.repository = repository;
    }
    async getLoadsCount(): Promise<number> {
        const count = await this.repository.getLoadsCount();
        return count;
    }
    async getLoadsPaginated(page: number, pageSize: number, loadNumber: string, loadType: string, weight: string, loadAddress: string, unloadAddress: string): Promise<Load[]> {
        const result = await this.repository.getLoadsPaginated(page, pageSize
            , loadNumber, loadType, weight, loadAddress, unloadAddress);
        if (result) {
            return result;
        } else {
            return []
        }
    }
    async createLoad(load: Load): Promise<string> {
        const result = await this.repository.createLoad(load);
        if (result) return "Yük oluşturuldu";
        else throw new Error("Yük oluşturulamadı");
    }

    getLoadById(id: string): Promise<Load> {
        throw new Error("Method not implemented.");
    }
    deleteLoad(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getLoadByCustomerId(id: string): Promise<Load[]> {
        throw new Error("Method not implemented.");
    }
    async getLoadByLoadNumber(loadNumber: string): Promise<Load[]> {
        const result = await this.repository.getLoadByLoadNumber(loadNumber);
        if (result) return result;
        else return [];
    }
    getLoadByLoadType(loadType: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getLoadByWeight(weight: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getLoadByLoadAddress(loadAddress: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getLoadByUnloadAddress(unloadAddress: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateLoad(id: string, load: Load): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
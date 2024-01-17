import { Load } from "../../entities/Load";

export interface ILoadInteractor {

    createLoad(load: Load): Promise<string>;
    getLoadsPaginated(page: number, pageSize: number, loadNumber: string, loadType: string, weight: string, loadAddress: string, unloadAddress: string, name: string): Promise<Load[]>;
    getLoadsCount(): Promise<number>;
    getLoadById(id: string): Promise<Load>;
    deleteLoad(id: string): Promise<string>;
    getLoadByCustomerId(id: string): Promise<Load[]>;
    getLoadByLoadNumber(loadNumber: string): Promise<Load[]>;
    getLoadByLoadType(loadType: string): Promise<any>;
    getLoadByWeight(weight: number): Promise<any>;
    getLoadByLoadAddress(loadAddress: string): Promise<any>;
    getLoadByUnloadAddress(unloadAddress: string): Promise<any>;
    updateLoad(id: string, load: Load): Promise<string>;
}
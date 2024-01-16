import { Load } from "../../entities/Load";

export interface ILoadInteractor {

    createLoad(load: Load): Promise<string>;
    getLoads(): Promise<Load[]>;
    getLoadById(id: string): Promise<Load>;
    deleteLoad(id: string): Promise<string>;
    getLoadByCustomerId(id: string): Promise<Load[]>;
    getLoadByLoadNumber(loadNumber: string): Promise<any>;
    getLoadByLoadType(loadType: string): Promise<any>;
    getLoadByWeight(weight: number): Promise<any>;
    getLoadByLoadAddress(loadAddress: string): Promise<any>;
    getLoadByUnloadAddress(unloadAddress: string): Promise<any>;
    updateLoad(id: string, load: Load): Promise<string>;
}
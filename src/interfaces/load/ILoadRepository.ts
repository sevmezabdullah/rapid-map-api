import { Load } from "../../entities/Load";

export interface ILoadRepository {

    createLoad(load: Load): Promise<string>;
    getLoadsPaginated(page: number, pageSize: number): Promise<Load[]>;
    getLoadsCount(): Promise<number>;
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
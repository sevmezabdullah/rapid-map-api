import { injectable } from "inversify";
import { Load } from "../entities/Load";
import { ILoadRepository } from "../interfaces/load/ILoadRepository";
import LoadModel from "../models/Load";

@injectable()
export class LoadRepository implements ILoadRepository {
    async getLoadsCount(): Promise<number> {
        const count = await LoadModel.countDocuments();
        return count;
    }
    // Get all loads paginated
    async getLoadsPaginated(page: number, pageSize: number, loadNumber: string, loadType: string, weight: number, loadAddress: string, unloadAddress: string): Promise<Load[]> {

        let conditions: any = {};

        const queryParameters: any = { loadAddress, loadNumber, loadType, unloadAddress, weight };
        for (const key in queryParameters) {
            if (queryParameters[key]) {
                conditions[key] = queryParameters[key];
            }
        }
        const result = await LoadModel.find(conditions).skip((page - 1) * pageSize).limit(pageSize).sort({ createdAt: -1 }).populate('customerId');
        if (result) {
            return result;
        } else {
            return []
        }
    }
    async createLoad(load: Load): Promise<string> {
        const newLoad = new LoadModel(load);
        const result = await newLoad.save();
        if (result._id) {
            return "Yük oluşturuldu";
        } else {
            throw new Error("Yük oluşturulamadı");
        }
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
        const result = await LoadModel.find({ loadNumber: loadNumber }).populate('customerId').sort({ createdAt: -1 });
        if (result) {
            return result;
        } else {
            return []
        }
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
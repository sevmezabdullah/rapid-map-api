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
    async getLoadsPaginated(page: number, pageSize: number): Promise<Load[]> {
        const result = await LoadModel.find().skip((page - 1) * pageSize).limit(pageSize).sort({ createdAt: -1 }).populate('ownerId');
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
    getLoadByLoadNumber(loadNumber: string): Promise<any> {
        throw new Error("Method not implemented.");
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
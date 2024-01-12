import { Truck } from "../entities/Truck";
import TruckModel from "../models/Truck";
import { ITruckRepository } from "../interfaces/truck/ITruckRepository";
import { injectable } from "inversify";

@injectable()
export class TruckRepository implements ITruckRepository {

    async createTruck(truck: Truck): Promise<string> {
        const newTruck = new TruckModel(truck);
        const saveResult = await newTruck.save();
        if (saveResult) return "Truck created";
        else
            throw new Error("Truck not created");
    }
    updateTruck(truckId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    updateTruckStatus(truckId: string, newStatus: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async updateTruckDriver(truckId: string, newDriverId: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { driverId: newDriverId }, { new: true });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    updateTruckLoadNumber(truckId: string, newLoadNumber: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    updateTruckType(truckId: string, newType: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    deleteTruck(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getTruckById(truckId: string): Promise<Truck> {
        throw new Error("Method not implemented.");
    }
    getTruckByPlate(): Promise<Truck> {
        throw new Error("Method not implemented.");
    }
    async getAllTrucks(): Promise<Truck[]> {
        const trucks = await TruckModel.find().select('plate type status _id');
        return trucks;


    }
    getTrucksByStatus(status: string): Promise<Truck[]> {
        throw new Error("Method not implemented.");
    }
    getTrucksByType(type: string): Promise<Truck[]> {
        throw new Error("Method not implemented.");
    }
    getTrucksByLoadNumber(loadNumber: string): Promise<Truck> {
        throw new Error("Method not implemented.");
    }
    getTrucksByLocation(): Promise<Truck> {
        throw new Error("Method not implemented.");
    }
    async getTrucksByDriverId(driverId: string): Promise<Truck> {
        const truck = await TruckModel.findOne({ driverId: driverId }).select('plate type status _id');
        if (truck) return truck;
        else throw new Error("Truck not found");
    }

}
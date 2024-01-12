import { Truck } from "../entities/Truck";
import TruckModel from "../models/Truck";
import { ITruckRepository } from "../interfaces/truck/ITruckRepository";
import { injectable } from "inversify";

@injectable()
export class TruckRepository implements ITruckRepository {
    async getTrucksCount(): Promise<number> {
        const count = await TruckModel.countDocuments();
        return count;
    }
    async getTrucksPaged(page: number, pageSize: number): Promise<Truck[]> {
        const trucks = await TruckModel.find().skip(page * pageSize).limit(pageSize).select("-__v").populate({ path: "driverId", select: "-__v -password" });
        if (trucks) return trucks;
        else throw new Error("Trucks not found");

    }


    async updateTruckLocationByDriverId(driverId: string, latitude: number, longitude: number): Promise<string> {
        const updateResult = await TruckModel.updateOne({ driverId: driverId }, { currentPosition: { latitude: latitude, longitude: longitude, dateTime: Date.now() } }, { new: true });

        if (updateResult) return "Truck location updated";
        else
            throw new Error("Truck location not updated");

    }

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

    async updateTruckStatus(truckId: string, newStatus: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { status: newStatus }, { new: true });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    async updateTruckDriver(truckId: string, newDriverId: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { driverId: newDriverId }, { new: true });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    async updateTruckLoadNumber(truckId: string, newLoadNumber: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { loadNumber: newLoadNumber }, { new: true });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    async updateTruckType(truckId: string, newType: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { type: newType }, { new: true });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    async deleteTruck(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async getTruckById(truckId: string): Promise<Truck> {
        const result = await TruckModel.findById(truckId).select("-__v");
        if (result) return result;
        else throw new Error("Truck not found");
    }
    async getTruckByPlate(plate: string): Promise<Truck> {
        const result = await TruckModel.findOne({ plate: plate }).select("-__v");
        if (result) return result;
        else throw new Error("Truck not found");
    }
    async getAllTrucks(): Promise<Truck[]> {
        const trucks = await TruckModel.find().select("-__v");
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
        const truck = await TruckModel.findOne({ driverId: driverId })
        if (truck) return truck;
        else throw new Error("Truck not found");
    }

}
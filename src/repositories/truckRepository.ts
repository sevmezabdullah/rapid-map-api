import { Truck } from "../entities/Truck";
import TruckModel from "../models/Truck";
import { ITruckRepository } from "../interfaces/truck/ITruckRepository";
import { injectable } from "inversify";
import mongoose from "mongoose";

@injectable()
export class TruckRepository implements ITruckRepository {
    async updateTruck(truckId: string, truck: Truck): Promise<string> {

        const driverId = new mongoose.Types.ObjectId(truck.driverId);

        console.log("Truck ID : Repository ", truckId)
        console.log(driverId)



        const result = await TruckModel.findOneAndUpdate({ _id: truckId }, {
            $set: {
                driverId: driverId, plate: truck.plate, type: truck.type, loadNumber: truck.loadNumber, category: truck.category
                // etc 
            }
        }, { new: true });
        if (result) return "Truck updated";
        else throw new Error("Truck not updated");
    }
    async getTrucksCount(): Promise<number> {
        const count = await TruckModel.countDocuments();
        return count;
    }
    async getTrucksPaged(page: number, pageSize: number, plate: string, type: string, status: string, driverName: string, loadNumber: string): Promise<Truck[]> {
        console.log("Repository : ", plate)



        let conditions: any = {};
        const queryParameters: any = {
            plate: { $regex: plate, $options: 'i' },
            type:
                { $regex: type, $options: 'i' },
            status: { $regex: status, $options: 'i' },

        };

        if (loadNumber) queryParameters.loadNumber = { $regex: loadNumber, $options: 'i' };

        for (const key in queryParameters) {
            if (queryParameters[key]) {
                conditions[key] = queryParameters[key];
            }
        }


        const trucks = await TruckModel.find(conditions).skip(page * pageSize).limit(pageSize).select("-__v").populate(
            {
                path: "driverId", match: driverName ? { name: { $regex: driverName, $options: 'i' } } : {},
                select: "-__v -password"
            }
        ).sort({ createdAt: -1 });
        if (trucks) return trucks;
        else throw new Error("Trucks not found");

    }


    async updateTruckLocationByDriverId(driverId: string, latitude: number, longitude: number): Promise<string> {
        const updateResult = await TruckModel.updateOne({ driverId: driverId }, { currentPosition: { latitude: latitude, longitude: longitude, dateTime: Date.now() } });

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


    async updateTruckStatus(truckId: string, newStatus: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { status: newStatus });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    async updateTruckDriver(truckId: string, newDriverId: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { driverId: newDriverId });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    async updateTruckLoadNumber(truckId: string, newLoadNumber: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { loadNumber: newLoadNumber, status: 'inTransit' });
        if (updateResult) return "Truck updated";
        else throw new Error("Truck not updated")
    }
    async updateTruckType(truckId: string, newType: string): Promise<string> {
        const updateResult = await TruckModel.updateOne({ _id: truckId }, { type: newType });
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
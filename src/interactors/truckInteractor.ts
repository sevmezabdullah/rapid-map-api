import { inject, injectable } from "inversify";
import { Truck } from "../entities/Truck";
import { ITruckInteractor } from "../interfaces/truck/ITruckInteractor";
import { INTERFACE_TYPE } from "../utils";


@injectable()
export class TruckInteractor implements ITruckInteractor {

    private repository: ITruckInteractor;
    constructor(@inject(INTERFACE_TYPE.TruckRepository) repository: ITruckInteractor) {
        this.repository = repository;
    }
    async getTrucksCount(): Promise<number> {
        const result = await this.repository.getTrucksCount();
        return result;
    }
    async getTrucksPaged(page: number, pageSize: number): Promise<Truck[]> {
        const result = await this.repository.getTrucksPaged(page, pageSize);
        return result;
    }
    async updateTruckLocationByDriverId(driverId: string, langitude: number, longitude: number): Promise<string> {
        const result = await this.repository.updateTruckLocationByDriverId(driverId, langitude, longitude);
        if (result) return "Truck location updated";
        else throw new Error("Truck location not updated");

    }

    async createTruck(truck: Truck): Promise<string> {
        const result = await this.repository.createTruck(truck);
        return result;
    }
    updateTruck(truckId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    updateTruckLocation(truckId: string, longitude: number, langitute: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    updateTruckStatus(truckId: string, newStatus: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async updateTruckDriver(truckId: string, newDriverId: string): Promise<string> {
        const result = await this.repository.updateTruckDriver(truckId, newDriverId);
        if (result) return "Truck driver updated";
        else throw new Error("Truck driver not updated");
    }
    async updateTruckLoadNumber(truckId: string, newLoadNumber: string): Promise<string> {
        const result = await this.repository.updateTruckLoadNumber(truckId, newLoadNumber);
        if (result) return "Truck load number updated";
        else throw new Error("Truck load number not updated")
    }
    async updateTruckType(truckId: string, newType: string): Promise<string> {
        const result = await this.repository.updateTruckType(truckId, newType);
        if (result) return "Truck type updated";
        else throw new Error("Truck type not updated");
    }
    deleteTruck(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async getTruckById(truckId: string): Promise<Truck> {
        const result = await this.repository.getTruckById(truckId);
        if (result) return result;
        else throw new Error("Truck not found");

    }
    async getTruckByPlate(plate: string): Promise<Truck> {
        const result = await this.repository.getTruckByPlate(plate);
        if (result) return result;
        else throw new Error("Truck not found");
    }
    async getAllTrucks(): Promise<Truck[]> {
        const result = await this.repository.getAllTrucks();
        return result;
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
    getTrucksByDriverId(driverId: string): Promise<Truck> {
        throw new Error("Method not implemented.");
    }

}
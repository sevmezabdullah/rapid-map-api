import { Truck } from "../../entities/Truck";

export interface ITruckRepository {
    createTruck(truck: Truck): Promise<string>;
    updateTruck(truckId: string): Promise<string>;
    updateTruckStatus(truckId: string, newStatus: string): Promise<string>;
    updateTruckDriver(truckId: string, newDriverId: string): Promise<string>;
    updateTruckLoadNumber(truckId: string, newLoadNumber: string): Promise<string>;
    updateTruckType(truckId: string, newType: string): Promise<string>;
    deleteTruck(): Promise<string>;
    getTruckById(truckId: string): Promise<Truck>;
    getTruckByPlate(): Promise<Truck>;
    getAllTrucks(): Promise<Truck[]>;
    getTrucksByStatus(status: string): Promise<Truck[]>;
    getTrucksByType(type: string): Promise<Truck[]>;
    getTrucksByLoadNumber(loadNumber: string): Promise<Truck>;
    getTrucksByLocation(): Promise<Truck>;
    getTrucksByDriverId(driverId: string): Promise<Truck>;
}
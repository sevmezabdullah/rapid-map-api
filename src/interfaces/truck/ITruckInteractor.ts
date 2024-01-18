import { Truck } from "../../entities/Truck";

export interface ITruckInteractor {
    createTruck(truck: Truck): Promise<string>;
    updateTruck(truckId: string, truck: Truck): Promise<string>;
    updateTruckLocationByDriverId(driverId: string, langitude: number, longitude: number): Promise<string>;
    updateTruckStatus(truckId: string, newStatus: string): Promise<string>;
    updateTruckDriver(truckId: string, newDriverId: string): Promise<string>;
    updateTruckLoadNumber(truckId: string, newLoadNumber: string): Promise<string>;
    updateTruckType(truckId: string, newType: string): Promise<string>;
    deleteTruck(): Promise<string>;
    getTruckById(truckId: string): Promise<Truck>;
    getTruckByPlate(plate: string): Promise<Truck>;
    getAllTrucks(): Promise<Truck[]>;
    getTrucksByStatus(status: string): Promise<Truck[]>;
    getTrucksByType(type: string): Promise<Truck[]>;
    getTrucksByLoadNumber(loadNumber: string): Promise<Truck>;
    getTrucksByLocation(): Promise<Truck>;
    getTrucksByDriverId(driverId: string): Promise<Truck>;
    getTrucksPaged(page: number, pageSize: number, plate: string, type: string, status: string, driverName: string): Promise<Truck[]>;
    getTrucksCount(): Promise<number>;

}
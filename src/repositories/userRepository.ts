import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {

    login(email: string, password: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    register(name: string, email: string, password: string, role: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getByRole(role: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, name: string, email: string, password: string, role: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    changePassword(id: string, password: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
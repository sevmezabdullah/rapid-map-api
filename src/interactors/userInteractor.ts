import { inject, injectable } from "inversify";
import { User } from "../entities/User";
import { IUserInteractor } from "../interfaces/user/IUserInteractor";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { Password } from "../libs/password";




@injectable()
export class UserInteractor implements IUserInteractor {

    private repository: IUserRepository;
    private password: Password;


    constructor(
        @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
        @inject(INTERFACE_TYPE.Password) password: Password,


    ) {
        this.repository = repository;
        this.password = password;

    }

    async login(email: string, password: string): Promise<User> {
        const user = await this.repository.login(email, password);

        if (!user) throw ("User not found");
        return user;
    }
    async register(name: string, email: string, password: string, role: string, phoneNumber: string): Promise<string> {
        const hashedPassword = await this.password.hashPassword(password);
        const result = await this.repository.register(name, email, hashedPassword, role, phoneNumber);
        return result;
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
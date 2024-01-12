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
        const user = await this.repository.login(email);
        const verfiyPassword = await this.password.comparePassword(password, user.password);
        if (verfiyPassword)
            return user;
        if (!user) throw ("Kullanıcı bulunamadı");
        if (!verfiyPassword) throw ("Email yada şifre hatalı");
        return user;
    }
    async register(name: string, email: string, password: string, role: string, phoneNumber: string): Promise<string> {
        const hashedPassword = await this.password.hashPassword(password);
        const result = await this.repository.register(name, email, hashedPassword, role, phoneNumber);
        return result;
    }
    async getAll(): Promise<User[]> {
        const users = await this.repository.getAll();
        return users;
    }
    async getById(id: string): Promise<User | null> {
        const user = await this.repository.getById(id);
        return user;
    }
    async getByEmail(email: string): Promise<User | null> {
        const user = await this.repository.getByEmail(email);
        return user;
    }
    async getByRole(role: string): Promise<User[]> {
        const users = await this.repository.getByRole(role);
        return users;
    }
    async update(id: string, name: string, email: string, password: string, role: string): Promise<string> {
        const result = await this.repository.update(id, name, email, password, role);
        return result;
    }
    delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async changePassword(id: string, password: string): Promise<string> {
        const newPassword = await this.password.hashPassword(password);
        const result = this.repository.changePassword(id, newPassword);
        return result;
    }
}
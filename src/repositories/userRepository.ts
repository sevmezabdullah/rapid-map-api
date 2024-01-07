import { inject, injectable } from "inversify";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import UserModel from "../models/User";


@injectable()
export class UserRepository implements IUserRepository {

    async login(email: string, password: string): Promise<User> {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return user;
        } else {
            return Promise.reject("Kayıtlı kullanıcı bulunamadı.");
        }
    }
    async register(name: string, email: string, password: string, role: string): Promise<string> {

        const user = new UserModel({ name: name, email: email, password: password, role: role });
        const result = await user.save();

        if (result) {
            return "Kayıt başarılı";
        } else {
            return "Kullanıcı kaydı tamamlanamadı"
        }

    }
    async getAll(): Promise<User[]> {
        const users = await UserModel.find();
        if (users) return users;
        else return [];

    }
    async getById(id: string): Promise<User> {
        const user = await UserModel.findById(id);
        if (user) return user;
        else return new UserModel();

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
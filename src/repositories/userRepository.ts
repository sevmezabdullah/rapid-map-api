import { inject, injectable } from "inversify";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import UserModel from "../models/User";
import { INTERFACE_TYPE } from "../utils";
import { Password } from "../libs/password";

@injectable()
export class UserRepository implements IUserRepository {


    private password: Password;
    constructor(@inject(INTERFACE_TYPE.Password) password: Password) {
        this.password = password;
    }

    async login(email: string, password: string): Promise<User> {

        const user = await UserModel.findOne({ email: email });

        if (user) {
            const result = await this.password.comparePassword(password, user.password);
            if (result) {
                return user;
            }
            else {
                return Promise.reject("Giriş adı yada şifre hatalı.");
            }
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
            return Promise.reject("Kayıt başarısız");
        }

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
import { injectable } from "inversify";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import UserModel from "../models/User";


@injectable()
export class UserRepository implements IUserRepository {
    async getUserByRole(role: string): Promise<User[]> {
        const users = await UserModel.find({ role: role }).select("-password");
        if (users) return users;
        else return [];
    }
    async getUsersByNameOrEmailTransporter(name: string, email: string): Promise<User[]> {
        const users = await UserModel.find({ $or: [{ name: name }, { email: email }] });
        if (users) return users;
        else return [];
    }
    async getUserCountByRole(role: string): Promise<number> {
        const count = await UserModel.countDocuments({ role: role });
        return count;
    }

    async getByRolePaginated(role: string, page: number, pageSize: number, name: string, email: string, phone: string): Promise<User[]> {


        let conditions: any = {}
        const queryParameters: any = { name, email, phone, role };
        for (const key in queryParameters) {
            if (queryParameters[key]) {
                conditions[key] = queryParameters[key];
            }
        }

        const users = await UserModel.find(conditions).skip((page - 1) * pageSize).limit(pageSize).select("-password");
        if (users) return users;
        else return [];
    }

    async login(email: string): Promise<User> {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return user;
        } else {
            return Promise.reject("Kayıtlı kullanıcı bulunamadı.");
        }
    }
    async register(name: string, email: string, password: string, role: string, phone: string): Promise<string> {

        const user = new UserModel({ name: name, email: email, password: password, role: role, phone: phone });
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
    async getById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);
        if (user) return user;
        else return null;

    }
    async getByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email: email });
        if (user) return user;
        else return null;

    }

    async update(id: string, name: string, email: string, password: string, role: string): Promise<string> {
        const user = await UserModel.findByIdAndUpdate(id, { name: name, email: email, password: password, role: role });
        if (user) return "Kullanıcı güncellendi";
        else return "Kullanıcı güncellenemedi";
    }
    async delete(id: string): Promise<string> {
        const user = await UserModel.findByIdAndDelete(id);
        return "Kullanıcı silindi";
    }
    async changePassword(id: string, password: string): Promise<string> {
        const user = await UserModel.findByIdAndUpdate(id, { password: password });
        if (user) return "Şifre değiştirildi";
        else
            return "Şifre değiştirilemedi";
    }

}
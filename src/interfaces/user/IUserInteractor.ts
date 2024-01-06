import { User } from "../../entities/User"


export interface IUserInteractor {

    login(email: string, password: string): Promise<User>
    register(name: string, email: string, password: string, role: string, phone: string): Promise<string>
    getAll(): Promise<User[]>
    getById(id: string): Promise<User>
    getByEmail(email: string): Promise<User>
    getByRole(role: string): Promise<User[]>
    update(id: string, name: string, email: string, password: string, role: string): Promise<string>
    delete(id: string): Promise<string>
    changePassword(id: string, password: string): Promise<string>
}
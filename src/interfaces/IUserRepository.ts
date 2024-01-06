import { User } from "../entities/User"

export interface IUserRepository {
    login(email: string, password: string): Promise<string>
    register(name: string, email: string, password: string, role: string): Promise<string>
    getAll(): Promise<User[]>
    getById(id: string): Promise<User>
    getByEmail(email: string): Promise<User>
    getByRole(role: string): Promise<User[]>
    update(id: string, name: string, email: string, password: string, role: string): Promise<string>
    delete(id: string): Promise<string>
    changePassword(id: string, password: string): Promise<string>
}
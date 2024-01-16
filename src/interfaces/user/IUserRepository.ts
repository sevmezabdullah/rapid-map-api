import { User } from "../../entities/User"

export interface IUserRepository {
    login(email: string): Promise<User>
    register(name: string, email: string, password: string, role: string, phone: string): Promise<string>
    getAll(): Promise<User[]>
    getById(id: string): Promise<User | null>
    getByEmail(email: string): Promise<User | null>
    getByRolePaginated(role: string, page: number, pageSize: number): Promise<User[]>
    update(id: string, name: string, email: string, password: string, role: string): Promise<string>
    delete(id: string): Promise<string>
    changePassword(id: string, password: string): Promise<string>
    getUserCountByRole(role: string): Promise<number>
    getUsersByNameOrEmailTransporter(name: string, email: string): Promise<User[]>
    getUserByRole(role: string): Promise<User[]>
}
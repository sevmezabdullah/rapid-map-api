import { injectable } from "inversify";
import { IPassword } from "../interfaces/IPassword";
import bcrypt from 'bcrypt';

@injectable()
export class Password implements IPassword {
    async comparePassword(password: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hash);
        return result;
    }
    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (hashedPassword) {
            return hashedPassword;
        }
        throw new Error("Şifre hashlenemedi");
    }
}
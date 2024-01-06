import { injectable } from "inversify";
import { IToken } from "../interfaces/IToken";
import jwt from "jsonwebtoken"; // Add missing import statement

@injectable()
export class Token implements IToken {
    async generateToken(data: any): Promise<string> {
        console.log("TOKEN ", data)
        const token = await jwt.sign({ data }, 'rapid34', {
            expiresIn: '1h',
        });
        console.log(token)
        return token;
    }
    async verifyToken(token: string): Promise<any> {
        const data = jwt.verify(token, "rapid34");
        return Promise.resolve(data);
    }

}
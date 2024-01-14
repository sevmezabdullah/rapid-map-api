import { IMailer } from "../interfaces/IMailer";

export class Mailer implements IMailer {
    async sendMail(to: string, subject: string, text: string): Promise<any> {

    }
}
export interface IMailer {
    sendMail(to: string, subject: string, text: string): Promise<any>;
}
import { inject, injectable } from "inversify";
import { IUserInteractor } from "../interfaces/user/IUserInteractor";
import { INTERFACE_TYPE } from "../utils";
import { NextFunction, Request, Response } from 'express';
import { Token } from "../libs/token";


@injectable()
export class UserController {
    private interactor: IUserInteractor;
    private token: Token;



    constructor(
        @inject(INTERFACE_TYPE.UserInteractor) interactor: IUserInteractor,
        @inject(INTERFACE_TYPE.Token) token: Token) {
        this.interactor = interactor;
        this.token = token;

    }
    async onLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const user = await this.interactor.login(body.email, body.password);
            if (user) {
                const token = await this.token.generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(404).json({ message: "Kullanıcı bulunamadı" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onRegister(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = await this.interactor.register(body.name, body.email, body.password, body.role, body.phone);
            res.status(200).json({ message: result });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onGetAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.interactor.getAll();

            res.status(200).json({ users });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onGetById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await this.interactor.getById(id);
            res.status(200).json({ user });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onGetByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.params.email;
            const user = await this.interactor.getByEmail(email);
            res.status(200).json({ user });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onGetByRole(req: Request, res: Response, next: NextFunction) {
        try {
            const role = req.params.role;
            const users = await this.interactor.getByRole(role);
            res.status(200).json({ users });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const body = req.body;
            const result = await this.interactor.update(id, body.name, body.email, body.password, body.role);
            res.status(200).json({ message: result });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onDelete(req: Request, res: Response, next: NextFunction) { }
    async onChangePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const body = req.body;
            const result = await this.interactor.changePassword(id, body.password);
            res.status(200).json({ message: result });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
}
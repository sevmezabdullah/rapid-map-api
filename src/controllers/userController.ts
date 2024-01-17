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
            const page = req.params.page ? parseInt(req.params.page.toString()) : 1;
            const pageSize = req.params.pageSize ? parseInt(req.params.pageSize.toString()) : 10;
            const name = req.query.name as string;
            const email = req.query.email as string;
            const phone = req.query.phone as string;
            const users = await this.interactor.getByRolePaginated(role, page, pageSize, name, email, phone);
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

    async onGetUserCountByRole(req: Request, res: Response, next: NextFunction) {
        try {
            const role = req.params.role;
            const count = await this.interactor.getUserCountByRole(role);
            res.status(200).json({ count });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }

    async onGetUserByNameOrEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.params.name;
            const email = req.params.email;
            const users = await this.interactor.getUsersByNameOrEmailTransporter(name, email);
            res.status(200).json({ users });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
    async onGetUserByRole(req: Request, res: Response, next: NextFunction) {
        try {

            const role = req.params.role;
            const users = await this.interactor.getUserByRole(role);
            res.status(200).json({ users });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }
}
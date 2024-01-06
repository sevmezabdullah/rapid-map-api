import express from 'express';
import { Container } from 'inversify';
import { IUserInteractor } from '../interfaces/user/IUserInteractor';
import { INTERFACE_TYPE } from '../utils/appConst';
import { UserInteractor } from '../interactors/userInteractor';

import { Token } from '../libs/token';
import { UserController } from '../controllers/userController';
import { IUserRepository } from '../interfaces/user/IUserRepository';
import { UserRepository } from '../repositories/userRepository';
import { Password } from '../libs/password';



const container = new Container();
container.bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor).to(UserInteractor);
container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind(INTERFACE_TYPE.Token).to(Token);
container.bind(INTERFACE_TYPE.UserController).to(UserController);
container.bind(INTERFACE_TYPE.Password).to(Password);

const controller = container.get<UserController>(INTERFACE_TYPE.UserController);

const userRouter = express.Router();


userRouter.post('/login', controller.onLogin.bind(controller));
userRouter.post('/create', controller.onRegister.bind(controller));

export default userRouter;
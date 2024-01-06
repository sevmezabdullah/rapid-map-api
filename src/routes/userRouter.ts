import express from 'express';
import { Container } from 'inversify';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { INTERFACE_TYPE } from '../utils/appConst';
import { UserInteractor } from '../interactors/userInteractor';



const container = new Container();
container.bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor).to(UserInteractor);


const userRouter = express.Router();




export default userRouter;
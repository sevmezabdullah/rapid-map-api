import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import "reflect-metadata";
import userRouter from './src/routes/userRouter';
import { connect } from './dbConnection';
import winston from 'winston';

const app = express()

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'access.log' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )

})

app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url} ${req.ip} ${JSON.stringify(req.body)} ${req.headers['user-agent']}`)
    next()
})

app.use('/api/user', userRouter)


app.listen(3000, async () => {
    await connect()
    console.log("server started")
})
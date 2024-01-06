import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import "reflect-metadata";
import userRouter from './src/routes/userRouter';
import { connect } from './dbConnection';

const app = express()
app.use(express.json())



app.use('/api/user', userRouter)


app.listen(3000, async () => {
    await connect()
    console.log("server started")
})
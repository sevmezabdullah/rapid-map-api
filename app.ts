import express from 'express';

import userRouter from './src/routes/userRouter';
import 'reflect-metadata'
const app = express()
app.use(express.json())



app.use('/api', userRouter)

app.listen(3000, () => {
    console.log("server started")
})
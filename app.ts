import express from 'express';
import 'reflect-metadata'
const app = express()
app.use(express.json())



app.use()

app.listen(3000, () => {
    console.log("server started")
})
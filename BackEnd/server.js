import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';





//app config

const app = express();
const port =  process.env.PORT || 4000 ;

//Middleware

app.use(express.json())  // for parsing everything to json 
app.use(cors());

app.get('/', (req,res) => res.status(200).send("hello world"))
app.use('/api/food', foodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/images',express.static('uploads'))


const startServer = async () => {
    await connectDB();
    app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
}
startServer().catch(error => {
    console.log(error, "Failed to start the server")
})

// 
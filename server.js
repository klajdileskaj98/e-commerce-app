import express from 'express';

import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoutes.js'
import cors from "cors";


// configure env
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product',productRoute);



app.get('/',(req,res) => {
    res.send("<h1> Welcome to ecommerce app </h1>");
})

app.post('/data',(req, res) => {
    const jsonData = req.body;
    console.log(jsonData);

    res.send('JSON data received');

})


const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
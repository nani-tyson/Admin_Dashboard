import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './configs/db.js';
import client from './routes/client.js';
import general from './routes/general.js';
import management from './routes/management.js';
import sales from './routes/sales.js';

//data imports
import User from './models/User.js';
import Product from './models/product.js';
import ProductStat from './models/productStat.js';
import Transaction from './models/transaction.js';
import OverallStat from './models/overAllStats.js';
import AffiliateStat from './models/affiliateStat.js';
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} from './data/index.js';

// configurations
dotenv.config();
const port = process.env.PORT || 5000;

// Insert data into the database
const insertData = async () => {
    try {
        // Check and insert users
        const existingUsers = await User.find();
        if (existingUsers.length === 0) {
            await User.insertMany(dataUser);
            console.log('Users inserted successfully');
        } else {
            console.log('Users already exist in the database');
        }

        // Check and insert products
        const existingProducts = await Product.find();
        if (existingProducts.length === 0) {
            await Product.insertMany(dataProduct);
            console.log('Products inserted successfully');
        } else {
            console.log('Products already exist in the database');
        }

        // Check and insert product stats
        const existingProductStats = await ProductStat.find();
        if (existingProductStats.length === 0) {
            await ProductStat.insertMany(dataProductStat);
            console.log('Product stats inserted successfully');
        } else {
            console.log('Product stats already exist in the database');
        }

        
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

// Call the insertData function after connecting to the database
connectDB().then(() => {
    // insertData();
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes 
app.use('/client', client);
app.use('/', general);
app.use('/management', management);
app.use('/sales', sales);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
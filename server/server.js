import express from 'express';
import { serve } from "inngest/express";
import cors from 'cors';
import 'dotenv/config';
import connect_db from './configs/db.js';
import {inngest, functions} from './Inngest/index.js'


const app = express();

await connect_db();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> res.send('Server is running'))
app.use("/api/inngest", serve({ client: inngest, functions }));


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT} `))
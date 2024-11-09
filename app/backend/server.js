import { config } from 'dotenv';
config();
import { authRouter } from './routes/auth.js';
import express from 'express'
import mongoose from 'mongoose';
import path from 'path'
import { fileURLToPath } from 'url';

mongoose.connect(process.env.DSN)

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

import { config } from 'dotenv';
config();
import { authRouter } from './routes/auth.js';
import { photosRouter } from './routes/photos.js';
import cors from 'cors';
import express from 'express'
import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/photos', photosRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

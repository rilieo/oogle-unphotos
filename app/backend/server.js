import './config.js';
import { authRouter } from './routes/auth.js';
import { photosRouter } from './routes/photos.js';
import cors from 'cors';
import express from 'express'
import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const app = express();
const PORT = process.env.BACKEND_PORT ?? 3001;

app.use(cors({
    origin: process.env.ORIGIN ?? true,
    methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '10mb' }));
app.use('/api/auth', authRouter);
app.use('/api/photos', photosRouter);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;

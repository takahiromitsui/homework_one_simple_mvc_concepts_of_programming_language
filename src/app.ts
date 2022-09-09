import express from 'express';
import userRoutes from './routes/user';

const app = express();

app.use('/user', userRoutes);

app.listen({ port: 3000 });

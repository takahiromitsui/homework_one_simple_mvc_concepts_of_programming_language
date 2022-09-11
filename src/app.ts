import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';

const app = express();
app.use(bodyParser.json());
app.use(userRoutes);

app.listen({ port: 3000 });

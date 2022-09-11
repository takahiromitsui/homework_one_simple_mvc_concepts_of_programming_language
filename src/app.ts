import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import userRoutes from './routes/user';

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRoutes);

app.listen({ port: 3000 });

import express from 'express';
import 'reflect-metadata';
import './database'
// import routes from './routes';

const app = express();
app.use(express.json());
// app.use(routes);

app.listen(3000, () => {
    console.log('⏩ Server started on 3030 in Docker!');
});
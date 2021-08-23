import express from 'express';
import 'reflect-metadata';
import './database'

import router from './routes/index';

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => {
    console.log('⏩ Server started on 3030 in Docker!');
});
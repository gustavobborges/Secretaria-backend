import express from 'express';
import 'reflect-metadata';
import './database'
import router from './routes/index';
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8000, () => {
    // console.log('⏩ Server started on 3030 in Docker!');
    console.log('⏩ Server started on 8000 in locahost!');
    
});
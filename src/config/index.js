import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {
  errorConverter,
  errorHandler,
  notFoundHandler,
} from 'middleware/error';
import router from 'router';

const app = express();

app.use(cors());
app.options('*', cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, PATCH, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    return res.status(200).json({});
  }
  next();
});

app.use('/', router);

//app.use(errorConverter);
app.use(notFoundHandler);
//app.use(errorHandler);

export default app;

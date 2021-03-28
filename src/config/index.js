import express from 'express';
import morgan from 'morgan';
import {
  errorConverter,
  errorHandler,
  notFoundHandler,
} from 'middleware/error';
import router from 'router';

const app = express();

app.use(morgan('dev'));
app.use(express.json())

app.use('/', router);
app.use(notFoundHandler);
app.use(errorConverter);
app.use(errorHandler);

export default app;

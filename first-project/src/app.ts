/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorhandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);
const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

app.get('/', (req: Request, res: Response) => {
  //   const a = 10;
  //   res.send(a);

  res.send('Hello World!');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
app.use(globalErrorHandler);

app.use(notFound);
export default app;

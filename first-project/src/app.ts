import cors from 'cors';
import express, { Application } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/student', StudentRoutes);

// const getAController = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

// app.get('/', getAController);

// app.get('/', (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);

//   //   res.send('Hello World!')
// });

export default app;

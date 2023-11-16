import express, { NextFunction, Request, Response } from 'express'
const app = express();

//parsers
app.use(express.json());
app.use(express.text());


const userRouter = express.Router();
const courseRouter = express.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.get('/create-user',(req:Request, res:Response) =>{
   const user = req.body;
   console.log(user);
   res.json({
    success:true,
    message:'User is created successfully',
    data: user
   })
})

courseRouter.post("/create-course",(req:Request, res: Response)=>{
  const course = req.body;
  console.log(course);
  res.json({
    success:true,
    message:'User is created successfully',
    data: course
   })
})

const logger = (req: Request, res: Response, next: NextFunction) =>{
  console.log(req.url, req.method, req.hostname);
  next();
}

// app.get('/', (req : Request, res : Response) => {
//   res.send('Hello Wor');
// })

app.get('/',logger,(req : Request, res : Response) => {
  console.log(req.query);
  res.send('Hello Wor');
})

app.get('/err',logger,(req : Request, res : Response,next : NextFunction) => {
  try{
  res.send(something);
  }catch(err){
    next(err);
  }
});


// app.get('/:userId', (req : Request, res : Response) => {
//   console.log(req.params);
//   res.send('Hello World');
// })

app.get('/:userId/:subid', (req : Request, res : Response) => {
  console.log(req.params);
  res.send('Hello World');
})

app.post('/',logger,(req:Request, res:Response)=>{
  console.log(req.body);
  res.send('got data');
})

app.post('/res',(req:Request, res:Response)=>{
  console.log(req.body);
  res.json({
    nessage:"successfully received data"
  });
})

//sob route er niche dite hbe
app.all("*",(req:Request,res:Response)=>{
  res.status(400).json({
    success:false,
    message:'Route is not found'
  })
})

//global error handler
app.use((error : any,req:Request,res : Response,next : NextFunction)=>{
  if(error){
    res.status(400).json({
      success:false,
      message:"Something went Wrong",
    })
  }
})
export default app;
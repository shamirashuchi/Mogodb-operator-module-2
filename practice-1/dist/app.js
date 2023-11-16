"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.get('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: 'User is created successfully',
        data: user
    });
});
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: 'User is created successfully',
        data: course
    });
});
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
// app.get('/', (req : Request, res : Response) => {
//   res.send('Hello Wor');
// })
app.get('/', logger, (req, res) => {
    console.log(req.query);
    res.send('Hello Wor');
});
app.get('/err', logger, (req, res, next) => {
    try {
        res.send(something);
    }
    catch (err) {
        next(err);
    }
});
// app.get('/:userId', (req : Request, res : Response) => {
//   console.log(req.params);
//   res.send('Hello World');
// })
app.get('/:userId/:subid', (req, res) => {
    console.log(req.params);
    res.send('Hello World');
});
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.send('got data');
});
app.post('/res', (req, res) => {
    console.log(req.body);
    res.json({
        nessage: "successfully received data"
    });
});
//sob route er niche dite hbe
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route is not found'
    });
});
//global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went Wrong",
        });
    }
});
exports.default = app;

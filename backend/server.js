import express from 'express'
const app = express();
import mongoDB from './config/db.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js'
import taskRouter from './routes/taskRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

mongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//cookie parser
app.use(cookieParser());

app.use("/user", userRoutes)
app.use("/project", projectRoutes)
app.use('/task', taskRouter)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))     //serving   uploads/  folder as the static folder

if (process.env.NODE_ENV === 'production') {
    //set static folder

    app.use(express.static(path.join(__dirname, '/frontend/build')))

    // any route that is not api will be redirected to indesx.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '/frontend/build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.send("api successful...");
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log("server started succesfully at port: ", port)
})

import express from 'express'
const app = express();
import mongoDB from './config/db.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js'
import taskRouter from './routes/taskRoutes.js'

const port = process.env.PORT || 5000;

mongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//cookie parser
app.use(cookieParser());

app.use("/user", userRoutes)
app.use("/project", projectRoutes)
app.use('/task', taskRouter)

app.get('*', (req, res) => {
    res.json({ message: "api successful" });
})


app.listen(port, () => {
    console.log("server started succesfully at port: ", port)
})

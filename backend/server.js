import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();


const port = process.env.PORT || 5000;

app.get('*', (req, res) => {
    res.json({ message: "api successful" });
})


app.listen(port, () => {
    console.log("server started succesfully at port: ", port)
})

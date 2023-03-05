
const express = require("express");
const mongoose = require('mongoose');
const usersRouter = require("./routes/users");
require("dotenv").config();
const app = express();

app.use(express.json());
let dbUrl=process.env.DATABASE_URL;
console.log(dbUrl)
//DB Connection
mongoose.connect(dbUrl)
  .then(() => console.log('Connected!'))
  .catch((err)=>{ console.log(err)});


// Routes 
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/users", usersRouter);




app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));
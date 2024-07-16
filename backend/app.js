const express = require('express');
const mongoose = require('mongoose');


const cors=require("cors");
const detialRouter=require("./routes/detialsRouter")
const userRouter = require('./routes/userRouter');   
 const nameRouter=require('./routes/nameRouter')
 const path = require('path');
const app = express();
const PORT = 5000;
app.use(cors())   

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect('mongodb+srv://ameerku83:ameerku@cluster0.x6akll7.mongodb.net/pro')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    
    
app.use("/",userRouter)   
app.use("/",nameRouter) 
app.use("/",detialRouter)   

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        
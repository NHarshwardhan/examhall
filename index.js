const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
const cors = require('cors')
// Connect to DB
// mongoose.connect(
//     'mongodb+srv://nHarsh:<zaq1zaq1>@cluster0.sinhd.mongodb.net/<dbname>?retryWrites=true&w=majority',
//     { useNewUrlParser: true },
//      ()=>console.log('connected to db')
// )

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>
        console.log('connected to db')
);

// mongoose.connect("mongodb://localhost:27017/nodejwt")
//   .then(()=>console.log('Connected to MongoDB'))
//   .catch(err=>console.log("Could Not connect"));
// Middleware
app.use(express.json());
app.use(cors())

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

// Route Middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000,()=>console.log('Listening on port 3000....'));


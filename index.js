const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
const cors = require('cors')

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>
        console.log('connected to db')
);

app.use(express.json());
app.use(cors())

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const paperRoute = require('./routes/papers');
const courseRoute = require('./routes/courses');
const approvedStudentRoute = require('./routes/approvedStudent');

// Route Middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/papers',paperRoute);
app.use('/api/approvedStudent',approvedStudentRoute);


const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening on port 3000....${port}`));
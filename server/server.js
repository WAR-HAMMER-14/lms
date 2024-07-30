const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const colors = require('colors');

const app = express();


const port = 4000;


app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use('/images',express.static('images'));

// sampe hello world
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/server', require('./routes/appRoutes'));



app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});
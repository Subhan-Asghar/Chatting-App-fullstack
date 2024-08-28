const express = require('express')
const mongoose = require('mongoose');
const router=require('./routes/user_route')
const app = express()
const port = 3000
//Middleware
app.use(express.urlencoded({ extended: false }));
//Mongodb
mongoose.connect('mongodb://localhost:27017/library')
  .then(() => console.log('Connected!'));
app.use('/',router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
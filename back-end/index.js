const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 5000
const user = require('./Routes/Routes')
app.use(express.json())
app.use(cors())
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/user-Data').then(() => {
    console.log('MongoDB successfully connected ..!')
});
app.use('/user', user)
app.listen(port, () => {
    console.log(`Server Running on port ${port} 🔥🔥`)
}
)
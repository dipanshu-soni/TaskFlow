require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
    console.log("TaskFlow API is running !");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
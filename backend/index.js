const express = require('express');
const app = express();
const  path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const paymentRouter = require('./routes/payment.routes');
dotenv.config();

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve()

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(_dirname, '/frontend/dist')));
app.get(/.*/, (_, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});

app.use('/api/payment/', paymentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
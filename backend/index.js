import express from 'express';
import router from './routes/route.js';

const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Server is running successfully !!')
})

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

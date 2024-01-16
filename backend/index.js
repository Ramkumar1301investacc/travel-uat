import express from 'express';

const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Server is running successfully')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

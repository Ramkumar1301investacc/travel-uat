import express from 'express';
import router from './routes/route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addUserDetails, insertProposalCustomerDetails } from './database/db.js';
const app = express();

const PORT = 8080;

app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Server is running successfully !!')
})

app.use('/', router)

app.post('/addUserDetails', addUserDetails)

app.post('/insertProposalCustomerDetails',insertProposalCustomerDetails)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

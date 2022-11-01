const express = require('express');
const env = require('./.env')
const router = require('./routes')
// const model = require('./models/db')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
    console.log('port started on port => 5000')
});
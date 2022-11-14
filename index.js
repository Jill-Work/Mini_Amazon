const express = require('express');
const router = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
    console.log('port started on port => 5000')
});
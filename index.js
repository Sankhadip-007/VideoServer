const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors())

//videos route
const Videos = require('./routes/video')
app.use('/', Videos)

app.listen(5000, () => {
    console.log('Listening on port 5000!')
});
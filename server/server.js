const path = require('path');
const express = require('express');
const PORT = 8000

express()
    .use(express.json())

    .get('/', (req, res) => {
        res.send('Hello World!')
    })

    .listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}`)
    });
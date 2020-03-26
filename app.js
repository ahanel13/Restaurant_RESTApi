const express = require('express');
const app = express();

//setting up middleware
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works'
    });
});

module.exports = app;
const express = require('express');
var history = require('connect-history-api-fallback');
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.enable('trust proxy');

app.use (function (req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(history());

// Serving Static Files
app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

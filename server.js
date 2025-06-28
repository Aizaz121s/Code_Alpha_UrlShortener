const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }); // Corrected here
    if (shortUrl === null) {
        return res.sendStatus(404);
    }
    
    shortUrl.clicks++;
    await shortUrl.save(); // Make sure to await save operation

    res.redirect(shortUrl.full); // Redirect to full URL
});

app.listen(process.env.PORT || 3000);

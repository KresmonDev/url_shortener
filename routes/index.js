const express = require('express')
const ShortUrl = require('../models/shortUrl')

const router = express.Router()


router.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find().lean()

    res.render('index', {
        shortUrls: shortUrls
    })
})

router.get('/:short_url', async (req, res) => {

    const shortUrl = await ShortUrl.findOne({ short: req.params.short_url })

    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.url_clicks++
    shortUrl.save()

    res.redirect(shortUrl.full_url)
})

router.post('/short_urls', async (req, res) => {
    await ShortUrl.create({ full_url: req.body.full_url })
    res.redirect('/')

})

module.exports = router
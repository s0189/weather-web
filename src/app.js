const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define pahts for Express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
 
const app = express();
const port = process.env.PORT || 3000;

//Set up handlebars enginee and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath)

//Set up static dir to server
app.use(express.static(publicDir))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'shao'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'shao',
        helpText: 'This is some helpful text.'     
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'shao'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(data.lat, data.long, (error, predictiondata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                predictiondata,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'shao',
        message404: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'shao',
        message404: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Severe is up on port ' + port)
})
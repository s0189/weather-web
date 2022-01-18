const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoic2hhdW5hbWFwIiwiYSI6ImNrdWFvejRxeDBpeHgycXFqbnl6d3N5MjIifQ.SZx1E5ridRe4fHhkfjZdSQ'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('can not connect')
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try another Search')
        } else {
            callback(undefined, {
                long: response.body.features[0].center[0],
                lat: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })   
}

module.exports = geocode;
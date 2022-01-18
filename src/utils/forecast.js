const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=280b88d7130c383f0d315e3a6dd32fe1&query='+lat+','+long+'&units=f'

    request({url: url, json: true}, (error, response)=>{
        if (error) {
            callback('Unable to connect to weather services!')
        } else if (response.body.error) {
            callback('There is an error')
        } else {
            callback(undefined,
                `${response.body.current.weather_descriptions[0]}, It is ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain`)
        }
    })
}

module.exports = forecast;
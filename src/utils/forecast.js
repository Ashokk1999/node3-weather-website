const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1df93d4988b0a5da92afbfc1dd20b40d&query=' + latitude +','+ longitude + '&units=f'
      
     request({url, json : true}, (error,{body})=>{
 
         if(error){
             callback('Unable to connect to weather stack',undefined)
         } else if(body.error){
             callback('unable to find location',undefined)
         } else{
            callback( undefined,{
             temperature : body.current.temperature,
             feelslike   : body.current.feelslike,
             weather_description: body.current.weather_descriptions[0]
            }) }
 
     })
 
 
 }


 module.exports = forecast
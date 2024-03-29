const request = require('request')
const geoCode= (address, callback)=> {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXNob2trb25hbGEiLCJhIjoiY2xvbGh1aWl1MHg4YzJxbW9rdjg1YzhweiJ9.Yb0lLZ_9N3qCf8ZifccA_A&limit=1'

    request({url, json: true}, (error, {body})=>{

        if(error){
            callback('Unable to connect to location services!',undefined)
        } else if(body.features.length===0){
            callback('Unable to find Location. Find another search',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location : body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode
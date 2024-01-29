const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//Define paths for express config

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
// const aboutFilePath =path.join(publicDirectoryPath,'/about.html')
// const helpFilePath =path.join(publicDirectoryPath,'/help.html')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ashok'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'Weather details',
        name: 'Ashok'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Ashok'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
   
    }

    console.log(req.query.address)

    geoCode(req.query.address, (error, {latitude, longitude,location}={})=>{

        if(error){
            return res.send({error})
        }
       console.log(latitude,longitude)
        forecast(latitude,longitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            const forecastInfo = "The current temparature is "+ forecastData.temperature + " and it feels like "+
            forecastData.feelslike + ". The weather is "+ forecastData.weather_description
            res.send({
                forecast: forecastInfo ,
                location,
                address: req.query.address
            })

        })

    })


    // res.send({
    //     location : 'Rajahmundry',
    //     Forecast : 'cloudy and Sunny',
    //     Address  :  req.query.address
    // })
})

app.get('/products', (req,res)=>{
    
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
         })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*', (req,res)=>{

    res.render('404',{
        title:'404',
        name: 'Ashok',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title:'404',
        name: 'Ashok',
        errorMessage: 'Page not found'
    })
})

// app.use(express.static(aboutFilePath))
// app.use(express.static(helpFilePath))


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})


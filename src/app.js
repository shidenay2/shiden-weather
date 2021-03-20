const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geoCode')
const forcast = require('./utils/forcast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shiden Gebrewahid',
        age:27,
        Id:"3930 "
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shiden gebrewahid',
        handler: ()=>{

        }
    })
})
const helpText="If you want to access this system you must have an internet connection more than everything!"

app.get('/help', (req, res) => {
    res.render('help', {
        helpText,
        title:"Help"
    })
})

app.get('/weather', (req, res) => {
if(!req.query.address){
    return  res.send({
        error:'Address is not provided!'
    })
}
geocode(req.query.address,(error,{latitude,longitude}={})=>{
    if(error){
      return   res.send({error})
    }

   forcast(latitude,longitude,(error,{body}={})=>{
    if(error)
    return res.send({
        error:error
    })
    res.send({
        timezone:body.timezone,
        summary:body.currently.summary,
        temperature:body.currently.temperature
    })
})
 
    })
    

})
    

app.get('/products',(req,res)=>{
   if(!req.query.search){
        return res.send({
           error:"you must provide the search term!"
       })
   }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorcode:"help article not found!"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        errorcode:"Error:page not found!"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
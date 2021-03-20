const request =require('request')

const geocode=(address,callback)=>{
   
const geocodingurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpZGVuIiwiYSI6ImNrNzNlZmNmbTA3NnAzbXJzc3l5OHlub3AifQ.ELOom8sRLPIZu7fzQL1rkA'
request({url:geocodingurl,json:true},(error,{body}={})=>{
    if(error){
        callback("unable to connect to the Location service!", undefined)
    }
    else if(body.features.length===0){

callback(' Unable to get location.Try another search.',undefined)
    }
    else{
        callback(undefined,{latitude:body.features[0].center[1],longitude:body.features[0].center[0]})
    }
})

} 



module.exports=geocode
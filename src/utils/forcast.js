const request=require('request')

const forcast=(latitude,longitude, callback)=>{
const url="https://api.darksky.net/forecast/c80bc76dd05c63defa04c58f5bb301c3/"+latitude+","+longitude
request({url,json:true},(error,response)=>{

    if(error){
        callback("unable to connect to the weather service",undefined)
    }
    else if(response.body.length===0){
        callback('unavle to get weather for the location.try another search please',undefined)
    }
    else{
        callback(undefined,response)
    }
})

}




module.exports=forcast
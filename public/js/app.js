

    const weatherForm=document.querySelector('form')
    weatherForm.addEventListener('submit',(e)=>{
      e.preventDefault()
        const address=document.getElementById("address-input").value
        fetch('http://localhost:3000/weather?address='+address).
        then((response)=>{
                response.json().then((data)=>{
                    if(data.error){
                        document.getElementById("display-weather-info").innerHTML="Loading..."
                        setTimeout(()=>{
                            
                            call()
                        },1000)
                        function call(){
                            document.getElementById("display-weather-info").innerHTML=data.error
                        }
                        
                        
                    }
                    else{
                        document.getElementById("display-weather-info").innerHTML="Loading..."
                        function call(){
                            displayValue="The temprature is:"+data.temperature+"<br /> the summary of the weather is :"+data.summary
                            document.getElementById("display-weather-info").innerHTML=displayValue
                        }
                        
                    }
                })
            })
        

    })
    







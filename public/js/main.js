
const cityName=document.getElementById('cityName');
const submitBtn=document.getElementById('submitBtn');
const city_name=document.getElementById('city_name');
const temp_status=document.getElementById('temp_status');
const temp_real_val=document.getElementById('temp_real_val');
const datahide=document.querySelector('.middle_layer');
const real_feel=document.getElementById('real_feel');
const iscloud=document.getElementById('iscloud');
const wind=document.getElementById('wind');
const humidity=document.getElementById('humidity');
const visibility=document.getElementById('visibility');
const pressure=document.getElementById('pressure');
const description=document.getElementById('description');
const temp_max =document.getElementById('temp_max');
const air_quality=document.getElementById('air_quality');

const getInfo=async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value;
    if(cityVal===""){
        city_name.innerText=`Please write the city name before search`;
        // datahide.classList.add('data_hide');
    }else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=e2e74c23f7e2e749babf409ae2aa0bc8`;
          
            const response=await fetch(url);
            const data=await response.json();

            const arrData=[data]; 
            console.log(arrData[0].wind.speed);
            const latitude=arrData[0].coord.lat;
            const longitude=arrData[0].coord.lon;
            city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`;
            temp_real_val.innerText=arrData[0].main.temp;
            real_feel.innerText=arrData[0].main.feels_like;
            iscloud.innerText="  "+arrData[0].weather[0].main;
            wind.innerText=arrData[0].wind.speed+" km/h";
            humidity.innerText=arrData[0].main.humidity+"%";
            visibility.innerText=arrData[0].visibility/1000+" km";
            pressure.innerText=arrData[0].main.pressure+" mb";
            temp_max.innerText=arrData[0].main.temp_max;


            let polution_url=`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=e2e74c23f7e2e749babf409ae2aa0bc8`
            const response2=await fetch(polution_url);
            const data2=await response2.json();
            const arrData2=[data2];
            air_quality.innerText=arrData2[0].list[0].main.aqi;


            if(arrData[0].weather[0].main==="Rain"){
                description.innerText="Expect scattered rain showers. The low will be "+arrData[0].main.temp_min;
            }else if(arrData[0].weather[0].main==="Mist" || arrData[0].weather[0].main==="Haze" || arrData[0].weather[0].main==="Drizzle"){
                description.innerText="The skies will be clear. The low will be "+arrData[0].main.temp_min;
            }else if(arrData[0].weather[0].main==="Clouds"){
                description.innerText="Heavy thunderstorms will roll through your area. The low will be "+arrData[0].main.temp_min;
            }

            const tempMood=arrData[0].weather[0].main;
            // condition to check sunny or cloudy
            if(tempMood=="Clear"){
                temp_status.innerHTML=
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }else if(tempMood=="Clouds"){
                temp_status.innerHTML=
                "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }else if(tempMood=="Rain"){
                temp_status.innerHTML=
                "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }else{
                temp_status.innerHTML=
                "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }

            // datahide.classList.remove('data_hide');
            
        }catch{
            city_name.innerText=`Please write the city name properly`;
            // datahide.classList.add('data_hide');
        }
        
    }
}


submitBtn.addEventListener('click',getInfo);
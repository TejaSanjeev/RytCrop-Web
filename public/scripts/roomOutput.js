document.getElementById("nav1").addEventListener("click",function ()
    {
        document.getElementById('block11').style.display = 'none';
        document.getElementById('block12').style.display = 'block';
    }
)
document.getElementById("nav2").addEventListener("click",function ()
    {
        document.getElementById('block12').style.display = 'none';
        document.getElementById('block11').style.display = 'block';
    }
)

const apiKey="aa9b4f593b31b7d3f6fd788d72b63d29";
        const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox=document.querySelector(".search input");
        const searchBtn=document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city)
        {
            const response=await fetch(apiUrl+city+`&appid=${apiKey}`);
            var data=await response.json();

            // console.log(data);

            document.querySelector(".city").innerHTML=data.name;
            document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c";
            document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
            document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";

            if(data.weather[0].main==="Clouds")
            {
                weatherIcon.src="images/clouds.png";
            }
            else if(data.weather[0].main==="Clear")
            {
                weatherIcon.src="images/clear.png";
            }
            else if(data.weather[0].main==="Rain")
            {
                weatherIcon.src="images/rain.png";
            }
            else if(data.weather[0].main==="Drizzle")
            {
                weatherIcon.src="images/drizzle.png";
            }
            else if(data.weather[0].main==="Mist")
            {
                weatherIcon.src="images/mist.png";
            }

        }

        searchBtn.addEventListener("click",()=>{
            checkWeather(searchBox.value);
        })
        checkWeather("new delhi");
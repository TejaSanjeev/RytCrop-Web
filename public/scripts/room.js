document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdown.contains(event.target)) {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    } else {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(function(menu) {
            menu.style.display = 'none';
        });
    }
});

document.addEventListener('click', function(event) {
    const dropdownMenuItem = event.target.closest('.dropdown-menu-item');
    
    if (dropdownMenuItem) {
        const selectedState = dropdownMenuItem.textContent;
        const dropdownSelect = document.querySelector('.dropdown-select');
        dropdownSelect.textContent = selectedState;
        
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(function(menu) {
            menu.style.display = 'none';
        });
    }
});
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

function flipInputSoil() {
    document.getElementById('hide1').style.display = 'block';
    document.getElementById('hide2').style.display = 'none';
    document.getElementById('hide3').style.display = 'none';
  }

  function flipInputLocation() {
    document.getElementById('hide1').style.display = 'none';
    document.getElementById('hide2').style.display = 'block';
    document.getElementById('hide3').style.display = 'none';
  }

function flipInputCards() {
    document.getElementById('hide1').style.display = 'none';
    document.getElementById('hide2').style.display = 'none';
    document.getElementById('hide3').style.display = 'block';

}
const apiKey=""; //please insert your api key
        const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox=document.querySelector(".search input");
        const searchBtn=document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city)
        {
            const response=await fetch(apiUrl+city+`&appid=${apiKey}`);
            var data=await response.json();

            console.log(data);

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

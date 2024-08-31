import axios from "axios";
import { getRDays } from "./RDays.js";

const form = document.querySelector("form");
const inputDate = document.querySelector("#date");  // Correctly select the date input
const inputCity = document.querySelector("#city");

const city_error = document.querySelector("#city_error");
const date_error = document.querySelector("#date_error");



const getWeather = async (lat, lng, RDays) => {
    const { data } = await axios.post("http://localhost:8000/getWeather", {
        lat,
        lng,
        RDays
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data;
}

const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validation()) {
        return false;
    }

    const location = await getCity();

    
    if (location && location.error) {
        
        //handling the error coming from the server-side
        city_error.innerHTML = `${location.message}`;
        city_error.style.display = "block";
        return
    }
    else if (location && !location.error) {
        city_error.style.display = "none";
        const { name, lat, lng } = location;

        if(!inputCity.value) {
            city_error.innerHTML = `please enter a city name`;
            city_error.style.display = "block";
            
        } 


        if (!inputDate.value) {
            date_error.innerHTML = `Please enter the date`;
            date_error.style.display = "block";
            return;
        }
        const RDays = getRDays(inputDate.value);
        const Weather = await getWeather(lat, lng, RDays);
        if (Weather && Weather.error) {
            date_error.innerHTML = `${Weather.message}`;
            date_error.style.display = "block";
            return;
        }
        date_error.style.display = "none";

        const pic = await getCityPic(name);
        updateUI(RDays, name, pic.img, Weather);
    }



}

const getCity = async () => {
    const { data } = await axios.post("http://localhost:8000/getCity", form, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    return data;
}


const getCityPic = async (name) => {
    const { data } = await axios.post("http://localhost:8000/getPic", {
        name
    })
    
    return data;
}


const updateUI = (Rdays, city, pic, weather) => {
    document.querySelector("#Rdays").innerHTML =
    Rdays != 1 
    ? `Your trip starts in ${Rdays} days`
    :`Your trip starts in ${Rdays} day`;
    document.querySelector(".cityName").innerHTML = `Location: ${city}`;

    document.querySelector(".weather").innerHTML =
        Rdays < 7
            ? `Weather is: ${weather.description}`
            : `Weather is expected to be: ${weather.description}`;

    document.querySelector(".temp").innerHTML =
        Rdays > 7
            ? `Forecast: ${weather.temp}&degC`
            : `Temperature: ${weather.temp} &deg C`;

    document.querySelector(".max-temp").innerHTML =
        Rdays > 7 ? `Max-Temp: ${weather.app_max_temp}&degC` : "";

    document.querySelector(".min-temp").innerHTML =
        Rdays > 7 ? `Min-Temp: ${weather.app_min_temp}&degC` : "";

    document.querySelector(".cityPic").innerHTML = `
        <image 
        src="${pic}" 
        alt="city image"
        >
        `;
    document.querySelector(".flight_data").style.display = "block";
};

const validation = () => {
    city_error.style.display = "none";
    date_error.style.display = "none";

    if (!inputCity.value) {
        city_error.innerHTML = `Please enter a city name`;
        city_error.style.display = "block";
        return false;
    }

    if (!inputDate.value) {  // Use inputDate here
        date_error.innerHTML = `Please enter the date`;
        date_error.style.display = "block";
        return false;
    }

    if (getRDays(inputDate.value) < 0) {  // Use inputDate here
        date_error.innerHTML = `Date cannot be in the past`;
        date_error.style.display = "block";
        return false;
    }

    city_error.style.display = "none";
    date_error.style.display = "none";
    return true;
}





export { handleSubmit }






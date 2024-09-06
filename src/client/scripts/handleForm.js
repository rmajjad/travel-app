import axios from "axios";
import { getRDays } from "./RDays.js";

const form = document.querySelector("form");
const inputDate = document.querySelector("#date");
const inputCity = document.querySelector("#city");

const cityError = document.querySelector("#city_error");
const dateError = document.querySelector("#date_error");





const handleSubmit = async (event) => {
    event.preventDefault();
    
    const Loc = await getCity();

    if (!Loc.error) {
        cityError.style.display = "none";
        const { city, lat, lng } = Loc;

        if(!inputCity.value) {
            cityError.innerHTML = `please enter a city name`;
            cityError.style.display = "block";
        } 

        if (!inputDate.value) {
            dateError.innerHTML = `Please enter the date`;
            dateError.style.display = "block";
            return;
        }
        const RDays = getRDays(inputDate.value);
        const Weather = await getWeather(lat, lng, RDays);
        if (Weather.error) {
            dateError.innerHTML = `${Weather.message}`;
            dateError.style.display = "block";
            return;
        }
        dateError.style.display = "none";

        const pic = await getCityPic(city);

        updateUI(pic.img, RDays,Weather ,city );

    }else if (Loc.error) {
        cityError.innerHTML = `wrong city name!`;
        cityError.style.display = "block";
        return false;
    }

    if (!validation()) {
        return false;
    }
    


}

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

const getCity = async () => {
    const { data } = await axios.post("http://localhost:8000/getCity", form, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    return data;
}


const getCityPic = async (city) => {
    const { data } = await axios.post("http://localhost:8000/getPic", {
        city,
    });
    
    return data;
}


const updateUI = (pic, Rdays, weather, city) => {
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
        width="350"
        >
        `;
    document.querySelector(".flight_data").style.display = "block";
};

const validation = () => {
    cityError.style.display = "none";
    dateError.style.display = "none";

    if (!inputCity.value) {
        cityError.innerHTML = `Please enter a city name`;
        cityError.style.display = "block";
        return false;
    }

    if (!inputDate.value) {  
        dateError.innerHTML = `Please enter the date`;
        dateError.style.display = "block";
        return false;
    }

    if (getRDays(inputDate.value) < 0) {  
        dateError.innerHTML = `Date cannot be in the past`;
        dateError.style.display = "block";
        return false;
    }

    cityError.style.display = "none";
    dateError.style.display = "none";
    return true;
}





export { handleSubmit }





/*  I apologize for the confusion; I had used this project solely for reference.
Unfortunately, in my haste, I submitted the wrong project earlier. I hope this time my submission is correct.   */








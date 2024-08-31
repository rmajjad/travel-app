const axios = require('axios');

const getWeather = async(lng, lat, RDays, WEATHER_KEY)=>{
    
    
    if(RDays < 0) {
        const errMsg = {
            message: "Date cannot be in the past",
            error: true
        }
        return errMsg
    }
    else if(RDays > 0 && RDays < 7 ){
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${WEATHER_KEY}`);
        
        const {weather,temp} = data.data[0];
        const { description } = weather;
        const weatherData = {description,temp};
        
        return weatherData;

    }else if(RDays > 7){
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${RDays}&units=M&key=${WEATHER_KEY}`);
        
        const {weather,temp, app_max_temp, app_min_temp} = data.data[data.data.length - 1];
        const {description} = weather;
        weatherData = {description,temp, app_max_temp, app_min_temp};
        return weatherData;
    }
}

module.exports = {getWeather}

const axios = require("axios");

const getCityLoc = async(city, username) => {
    const {data} = await axios.get(`http://api.geonames.org/postalCodeSearchJSON?placename=${city}&maxRows=1&username=${username}`)
    if(data.postalCodes.length === 0){
        const errorMsg={
            message : "wrong city name!",
            error : true
        }
        return errorMsg;
    }
    const {placeName, lat, lng} = data.postalCodes[0];
    return {lat: lat, lng: lng, city: placeName}
}

module.exports = {getCityLoc}
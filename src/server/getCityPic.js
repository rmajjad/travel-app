const axios = require("axios");

const getCityPic = async (name, key) =>{
    const {data} = await axios.get(`https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo&pretty=true`);

    const img = await data.hits[0]? await data.hits[0].webformatURL: "https://images.unsplash.com/photo-1724931498964-a1f392ba9ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDg3ODB8MHwxfGFsbHwyfHx8fHx8Mnx8MTcyNTAzMjAxM3w&ixlib=rb-4.0.3&q=80&w=400"
    return {img};
}

module.exports = {getCityPic} 



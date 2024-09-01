const express = require("express")
const app = express();
const cors = require("cors");
const { getCityLoc } = require("./getCityLoc.js");
const {getWeather} = require("./getWeather.js");
const { getCityPic } = require("./getCityPic.js");


//read the json files coming to you
app.use(express.json())
app.use(express.static('dist'))

//require dotenv
require("dotenv").config() 



//using cors
app.use(cors())

port = 8000



const username = process.env.NAME;
const WEATHER_KEY = process.env.WEATHER_KEY;
const PIXABAY_KEY = process.env.PIXABAY_KEY


app.get("/", (req, res) => {
    res.render("index.html")
})

app.post("/getCity", async (req, res) => {
    
    const {city} = req.body;
    
    const Location = await getCityLoc(city, username) 
    
    return res.send(Location)

})

app.post("/getWeather", async (req, res) => {
    const { lng, lat, RDays } = await req.body;
    const Weather = await getWeather(lng, lat, RDays, WEATHER_KEY)
    return res.send(Weather)
}) 

app.post("/getPic", async (req, res) => {
    const { city } = req.body;
    
    const getPic = await getCityPic(city, PIXABAY_KEY);
    return res.send(getPic);
})

app.listen(8000, () => console.log(`server is listening on port ${port}`));
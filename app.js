const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){
    var cityName = req.body.nameOfCity;
    const query = cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=931ca1ac52f102863f41e1873fd8a554`;
    https.get(url, function (response){
        console.log(response.statusCode);
        response.on("data", function (data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const imageUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            res.write("<h1>The temperature in " + cityName + " = " + temp + "degree Celcius.</h1>");
            res.write("<p>The weather is currently: " + description + ".</p>" );
            res.write(`<img src="${imageUrl}" alt="weather-image">`);
            res.send();
        });
    });
});



app.listen(3000, function (){
    console.log("Server is running at port: 3000");
})
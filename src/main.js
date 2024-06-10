require('dotenv').config()
const fetch = require('node-fetch');


const nodemailer = require("nodemailer");

(async function run (){
    console.log('Running my daily report...')

    const locationRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/US/search?q=${encodeURIComponent('Jersey City, NJ')}&apikey=${process.env.ACCUWEATHER_API_KEY}`)
    const locationData = await locationRequest.json();
    const locationKey = locationData[0].Key;

    const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.ACCUWEATHER_API_KEY}`)
    const forecastData = await forecastRequest.json();

    const temperature = forecastData.DailyForecasts[0].Temperature;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER_EMAIL,
            pass: process.env.EMAIL_USER_PASS


        },
    });

       await transporter.sendMail({
        from: process.env.EMAIL_FROM, // sender address
        to: process.env.EMAIL_TO, // list of receivers
        subject: "Daily Report 📚", // Subject line
        text: `
        
        Daily Report 📚
        `, // plain text body
        html: `<h1>📚 Daily Report 📚</h1>
                <h2> Weather </h2>
                <p> Forecast: ${forecastData.Headline.Text} </p>
                <p> Min: ${temperature.Minimum.Value}° ${temperature.Minimum.Unit} </p>
                <p> Max: ${temperature.Maximum.Value}° ${temperature.Maximum.Unit} </p>

`, // html body
    });



})();

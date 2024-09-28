const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')

const {
    PROTOCOL, APP_ID
} = process.env

//variável cidade
const city = "Itu"

//variável limite cidade - consulta
limit = 1

// url cidade - consulta
const url_cidade = `${PROTOCOL}://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APP_ID}`

axios.get(url_cidade)
    .then(res => {
    // requisição get resultado da consulta por cidade
    resultado = res.data

    //obtém coordenadas 
    //criação das variáveis e display lat e lon
    const {lat, lon} = resultado[0];

    //display no terminal
    console.log(`Dados da consulta por cidade:
    ${city}
    Latitude: ${lat},
    Longitude: ${lon}`);

})
.catch(err => {
     console.error("Erro na requisição:", err);
});

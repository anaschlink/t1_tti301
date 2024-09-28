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

    // segunda requisição coordenadas
    const url_coordenadas = `${PROTOCOL}://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}`

    return axios.get(url_coordenadas);
})
.then(res =>{
    //envio coordenadas
    clima = res.data
    // obtenção da sensação térmica e descrição 
    const condicoes = {"descricao": clima.weather[0].description, "feels_like": clima.main.feels_like}
    
    // tratamento de dados: transformação de kelvin para celsius
    const sensacao_celsius = (condicoes.feels_like - 273.15)
    
    // display no terminal
    console.log(`Dados do clima de ${city}:
        sensação térmica: ${sensacao_celsius.toFixed(2)},
        descrição: ${condicoes.descricao}`)
    
})

.catch(err => {
     console.error("Erro na requisição:", err);
});

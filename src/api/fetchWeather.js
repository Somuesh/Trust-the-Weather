import axios from "axios";


const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

export const fetchWeather = async (query) => {

    const response = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });
    // console.log(response)
    return response.data;

}
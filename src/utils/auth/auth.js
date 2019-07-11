import axios from 'axios'
import config from "../../config"

const encode = input => Buffer.from(input).toString('base64')

var tokenString = "";
var expirationDate;

function buildAuthString() {
  var credentials = `${config.air.formatVersion}:${config.air.userId}:${config.air.group}:${config.air.domain}`;
  var secret = encode(config.air.clientSecret);
  return encode(encode(credentials)+":"+secret);
}

module.exports = configAxios => {
  if (tokenString.length == 0 || expirationDate == null || Date() > expirationDate) {
    const options = {
      method: 'POST',
      headers : {
        "Authorization" : `Basic ${buildAuthString()}`,
        "Content-Type" : "application/x-www-form-urlencoded",
        "grant_type": 'client_credentials'
      },
      url: `${configAxios.baseURL}/v2/auth/token`,
    };

    var timeObject = new Date();

    return axios(options)
      .then(res => {
        const data = res.data
        tokenString = data.access_token;
        // expires_in, The time-to-live of the sessionless token in seconds
        // sumo los segundos al dia de hoy (milisegundos por segundos de respuesta)
        expirationDate = new Date(timeObject.getTime() + (1000 * res.data.expires_in));

        console.log("Token aquired; token's expiration date: "+expirationDate);

        configAxios.headers['Authorization'] = `Bearer ${tokenString}`
        return configAxios
      })
      .catch(err => {
        throw err
      });
  } else {
    console.log("Just reading the previously aquired token...");

    configAxios.headers['Authorization'] = `Bearer ${tokenString}`
    return configAxios
  }
}

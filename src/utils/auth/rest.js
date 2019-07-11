import axios from 'axios'
import config from "../../config"
import auth from "./auth"

const Axios = axios.create({
  baseURL: `${config.air.endpoint.rest}`,
  timeout: `${config.air.timeout}`
})

Axios.interceptors.request.use(auth)

function catchError(err) {
  if (err.response) {
    console.log("error:", err.response && err.response.data)
  } else {
    // console.log("error:", err)
    console.log("error: timeout")
  }
}

module.exports = {
  get : function(request) {
    console.log(request)
    return Axios.get(`${request.directUrl || request.service}`, { params: request.query })
      .then(res => {
        return res.data
      })
      .catch(catchError)
  },
  post : function(request) {
    return Axios.post(`${request.service}`, request.query, { headers : { "Content-Type":"application/json", Accept:"*/*" }})
      .then(res => {
        return res.data
      })
      .catch(catchError)
  }
};


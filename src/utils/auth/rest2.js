const axios = require('axios')
const parseStringSync = require('xml2js-parser').parseStringSync 
const transform = require('lodash').transform 

var config = require("../config");
var auth = require("./auth");

const Axios = axios.create({
  baseURL: `${config.environment}`,
  timeout: `${config.timeout}`
})

// Axios.interceptors.request.use(auth)

function catchError(err) {
  if (err.response) {
    console.log("error:", err.response && err.response.data)
  } else {
    // console.log("error:", err)
    console.log("error: timeout")
  }
}


const sanitize = data =>
	transform(data, (result, value, key) => {
		if (key === '_') {
			key = 'value'
		}
		if (key === '$') {
			key = 'props'
		}
		if (key && key.replace) {
			key = key.replace(/^([^:]*[:])/, '')
		}

		if (Array.isArray(value) && value.length === 1) {
			const [val] = value
			value = val
		}

		if (typeof value === 'object') {
			result[key] = sanitize(value)
		} else {
			result[key] = value
		}
		return result
	})

const parser = xml => sanitize(parseStringSync(xml))

module.exports = {
  get : function(request, response, eventEmitter) {
    console.log("Rest's GET function: event=%s", request.event);
    console.log(`${request.directUrl || request.service}`)

    return Axios.get(`${request.directUrl || request.service}`, { params: request.query })
      .then(res => {
        response[request.event] = res.data;
        console.log("\t going on to event %s", request.nextEvent);
        eventEmitter.emit(request.nextEvent);
      })
      .catch(catchError)
  },
  post : function(request, response, eventEmitter) {
    console.log("Rest's POST function: event=%s", request.event);
		
    // return Axios.post(`${request.service}`, parser(request.query), { 
    return Axios.post(`${request.service}`, request.query, { 
      headers : { 
        'Content-Type': 'text/xml;charset=UTF-8',
        // 'Accept': "*/*" 
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip,deflate'
      }})
      .then(res => {
        response[request.event] = res.data;
        console.log("\t going on to event %s", request.nextEvent);
        eventEmitter.emit(request.nextEvent);
      })
      .catch(catchError)
  }
};

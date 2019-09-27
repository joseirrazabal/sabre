import rest from '../../../utils/auth/rest'

class BargainFinderMaxModel {
	constructor(params) {
		Object.assign(this, params)
	}

	get itineraries() {
		return this.response
	}

	async readRequest() {
		var requestObject = {
			service: '/v2/shop/flights/fares',
			query: this.toBodyString()
		}

		console.log('bien')
		let result = await rest.get(requestObject)

		console.log(JSON.stringify(result, null, 2))

		this.response = result
		return this.response
	}

	toBodyString() {
		// destination finder
		// return {
		// 	origin: 'BUE',
		// 	lengthofstay: '5,7,10,14',
		// 	// location: 'BR,ES,MX',
		// 	location: 'BR',
		// 	pointofsalecountry: 'AR',
		// 	theme: 'BEACH',
		// 	topdestinations: 3
		// }
		//-----------------

		return {
			origin: 'BUE',
			destination: 'RIO',
			lengthofstay: '5',
			// location: 'BR,ES,MX',
			pointofsalecountry: 'AR'
		}
	}
}

module.exports = BargainFinderMaxModel

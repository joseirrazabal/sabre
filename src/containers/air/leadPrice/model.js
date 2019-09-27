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

		let result = await rest.get(requestObject)

		this.response = result
		return this.response
	}

	toBodyString() {
		return {
			origin: this.fromAirportCode,
			destination: this.toAirportCode,
			lengthofstay: '5,7,10,14,16',
			pointofsalecountry: 'AR'
		}
	}
}

module.exports = BargainFinderMaxModel

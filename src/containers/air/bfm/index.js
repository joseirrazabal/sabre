import BFMModel from './model'
import BFMView from './view'

import config from '../../../config'

const RunFlightSearch = async ({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage }) => {
	const searchModel = new BFMModel({
		pcc: config.air.group,
		fromAirportCode: origin,
		toAirportCode: destination,
		timeStampLeave: departureDate,
		timeStampReturn: arrivalDate,
    cabin: cabin,
    baggage: baggage,
    airline: airline
	})

	return searchModel.readRequest().then(async () => {
		const searchView = new BFMView(searchModel)
		return await searchView.render()
	})
}

export default RunFlightSearch

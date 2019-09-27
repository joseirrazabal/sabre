import bfm from './bfm'
import calendar from './destinationFinder'
import leadPrice from './leadPrice'
import shop from './shop'
import alternateDate from './alternateDate'
import reservation from './createPassenger'

const resultSearch = async data => {
	const { origin, destination, departureDate, arrivalDate, cabin, airline } = data
	const baggage = Boolean(parseInt(data.baggage))

	let prueba = ''

	if (data.find === 'bfm') {
		prueba = await bfm({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage })
	} else if (data.find === 'shop') {
		prueba = await shop({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage })
	} else if (data.find === 'lead') {
		prueba = await leadPrice({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage })
	} else if (data.find === 'cal') {
		prueba = await calendar({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage })
	} else {
		prueba = await alternateDate({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage })
	}

	return prueba
}

const resultReservation = async data => {
	let prueba = await reservation()
	return prueba
}

export { resultSearch as search, resultReservation as reservation }

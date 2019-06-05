const itinerary = {
	penalties: {
		exchangebefore: null,
		exchangeafter: null,
		refundbefore: null,
		refundafter: null
	},
	directionInd: 'Return',
	passengers: {
		adults: 1,
		childs: 0,
		babies: 0,
		types: {
			adults: ['ADT'],
			childs: [],
			babies: []
		}
	},
	cabin: {
		code: 'Y',
		name: 'Economy'
	},
	airline: {
		code: 'AR',
		name: 'Aerolineas Argentinas'
	},
	going: {
		departure: {
			date: '2019-09-05T08:00:00',
			time: 480,
			gmt: -3
		},
		arrival: {
			date: '2019-09-05T08:55:00',
			time: 535,
			gmt: -3
		},
		baggage: 0,
		elapsedTime: 55,
		segments: [
			{
				aircraft: {
					code: 'E90',
					name: 'Embraer ERJ-190'
				},
				airline: {
					code: 'AR',
					name: 'Aerolineas Argentinas'
				},
				marketingAirline: {
					code: 'AR',
					name: 'Aerolineas Argentinas'
				},
				flightNumber: 'AR2700',
				cabin: {
					code: 'Y',
					name: 'Economy'
				},
				seatsRemaining: 5,
				marriageGrp: 'O',
				resBookDesigCode: 'R',
				departure: {
					date: '2019-09-05T08:00:00-0300',
					airport: {
						code: 'AEP',
						name: 'Aeroparque Jorge Newbery',
						city: 'Buenos Aires',
						country: 'AR',
						cityCode: 'BUE'
					}
				},
				arrival: {
					date: '2019-09-05T08:55:00-0300',
					airport: {
						code: 'ROS',
						name: 'Fisherton',
						city: 'Rosario',
						country: 'AR',
						cityCode: 'ROS'
					}
				},
				elapsedTime: 55,
				scaleTime: null,
				stops: []
			}
		],
		scalesTime: 0
	},
	return: {
		departure: {
			date: '2019-09-11T19:35:00',
			time: 1175,
			gmt: -3
		},
		arrival: {
			date: '2019-09-11T20:25:00',
			time: 1225,
			gmt: -3
		},
		baggage: 0,
		elapsedTime: 50,
		segments: [
			{
				aircraft: {
					code: 'E90',
					name: 'Embraer ERJ-190'
				},
				airline: {
					code: 'AR',
					name: 'Aerolineas Argentinas'
				},
				marketingAirline: {
					code: 'AR',
					name: 'Aerolineas Argentinas'
				},
				flightNumber: 'AR2701',
				cabin: {
					code: 'Y',
					name: 'Economy'
				},
				seatsRemaining: 8,
				marriageGrp: 'O',
				resBookDesigCode: 'R',
				departure: {
					date: '2019-09-11T19:35:00-0300',
					airport: {
						code: 'ROS',
						name: 'Fisherton',
						city: 'Rosario',
						country: 'AR',
						cityCode: 'ROS'
					}
				},
				arrival: {
					date: '2019-09-11T20:25:00-0300',
					airport: {
						code: 'AEP',
						name: 'Aeroparque Jorge Newbery',
						city: 'Buenos Aires',
						country: 'AR',
						cityCode: 'BUE'
					}
				},
				elapsedTime: 50,
				scaleTime: null,
				stops: []
			}
		],
		scalesTime: 0
	},
	origin: {
		code: 'AEP',
		name: 'Aeroparque Jorge Newbery',
		city: 'Buenos Aires',
		country: 'AR',
		cityCode: 'BUE'
	},
	destination: {
		code: 'ROS',
		name: 'Fisherton',
		city: 'Rosario',
		country: 'AR',
		cityCode: 'ROS'
	},
	airports: ['AEP', 'ROS'],
	aircrafts: ['E90'],
	airlines: ['AR'],
	seatsRemaining: 5,
	scales: 0,
	totalLength: 105,
	fare: {
		base: 2145,
		total: 2833,
		taxes: 537,
		breakdown: {
			adults: {
				count: 1,
				unitary: 2145,
				taxes: 537,
				total: 2145
			}
		},
		fee: 151
	},
	searchId: '89686740-87b2-11e9-ad93-b78653a463c6',
	altDates: false,
	id: 'bcb964fe-de9b-5068-bf8e-37cfa733d5b0',
	marketingAirline: {}
}

export default itinerary

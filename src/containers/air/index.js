import bfm from './bfm'
import reservation from './createPassenger'

var rest = require('../../utils/auth/rest')

var bargainFinderMaxActivity = ({
	origin,
	destination,
	departureDate,
	arrivalDate,
	baggage = false,
	cabin = 'Y',
	airline = 'AR'
}) => {
	console.log('BargainFinderMax')

	let query = {
		OTA_AirLowFareSearchRQ: {
			AvailableFlightsOnly: true,
			ResponseType: 'OTA',
			ResponseVersion: '4.3.0',
			Target: 'Production',
			POS: {
				Source: [
					{
						PseudoCityCode: 'J3UJ',
						RequestorID: {
							Type: '1',
							ID: '1',
							CompanyName: {}
						}
					}
				]
			},
			OriginDestinationInformation: [
				{
					RPH: '1',
					DepartureDateTime: '2019-09-23T00:00:00',
					OriginLocation: {
						LocationCode: 'MDZ'
					},
					DestinationLocation: {
						LocationCode: 'TUC'
					},
					TPA_Extensions: {}
				}
			],
			TravelPreferences: {},
			TravelerInfoSummary: {
				SeatsRequested: [1],
				AirTravelerAvail: [
					{
						PassengerTypeQuantity: [
							{
								Code: 'ADT',

								Quantity: 1,

								TPA_Extensions: {
									VoluntaryChanges: { Match: 'Info' }
								}
							}
						]
					}
				]
			},
			TPA_Extensions: {
				IntelliSellTransaction: {
					RequestType: {
						Name: '100ITINS'
					}
				}
			}
		}
	}

	var requestObject = {
		// service : "/v4.3.0/shop/flights?mode=live&enabletagging=true&limit=10&offset=1",
		// service : "/v4.3.0/shop/flights?mode=live&enabletagging=true",
		service: '/v4.3.0/shop/flights?mode=live',
		// query,
		query: {
			OTA_AirLowFareSearchRQ: {
				OriginDestinationInformation: [
					{
						TPA_Extensions: {
							Baggage: { FreePieceRequired: baggage },
							CabinPref: {
								// PremiumFirst P,
								// First F,
								// PremiumBusiness J,
								// Business C,
								// PremiumEconomy S,
								// Economy Y,
								// Y, S, C, J, F, P]
								Cabin: cabin
							},
							IncludeVendorPref: [{ Code: airline }]
						},
						DepartureDateTime: departureDate + 'T00:00:00',
						OriginLocation: {
							LocationCode: origin
						},
						DestinationLocation: {
							LocationCode: destination
						},
						RPH: '0'
					},
					{
						TPA_Extensions: {
							Baggage: { FreePieceRequired: baggage },
							CabinPref: {
								Cabin: cabin
							},
							IncludeVendorPref: [{ Code: airline }]
						},
						DepartureDateTime: arrivalDate + 'T00:00:00',
						OriginLocation: {
							LocationCode: destination
						},
						DestinationLocation: {
							LocationCode: origin
						},
						RPH: '1'
					}
				],
				POS: {
					Source: [
						{
							// "PseudoCityCode": "F9CE",
							PseudoCityCode: 'J3UJ',
							RequestorID: {
								CompanyName: {
									Code: 'TN'
								},
								ID: '1',
								Type: '1'
							}
						}
					]
				},
				Target: 'Production',
				AvailableFlightsOnly: true,
				TPA_Extensions: {
					IntelliSellTransaction: {
						RequestType: {
							// "Name": "200ITINS"
							Name: '50ITINS'
						}
					}
				},
				// "TravelPreferences": {
				//   "TPA_Extensions": {
				//     "NumTrips": {}
				//   }
				// },
				TravelerInfoSummary: {
					SeatsRequested: [1],
					AirTravelerAvail: [
						{
							PassengerTypeQuantity: [
								{
									Code: 'ADT',
									Quantity: 1
									// "TPA_Extensions": {
									//   "VoluntaryChanges": { "Match": 'Info' }
									// }
								}
							]
						}
					]
				},
				Version: '1'
			}
		}
	}

	return rest.post(requestObject)
}

var instaFlightActivity = function({ origin, destination, departureDate, arrivalDate }) {
	console.log('InstaFlight')

	var requestObject = {
		service: '/v2/shop/flights',
		query: {
			origin: origin,
			destination: destination,
			departuredate: departureDate,
			returndate: arrivalDate,
			pointofsalecountry: 'AR',
			// sortby: 'totalfare',
			// limit: 1,
			// offset: 1,
			order: 'asc'
		}
	}

	return rest.get(requestObject)
}

const leadPriceCalendarActivity = ({
	origin,
	destination,
	departureDate,
	lengthofstay = 5,
	pointofsalecountry = 'AR'
}) => {
	console.log('LeadPriceCalendar')

	var requestObject = {
		directUrl: null,
		service: '/v2/shop/flights/fares',
		query: {
			origin: origin,
			destination: destination,
			departuredate: departureDate,
			pointofsalecountry,
			lengthofstay
		}
	}

	return rest.get(requestObject)
}

var lcpPrice = item => {
	let LowestFare = item.FareInfo[0].LowestFare
	let LowestNonStopFare = item.FareInfo[0].LowestNonStopFare

	return {
		'Mas barato': {
			Tarifa: LowestFare.Fare,
			Aerolinea: LowestFare.AirlineCodes
		},
		'Sin escalas': {
			Tarifa: LowestNonStopFare.Fare,
			Aerolinea: LowestNonStopFare.AirlineCodes
		}
	}
}

var bfmPrice = data => {
	let prueba = data.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary.map(item => {
		return {
			sequence: item.SequenceNumber,
			aerolinea: item.AirItinerary.OriginDestinationOptions.OriginDestinationOption.map((item2, i) => {
				return item2.FlightSegment.map((item3, i3) => {
					return {
						DepartureDateTime: item3.DepartureDateTime,
						ArrivalDateTime: item3.ArrivalDateTime,
						DepartureairportCode: item3.DepartureAirport.LocationCode,
						ArrivalairportCode: item3.ArrivalAirport.LocationCode,
						airlineCode: item3.OperatingAirline.Code,
						flightNumber: item3.OperatingAirline.FlightNumber
					}
				})
			}),
			precio: item.AirItineraryPricingInfo.map((priceInfo, i) => {
				return {
					BaseFare: priceInfo.ItinTotalFare.BaseFare.Amount,
					BaseFareCurrency: priceInfo.ItinTotalFare.BaseFare.CurrencyCode,
					BaseFareArs: priceInfo.ItinTotalFare.EquivFare.Amount,
					TotalFareArs: priceInfo.ItinTotalFare.TotalFare.Amount,
					valijas: priceInfo.PTC_FareBreakdowns.PTC_FareBreakdown[0].PassengerFare.TPA_Extensions.BaggageInformationList.BaggageInformation.map(
						bag => {
							return {
								Pieces: bag.Allowance[0].Pieces
							}
						}
					)
				}
			})
		}
	})

	return prueba
}

const resultSearch = async data => {
	const { origin, destination, departureDate, arrivalDate, cabin, airline } = data
	const baggage = Boolean(parseInt(data.baggage))

  /*
	let lpc = await lcpPrice(
		leadPriceCalendarActivity({
			origin,
			destination,
			departureDate,
			lengthofstay: 5,
			pointofsalecountry: 'AR'
		})
	)
	let ifl = instaFlightActivity({
		origin,
		destination,
		departureDate,
		arrivalDate
	})
  */

	// let bfm = bfmPrice(
	// 	await bargainFinderMaxActivity({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage })
	// )
	// return JSON.stringify(bfm, "", 2)

  let prueba = await bfm({ origin, destination, departureDate, arrivalDate, cabin, airline, baggage })
	return prueba
}

const resultReservation = async data => {
  let prueba = await reservation()
	return prueba
}

const resultSearchXML = async data => {
  let prueba = await bfm()
	return prueba
}

export { 
  resultSearch as search, 
  resultSearchXML as searchXML,
  resultReservation as reservation 
}

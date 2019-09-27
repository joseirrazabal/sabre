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
			// service: '/v5.2.0/shop/altdates/flights?mode=live',
			service: '/v4.3.0/shop/calendar/flights',
			query: this.toBodyString()
		}

		let result = await rest.post(requestObject)

		console.log(JSON.stringify(result, '', 2))

		this.response = result
		return this.response
	}

	toBodyString() {
		let query = {
			OTA_AirLowFareSearchRQ: {
				AvailableFlightsOnly: true,
				Version: '5.2.0',
				POS: {
					Source: [
						{
							PseudoCityCode: this.pcc,
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
						DepartureDateTime: this.timeStampLeave + 'T00:00:00',
						OriginLocation: {
							LocationCode: this.fromAirportCode
						},
						DestinationLocation: {
							LocationCode: this.toAirportCode
						},
						TPA_Extensions: {
							SegmentType: {
								Code: 'O'
							}
						}
					},
					{
						RPH: '2',
						DepartureDateTime: this.timeStampReturn + 'T00:00:00',
						OriginLocation: {
							LocationCode: this.toAirportCode
						},
						DestinationLocation: {
							LocationCode: this.fromAirportCode
						},
						TPA_Extensions: {
							SegmentType: {
								Code: 'O'
							}
						}
					}
				],
				TravelPreferences: {
					CabinPref: [
						{
							Cabin: this.cabin,
							PreferLevel: 'Preferred'
						}
					],
					TPA_Extensions: {
						TripType: {
							Value: 'Return'
						},
						FlexibleFares: {
							FareParameters: [
								this.cabin !== 'Y'
									? {
											Cabin: {
												Type: this.cabin
											},
											XOFares: {
												Ind: true
											},
											PassengerTypeQuantity: [
												{
													Code: 'ITX',
													Quantity: 1,
													TPA_Extensions: {
														VoluntaryChanges: {
															Match: 'Info'
														}
													}
												}
											],
											Baggage: { FreePieceRequired: false }
									  }
									: ({
											Cabin: {
												Type: this.cabin
											},
											XOFares: {
												Ind: true
											},
											PassengerTypeQuantity: [
												{
													Code: 'ITX',
													Quantity: 1,
													TPA_Extensions: {
														VoluntaryChanges: {
															Match: 'Info'
														}
													}
												}
											],
											Baggage: { FreePieceRequired: false }
									  },
									  {
											Cabin: {
												Type: this.cabin
											},
											XOFares: {
												Ind: false
											},
											PassengerTypeQuantity: [
												{
													Code: 'ITX',
													Quantity: 1,
													TPA_Extensions: {
														VoluntaryChanges: {
															Match: 'Info'
														}
													}
												}
											],
											Baggage: { FreePieceRequired: true }
									  })
							]
						},
						DiversityParameters: {
							AdditionalNonStopsPercentage: 100
						}
					}
				},
				TravelerInfoSummary: {
					SeatsRequested: [1],
					AirTravelerAvail: [
						{
							PassengerTypeQuantity: [
								{
									Code: 'ADT',
									Quantity: 1,
									TPA_Extensions: {
										VoluntaryChanges: {
											Match: 'Info'
										}
									}
								}
							]
						}
					],
					PriceRequestInformation: {
						TPA_Extensions: {
							BrandedFareIndicators: {
								SingleBrandedFare: true,
								ReturnBrandAncillaries: true
							}
						}
					}
				},
				TPA_Extensions: {
					IntelliSellTransaction: {
						RequestType: {
							Name: '100ITINS'
						},
						CompressResponse: {
							Value: false
						},
						ResponseSorting: {
							SortFaresInsideItin: true
						}
					}
				}
			}
		}

		query = {
			OTA_AirLowFareSearchRQ: {
				AvailableFlightsOnly: true,
				ResponseVersion: '5.2.0',
				Version: '5.2.0',
				POS: {
					Source: [
						{
							PseudoCityCode: this.pcc,
							RequestorID: {
								Type: '1',
								ID: '1',
								CompanyName: {
									Code: 'TN',
									CodeContext: 'Context'
								}
							}
						}
					]
				},
				OriginDestinationInformation: [
					{
						RPH: '1',
						// DepartureDateTime: '2019-09-10T00:00:00',
						// DepartureDates: {
						// Day: [
						// 	{
						// 		Date: '2019-11-15'
						// 	},
						// 	{
						// 		Date: '2019-11-16'
						// 	},
						// 	{
						// 		Date: '2019-11-17'
						// 	},
						// 	{
						// 		Date: '2019-11-18'
						// 	},
						// 	{
						// 		Date: '2019-11-19'
						// 	},
						// 	{
						// 		Date: '2019-11-20'
						// 	},
						// 	{
						// 		Date: '2019-11-21'
						// 	},
						// 	{
						// 		Date: '2019-11-22'
						// 	},
						// 	{
						// 		Date: '2019-11-23'
						// 	}
						// ]
						// 	DaysRange: [
						// 		{
						// 			FromDate: '2019-11-15',
						// 			ToDate: '2019-11-23'
						// 		}
						// 	]
						// },
						DepartureDates: {
							DaysRange: [
								{
									FromDate: '2019-11-07',
									ToDate: '2019-12-07'
								}
							]
						},
						OriginLocation: {
							LocationCode: this.fromAirportCode
						},
						DestinationLocation: {
							LocationCode: this.toAirportCode
						}
					},
					{
						// DepartureDateTime: '2019-09-17T00:00:00',
						DepartureDates: {
							// LengthOfStayRange: [
							// 	{
							// 		MinDays: 5,
							// 		MaxDays: 5
							// 	}
							// ]
							LengthOfStay: [
								{
									Days: 5
								}
							]
							// Day: [
							// 	{
							// 		Date: '2019-09-10'
							// 	}
							// ]
							// DaysRange: [
							// 	{
							// 		FromDate: '2019-09-20',
							// 		ToDate: '2019-09-25'
							// 	}
							// ]
						},
						OriginLocation: {
							LocationCode: this.toAirportCode
						},
						DestinationLocation: {
							LocationCode: this.fromAirportCode
						}
					}
				],
				TravelPreferences: {
					ValidInterlineTicket: true,
					TPA_Extensions: {
						InterlineIndicator: {
							Ind: true
						}
					}
				},
				TravelerInfoSummary: {
					AirTravelerAvail: [
						{
							PassengerTypeQuantity: [
								{
									Code: 'ADT',
									Quantity: 1
								}
							]
						}
					]
				},
				TPA_Extensions: {
					IntelliSellTransaction: {
						RequestType: {
							Name: 'AD1'
						}
						// CompressResponse: {
						// 	Value: true
						// }
					}
				}
			}
		}

		return JSON.stringify(query)
	}
}

module.exports = BargainFinderMaxModel

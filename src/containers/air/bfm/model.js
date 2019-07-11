import rest from '../../../utils/auth/rest'

// PremiumFirst P,
// First F,
// PremiumBusiness J,
// Business C,
// PremiumEconomy S,
// Economy Y,

class BargainFinderMaxModel {
	constructor(params) {
		Object.assign(this, params)
	}

	get itineraries() {
		return this.response
	}

	async readRequest() {
		var requestObject = {
			service: '/v4.3.0/shop/flights?mode=live',
			query: this.toBodyString()
		}

		let result = await rest.post(requestObject)

		this.response = result
		return this.response
	}

	toBodyString() {
		let query = {
			OTA_AirLowFareSearchRQ: {
				AvailableFlightsOnly: true,
				ResponseType: 'OTA',
				ResponseVersion: '4.3.0',
				Target: 'Production',
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
							// Baggage: { FreePieceRequired: this.baggage },
							// CabinPref: {
							// 	Cabin: this.cabin
							// },
							// IncludeVendorPref: [{ Code: 'LA'}]
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

		return JSON.stringify(query)
	}
}

module.exports = BargainFinderMaxModel

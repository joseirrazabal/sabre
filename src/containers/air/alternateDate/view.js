import Datastore from 'nedb-async'

const db = new Datastore()
const dbOrigin = new Datastore()
const dbFinal = new Datastore()

const LOCAL_CURRENCY = {
	style: 'currency',
	currency: 'ARS'
}

var result = ''

class BargainFinderMaxView {
	constructor(searchModel) {
		this.searchModel = searchModel
		this.flightData = this.searchModel.itineraries
		result = ''
	}

	displaySearchCriteria() {
		result += `
      <div class="row">
		    <div class="col-md-12">
          >> ${this.searchModel.fromAirportCode} to ${this.searchModel.toAirportCode} <<
        </div>
      </div>
      `
	}

	displayNumberOfItineraries() {
		result += `
      <div class="row" style="margin-bottom: 20px">
		    <div class="col-md-12">
          ${this.flightData.groupedItineraryResponse.statistics.itineraryCount} itineraries found
        </div>
      </div>
      `
	}

	static displayItineraryListHeader() {
		result += `
      <div class="row">
		    <div class="col-md-3">
          Flight   
        </div>
		    <div class="col-md-2">
          Cities
        </div>
		    <div class="col-md-2">
          Departs
        </div>
		    <div class="col-md-3">
          Arrives
        </div>
		    <div class="col-md-2">
          Dur
        </div>
      </div>
    `
	}

	static displayItineraryPenalties(itinerary) {
		const penalties = {}

		itinerary.AirItineraryPricingInfo.forEach(pricing => {
			pricing.PTC_FareBreakdowns.PTC_FareBreakdown.forEach(breakDown => {
				breakDown.PassengerFare.PenaltiesInfo.Penalty.forEach(penalty => {
					if (!penalties[penalty.Type]) {
						penalties[penalty.Type] = {
							applicability: penalty.Applicability,
							changeable: penalty.Changeable,
							refundable: penalty.Refundable,
							amount: penalty.Amount
						}
					}
				})
			})
		})

		let exchangePenaltyNote = ''

		if (penalties.Exchange && penalties.Exchange.changeable) {
			exchangePenaltyNote = `Exchangeable for ${penalties.Exchange.amount.toLocaleString('en-us', LOCAL_CURRENCY)}`
		} else {
			exchangePenaltyNote = "Can't be exchanged"
		}

		let refundPenaltyNote = ''

		if (penalties.Refund && penalties.Refund.refundable) {
			refundPenaltyNote = 'Refundable'
		} else {
			refundPenaltyNote = "Can't be refunded"
		}

		return `Notes: ${exchangePenaltyNote}  ${refundPenaltyNote}`
	}

	static getItinerary(itinerary) {
		let prueba = itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption.map((option, i) => {
			return option.FlightSegment.map(segment => {
				return {
					airlineCode: segment.OperatingAirline.Code,
					airlineNumber: segment.OperatingAirline.FlightNumber.padEnd(4),
					airlineDeparture: segment.DepartureAirport.LocationCode,
					airlineArrival: segment.ArrivalAirport.LocationCode,
					airlineDepartureDate: segment.DepartureDateTime,
					airlineArrivalDate: segment.ArrivalDateTime
				}
			})
		})

		dbOrigin.ensureIndex({ fieldName: 'origin', unique: true }, function(err, num) {
			if (err) {
				// console.error(err)
				return false
			}
		})

		dbOrigin.insert({ origin: { ...prueba[0] } }, (err, record) => {
			if (err) {
				// console.error(err)
			}
		})

		let aPrice = []

		itinerary.AirItineraryPricingInfo.map((item, i) => {
			const fare = item.ItinTotalFare
			const TPA_Extensions = item.PTC_FareBreakdowns.PTC_FareBreakdown[0].PassengerFare.TPA_Extensions
			aPrice.push({
				Brand:
					TPA_Extensions.FareComponents &&
					TPA_Extensions.FareComponents.FareComponent &&
					TPA_Extensions.FareComponents.FareComponent[0].BrandName,
				Baggage: TPA_Extensions.BaggageInformationList.BaggageInformation[0].Allowance[0].Pieces,
				Cabin: item.FareInfos.FareInfo[0].TPA_Extensions.Cabin.Cabin,
				Fare: fare.EquivFare.Amount.toLocaleString('en-us', LOCAL_CURRENCY),
				Tax: fare.Taxes.Tax[0].Amount.toLocaleString('en-us', LOCAL_CURRENCY),
				TotalPrice: fare.TotalFare.Amount.toLocaleString('en-us', LOCAL_CURRENCY)
			})
		})

		itinerary.TPA_Extensions.AdditionalFares &&
			itinerary.TPA_Extensions.AdditionalFares.map(additional => {
				const fare = additional.AirItineraryPricingInfo.ItinTotalFare
				const TPA_Extensions =
					additional.AirItineraryPricingInfo.PTC_FareBreakdowns.PTC_FareBreakdown[0].PassengerFare.TPA_Extensions
				if (fare) {
					aPrice.push({
						Brand:
							TPA_Extensions.FareComponents &&
							TPA_Extensions.FareComponents.FareComponent &&
							TPA_Extensions.FareComponents.FareComponent[0].BrandName,
						Baggage: TPA_Extensions.BaggageInformationList.BaggageInformation[0].Allowance[0].Pieces,
						Cabin: additional.AirItineraryPricingInfo.FareInfos.FareInfo[0].TPA_Extensions.Cabin.Cabin,
						Fare: fare.EquivFare.Amount.toLocaleString('en-us', LOCAL_CURRENCY),
						Tax: fare.Taxes.Tax[0].Amount.toLocaleString('en-us', LOCAL_CURRENCY),
						TotalPrice: fare.TotalFare.Amount.toLocaleString('en-us', LOCAL_CURRENCY)
					})
				}
			})

		let result = []
		aPrice.map(fare => {
			result.push({ origin: { ...prueba[0] }, destination: { ...prueba[1] }, ...fare })
		})

		db.insert(result, (err, record) => {
			if (err) {
				console.error(err)
			}
		})
	}

	static displayItinerary(itinerary) {
		let result = ''
		itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption.forEach(option => {
			result += `<div style="margin-bottom: 10px">`
			option.FlightSegment.forEach(segment => {
				result += `
          <div class="row" style="margin-bottom: 2px">
		        <div class="col-md-3">
              ${segment.OperatingAirline.Code} 
              ${segment.OperatingAirline.FlightNumber.padEnd(4)}
            </div>
            <div class="col-md-2">
              ${segment.DepartureAirport.LocationCode} 
            </div>
            <div class="col-md-2">
              ${segment.ArrivalAirport.LocationCode}  
            </div>
            <div class="col-md-3">
              ${segment.DepartureDateTime}  
              ${segment.ArrivalDateTime}            
            </div>
            <div class="col-md-2">
              ${segment.ElapsedTime.toString().padEnd(4)}
            </div>
          </div>
        `
			})
			result += `</div>`
		})

		return result
	}

	static displayFaresHtml(fare, TPA_Extensions, AirItineraryPricingInfo) {
		let result = `
				<div class="row">
					<div class="col-md-2">
            Brand: ${TPA_Extensions.FareComponents &&
							TPA_Extensions.FareComponents.FareComponent &&
							JSON.stringify(
								TPA_Extensions.FareComponents.FareComponent.map(item => {
									return { id: item.BrandID, name: item.BrandName }
								})
							)}
					</div>
					<div class="col-md-2">
            Baggage: ${JSON.stringify(
							TPA_Extensions.BaggageInformationList.BaggageInformation.map(item => {
								return item.Allowance
							})
						)}
					</div>
					<div class="col-md-2">
            Cabin: ${JSON.stringify(
							AirItineraryPricingInfo.FareInfos.FareInfo.map(item => {
								return item.TPA_Extensions.Cabin.Cabin
							})
						)}
          </div>
					<div class="col-md-2">
            Fare: ${fare.EquivFare.Amount.toLocaleString('en-us', LOCAL_CURRENCY)}
          </div>
					<div class="col-md-2">
            Tax: ${fare.Taxes.Tax[0].Amount.toLocaleString('en-us', LOCAL_CURRENCY)}
          </div>
					<div class="col-md-2">
						Total Price: ${fare.TotalFare.Amount.toLocaleString('en-us', LOCAL_CURRENCY)}
					</div>
				</div>
			`
		return result
	}

	static displayFares(itinerary) {
		let returnAdditional = true
		let result = ''

		itinerary.AirItineraryPricingInfo.map((item, i) => {
			const TPA_Extensions = item.PTC_FareBreakdowns.PTC_FareBreakdown[0].PassengerFare.TPA_Extensions
			returnAdditional = !Boolean(
				parseInt(TPA_Extensions.BaggageInformationList.BaggageInformation[0].Allowance[0].Pieces)
			)

			result += BargainFinderMaxView.displayFaresHtml(item.ItinTotalFare, TPA_Extensions, item)
		})

		if (returnAdditional) {
			itinerary.TPA_Extensions.AdditionalFares &&
				itinerary.TPA_Extensions.AdditionalFares.map(additional => {
					const item = additional.AirItineraryPricingInfo
					const TPA_Extensions = item.PTC_FareBreakdowns.PTC_FareBreakdown[0].PassengerFare.TPA_Extensions
					if (item.ItinTotalFare) {
						result += BargainFinderMaxView.displayFaresHtml(item.ItinTotalFare, TPA_Extensions, item)
					}
				})
		}

		return result
	}

	async displayItineraries() {
		BargainFinderMaxView.displayItineraryListHeader()

		this.flightData.groupedItineraryResponse.itineraryGroups.forEach(item => {
			result += `<div>
        ${JSON.stringify(item.groupDescription.legDescriptions, null, 2)}
        </div>
      `
			item.itineraries.forEach(iti => {
				result += `<div>
          ${iti.pricingInformation[0].fare.totalFare.totalPrice}
      </div>`
			})
		})

		const itineraries = this.flightData.groupedItineraryResponse.scheduleDescs
		itineraries.forEach((itinerary, index) => {
			result += `
        <div style="margin-bottom: 20px; border: 1px solid red;">
          <div>
  			    Id: ${itinerary.id}
          </div>
          <div>
  			    Freq: ${itinerary.frequency}
          </div>
          <div>
  			    StopCount: ${itinerary.stopCount}
          </div>
          <div>
  			    eTicketable: ${itinerary.eTicketable}
          </div>
          <div>
  			    totalMilesFlown: ${itinerary.totalMilesFlown}
          </div>
          <div>
  			    DepAirport: ${itinerary.departure.airport}
          </div>
          <div>
  			    DepCity: ${itinerary.departure.city}
          </div>
          <div>
  			    DepCountry: ${itinerary.departure.country}
          </div>
          <div>
  			    DepTime: ${itinerary.departure.time}
          </div>
          <div>
  			    ArrAirport: ${itinerary.arrival.airport}
          </div>
          <div>
  			    ArrCity: ${itinerary.arrival.city}
          </div>
          <div>
  			    ArrCountry: ${itinerary.arrival.country}
          </div>
          <div>
  			    ArrTime: ${itinerary.arrival.time}
          </div>
          <div>
  			    Mark: ${itinerary.carrier.marketing}
          </div>
          <div>
  			    FlightMarkNumber: ${itinerary.carrier.marketingFlightNumber}
          </div>
          <div>
  			    CarrOperating: ${itinerary.carrier.operating}
          </div>
          <div>
  			    CarrOpeFlightNumber: ${itinerary.carrier.operatingFlighNumber}
          </div>
          <div>
  			    CarriEquiCode: ${(itinerary.carrier.equipament && itinerary.carrier.equipament.code) || ''}
          </div>
          <div>
  			    CarriEquiTypeFirst: ${(itinerary.carrier.equipament && itinerary.carrier.equipament.typeForFirstLeg) || ''}
          </div>
          <div>
  			    CarriEquiTypeLast: ${(itinerary.carrier.equipament && itinerary.carrier.equipament.typeForLastLeg) || ''}
          </div>
			  </div>`
		})
	}

	render = async () => {
		this.displaySearchCriteria()
		this.displayNumberOfItineraries()
		this.displayItineraries()
		return await result
	}
}

export default BargainFinderMaxView

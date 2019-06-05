import get from 'lodash/get'

const airline = ({ segments }) => get(segments, '0.airline.code')

const departureDate = ({ segments }) => {
    const date = get(segments, '0.departure.date')
    return new Date(date).toLocaleDateString()
}
const departureTime = ({ segments }) => {
    const date = get(segments, '0.departure.date')
    return new Date(date).toLocaleTimeString()
}

const originAirport = ({ segments }) => get(segments, '0.departure.airport.code')

const destinationAirport = ({ segments }) => get(segments, `${segments.length - 1}.arrival.airport.code`)
const arrivalTime = ({ segments }) => {
    const date = get(segments, `${segments.length - 1}.arrival.date`)
    return new Date(date).toLocaleTimeString()
}

const duration = ({ segments }) => '123'
const scales = ({ segments }) => segments.length === 2 ? '' : (segments.length === 3 ? `- 1 escala -` : `- ${segments.length} escalas -`)
export default (trip, dir) => `

<div id="DIV_1" style='box-sizing: border-box;
    height: 103px;

    perspective-origin: 379.906px 51.5px;
    transform-origin: 379.906px 51.5px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
	<div id="DIV_2" style='bottom: 0px;
    box-sizing: border-box;
    display: flex;
    height: 38px;
    left: 0px;
    position: relative;
    right: 0px;
    top: 0px;
  
    align-items: center;
    justify-content: space-between;
    perspective-origin: 379.906px 19px;
    transform-origin: 379.906px 19px;
    background: rgb(128, 128, 128) none repeat scroll 0% 0% / auto padding-box border-box;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    padding: 5px 10px;'>
		<div id="DIV_3" style='box-sizing: border-box;
    height: 20px;
    min-height: auto;
    min-width: auto;
    width: 695.828px;
    perspective-origin: 347.906px 10px;
    transform-origin: 347.906px 10px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
			<p id="P_4" style="box-sizing: border-box;
    color: rgb(255, 255, 255);
    height: 20px;
    text-align: left;
    text-decoration: none solid rgb(255, 255, 255);
    width: 695.828px;
    column-rule-color: rgb(255, 255, 255);
    perspective-origin: 347.906px 10px;
    transform-origin: 347.906px 10px;
    caret-color: rgb(255, 255, 255);
    border: 0px none rgb(255, 255, 255);
    font: italic normal 400 normal 11px / 20px Roboto, sans-serif;
    margin: 0px;
    outline: rgb(255, 255, 255) none 0px;">
				<span id="SPAN_5" style="box-sizing: border-box;
    color: rgb(255, 255, 255);
    text-align: left;
    text-decoration: none solid rgb(255, 255, 255);
    column-rule-color: rgb(255, 255, 255);
    perspective-origin: 0px 0px;
    transform-origin: 0px 0px;
    caret-color: rgb(255, 255, 255);
    border: 0px none rgb(255, 255, 255);
    font: italic normal 400 normal 11px / 20px Roboto, sans-serif;
    outline: rgb(255, 255, 255) none 0px;"><strong id="STRONG_6" style="box-sizing: border-box;
    color: rgb(255, 255, 255);
    text-align: left;
    text-decoration: none solid rgb(255, 255, 255);
    column-rule-color: rgb(255, 255, 255);
    perspective-origin: 0px 0px;
    transform-origin: 0px 0px;
    caret-color: rgb(255, 255, 255);
    border: 0px none rgb(255, 255, 255);
    font: italic normal 700 normal 11px / 20px Roboto, sans-serif;
    outline: rgb(255, 255, 255) none 0px;">${dir}</strong> - ${departureDate(trip)}</span>
			</p>
		</div>
		<div id="DIV_7" style='box-sizing: border-box;
    display: flex;
    height: 28px;
    min-height: auto;
    min-width: auto;
    width: 44px;
    align-items: flex-end;
    perspective-origin: 22px 14px;
    transform-origin: 22px 14px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
			<div id="DIV_8" style='box-sizing: border-box;
    height: 20px;
    min-height: auto;
    min-width: auto;
    width: 24px;
    perspective-origin: 12px 10px;
    transform-origin: 12px 10px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
				<div id="DIV_9" style='background-position: 50% 50%;
    box-sizing: border-box;
    height: 20px;
    width: 24px;
    perspective-origin: 12px 10px;
    transform-origin: 12px 10px;
    background: rgba(0, 0, 0, 0) url("http://localhost:8080/images/bag_small_active.7e1228269a03333e00c0525cb655e9c4.png") no-repeat scroll 50% 50% / 20px padding-box border-box;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
				</div>
			</div>
			<div id="DIV_10" style='box-sizing: border-box;
    height: 28px;
    min-height: auto;
    min-width: auto;
    width: 20px;
    perspective-origin: 10px 14px;
    transform-origin: 10px 14px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
				<div id="DIV_11" style='background-position: 50% 50%;
    box-sizing: border-box;
    height: 28px;
    width: 20px;
    perspective-origin: 10px 14px;
    transform-origin: 10px 14px;
    background: rgba(0, 0, 0, 0) url("http://localhost:8080/images/bag_big_active.309af8fb6beba24ae54cc6b8ef681511.png") no-repeat scroll 50% 50% / 17px padding-box border-box;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
				</div>
			</div>
		</div>
	</div>
	<div id="DIV_12" style='bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;
    box-sizing: border-box;
    height: 65px;
    left: 0px;
    position: relative;
    right: 0px;
    top: 0px;
    perspective-origin: 379.906px 32.5px;
    transform-origin: 379.906px 32.5px;
    background: rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box;
    border-radius: 0 0 6px 6px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    transition: margin 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;'>
		<div id="DIV_13" style='bottom: 0px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 65px;
    left: 0px;
    min-height: 48px;
    position: relative;
    right: 0px;
    top: 0px;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    perspective-origin: 379.906px 32.5px;
    transform-origin: 379.906px 32.5px;
    user-select: none;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    transition: min-height 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;'>
			<div id="DIV_14" style='box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 41px;
    min-height: auto;
    min-width: auto;
    perspective-origin: 379.906px 20.5px;
    transform-origin: 379.906px 20.5px;
    user-select: none;
    flex: 1 1 auto;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    margin: 12px 0px;
    transition: margin 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;'>
				<div id="DIV_15" style='box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 41px;
    min-height: auto;
    min-width: auto;
    perspective-origin: 379.906px 20.5px;
    transform-origin: 379.906px 20.5px;
    user-select: none;
    flex-flow: row wrap;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    padding: 0px 60px 0px 10px;'>
					<div id="DIV_16" style='box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 24px;
    max-width: 20.6667%;
    min-height: auto;
    min-width: auto;
    align-items: center;
    align-self: center;
    justify-content: center;
    perspective-origin: 57.4844px 12px;
    transform-origin: 57.4844px 12px;
    user-select: none;
    flex: 0 1 16.6667%;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
						<div id="DIV_17" style='box-sizing: border-box;
    cursor: pointer;
    height: 24px;
    min-height: auto;
    min-width: auto;
    width: 20px;
    perspective-origin: 10px 12px;
    transform-origin: 10px 12px;
    user-select: none;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
							<img src="http://prod-upate.s3.amazonaws.com/images/airlines/iso/${airline(trip)}.png" id="IMG_18" alt="" style='box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    width: 20px;
    perspective-origin: 10px 10px;
    transform-origin: 10px 10px;
    user-select: none;
    border-radius: 6px 6px 6px 6px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
</div>
					</div>
					<div id="DIV_19" style='box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 41px;
    max-width: 66.6667%;
    min-height: auto;
    min-width: auto;
    width: 459.875px;
    perspective-origin: 229.938px 20.5px;
    transform-origin: 229.938px 20.5px;
    user-select: none;
    flex: 0 1 66.6667%;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    margin: 0px 57.4844px;'>
						<div id="DIV_20" style='box-sizing: border-box;
    cursor: pointer;
    height: 41px;
    min-height: auto;
    min-width: auto;
    width: 24.8906px;
    perspective-origin: 12.4375px 20.5px;
    transform-origin: 12.4375px 20.5px;
    user-select: none;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
							<p id="P_21" style="box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    text-align: center;
    width: 24.8906px;
    perspective-origin: 12.4375px 10px;
    transform-origin: 12.4375px 10px;
    user-select: none;
    font: normal normal 400 normal 12px / 20px Roboto, sans-serif;
    margin: 0px;">
								${originAirport(trip)}
							</p>
							<p id="P_22" style="box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    text-align: center;
    width: 24.8906px;
    perspective-origin: 12.4375px 10px;
    transform-origin: 12.4375px 10px;
    user-select: none;
    font: normal normal 400 normal 10px / 20px Roboto, sans-serif;
    margin: 0px;">
								</p>
<div id="DIV_23" style="box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 20px;
    text-align: center;
    width: 24.8906px;
    perspective-origin: 12.4375px 10px;
    transform-origin: 12.4375px 10px;
    user-select: none;
    font: normal normal 400 normal 10px / 20px Roboto, sans-serif;">
									<span id="SPAN_24" style="box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 20px;
    min-height: auto;
    min-width: auto;
    text-align: center;
    width: 24.8906px;
    perspective-origin: 12.4375px 10px;
    transform-origin: 12.4375px 10px;
    user-select: none;
    font: normal normal 400 normal 10px / 20px Roboto, sans-serif;">${departureTime(trip)}</span><i id="I_25" style="box-sizing: border-box;
    color: rgb(255, 77, 77);
    cursor: pointer;
    display: block;
    height: 20px;
    min-height: auto;
    min-width: auto;
    text-align: center;
    text-decoration: none solid rgb(255, 77, 77);
    width: 0px;
    column-rule-color: rgb(255, 77, 77);
    perspective-origin: 0px 10px;
    transform-origin: 0px 10px;
    user-select: none;
    caret-color: rgb(255, 77, 77);
    border: 0px none rgb(255, 77, 77);
    font: italic normal 900 normal 9px / 20px Roboto, sans-serif;
    outline: rgb(255, 77, 77) none 0px;"></i>
								</div>
 
						</div>
						<div id="DIV_26" style='box-sizing: border-box;
    cursor: pointer;
    height: 41px;
    min-height: 40px;
    min-width: auto;
    width: 400.016px;
    perspective-origin: 200px 20.5px;
    transform-origin: 200px 20.5px;
    user-select: none;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    padding: 0px 10px;'>
							<p id="P_27" style="bottom: 10px;
    box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    left: 0px;
    position: relative;
    right: 0px;
    text-align: center;
    top: -10px;
    width: 380.016px;
    perspective-origin: 190px 10px;
    transform-origin: 190px 10px;
    user-select: none;
    font: italic normal 700 normal 11px / 20px Roboto, sans-serif;
    margin: 0px;">
								${scales(trip)}
							</p>
							<div id="DIV_28" style='bottom: 0px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 1px;
    left: 0px;
    position: relative;
    right: 0px;
    top: 0px;
    width: 380.016px;
    align-items: center;
    justify-content: space-around;
    perspective-origin: 190px 0.5px;
    transform-origin: 190px 0.5px;
    user-select: none;
    background: rgb(255, 77, 77) none repeat scroll 0% 0% / auto padding-box border-box;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
							</div>
							<p id="P_29" style="box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    text-align: center;
    width: 380.016px;
    perspective-origin: 190px 10px;
    transform-origin: 190px 10px;
    user-select: none;
    font: normal normal 400 normal 11px / 20px Roboto, sans-serif;
    margin: 0px;">
								${duration(trip)}
							</p>
						</div>
						<div id="DIV_30" style='box-sizing: border-box;
    cursor: pointer;
    height: 41px;
    min-height: auto;
    min-width: auto;
    width: 34.9688px;
    perspective-origin: 17.4844px 20.5px;
    transform-origin: 17.4844px 20.5px;
    user-select: none;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
							<p id="P_31" style="box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    text-align: center;
    width: 34.9688px;
    perspective-origin: 17.4844px 10px;
    transform-origin: 17.4844px 10px;
    user-select: none;
    font: normal normal 400 normal 12px / 20px Roboto, sans-serif;
    margin: 0px;">
								${destinationAirport(trip)}
							</p>
							<p id="P_32" style="box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    text-align: center;
    width: 34.9688px;
    perspective-origin: 17.4844px 10px;
    transform-origin: 17.4844px 10px;
    user-select: none;
    font: normal normal 400 normal 10px / 20px Roboto, sans-serif;
    margin: 0px;">
								</p>
<div id="DIV_33" style="box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 20px;
    text-align: center;
    width: 34.9688px;
    perspective-origin: 17.4844px 10px;
    transform-origin: 17.4844px 10px;
    user-select: none;
    font: normal normal 400 normal 10px / 20px Roboto, sans-serif;">
									<span id="SPAN_34" style="box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 20px;
    min-height: auto;
    min-width: auto;
    text-align: center;
    width: 24.8906px;
    perspective-origin: 12.4375px 10px;
    transform-origin: 12.4375px 10px;
    user-select: none;
    font: normal normal 400 normal 10px / 20px Roboto, sans-serif;">${arrivalTime(trip)}</span> <i id="I_35" style="box-sizing: border-box;
    color: rgb(255, 77, 77);
    cursor: pointer;
    display: block;
    height: 20px;
    min-height: auto;
    min-width: auto;
    text-align: center;
    text-decoration: none solid rgb(255, 77, 77);
    width: 10.0781px;
    column-rule-color: rgb(255, 77, 77);
    perspective-origin: 5.03125px 10px;
    transform-origin: 5.03125px 10px;
    user-select: none;
    caret-color: rgb(255, 77, 77);
    border: 0px none rgb(255, 77, 77);
    font: italic normal 900 normal 9px / 20px Roboto, sans-serif;
    outline: rgb(255, 77, 77) none 0px;">+1</i>
								</div>
 
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="DIV_36" style='box-sizing: border-box;
    height: 0px;
    perspective-origin: 379.906px 0px;
    transform-origin: 379.906px 0px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    overflow: hidden;
    transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;'>
			<div id="DIV_37" style='box-sizing: border-box;
    display: flex;
    height: 1px;
    perspective-origin: 379.906px 0.5px;
    transform-origin: 379.906px 0.5px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
				<div id="DIV_38" style='box-sizing: border-box;
    height: 1px;
    min-height: auto;
    min-width: auto;
    perspective-origin: 379.906px 0.5px;
    transform-origin: 379.906px 0.5px;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";'>
					<hr id="HR_39" style='box-sizing: border-box;
    height: 1px;
    perspective-origin: 379.906px 0.5px;
    transform-origin: 379.906px 0.5px;
    background: rgba(0, 0, 0, 0.12) none repeat scroll 0% 0% / auto padding-box border-box;
    border: 0px none rgb(0, 0, 0);
    flex: 0 0 auto;
    font: normal normal 400 normal 16px / normal "Roboto, sans-serif";
    margin: 0px;'>
</div>
			</div>
		</div>
	</div>
</div>
`
import PNRModel from './model'
import PNRView from './view'

import config from '../../../config'

function CreatePNR() {
	const pnrCreator = new PNRModel({
		pcc: config.air.group
	})

	return pnrCreator.create().then(async () => {
		const pnrViewer = new PNRView(pnrCreator)
		return await pnrViewer.render()
	})
}

export default CreatePNR

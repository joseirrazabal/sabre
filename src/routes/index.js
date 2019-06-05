import express from 'express'

import itinerary from './json/itinerary'
import booking from './json/booking'

import trip from './trip'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { page: 'Home', menuId: 'home' })
})

function getResult() {
	const { status, bookingId, product, contactData, transaction, messages } = booking

	const result = {
		booking: { bookingId, status },
		product: { productId: product.productId, status: product.status, code: product.code },
		passengers: product.passengers,
		contactData,
		transaction: transaction && {
			transactionId: transaction.transactionId,
			paymentId: transaction.paymentId,
			amount: transaction.amount,
			currency: transaction.currency,
			status: transaction.status,
			desc: transaction.desc
		},
		messages
	}

	return result
}

router.get('/air', function(req, res, next) {
	const { product, passengers, contactData, transaction, messages } = getResult()

	const data = {
		trip: {
			ida: `${trip(itinerary.going, 'IDA')}`,
			vuelta: `${trip(itinerary.return, 'VUELTA')}`
		},
		air: {
			...itinerary
		},
		transaction,
		contactData,
		passengers,
		reservationCode: product.code,
		messages: messages
	}

	res.render('air', { data })
})

router.get('/contact', function(req, res, next) {
	res.render('contact', { page: 'Contact Us', menuId: 'contact' })
})

export default router

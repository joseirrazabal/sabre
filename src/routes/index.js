import express from 'express'
import { search, reservation }from '../containers/air/'

import itinerary from './json/itinerary'
import booking from './json/booking'

import trip from './trip'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.render('index', { page: 'Home', menuId: 'home' })

  res.render('prueba', { page: 'Contact Us', menuId: 'contact' })
})

router.post('/', async function(req, res, next) {
  let result = await search(req.body) 

	res.end(result)
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

  res.render('emails/air', { data })
})

router.get('/contact', function(req, res, next) {
	res.render('contact', { page: 'Contact Us', menuId: 'contact' })
})

router.get('/air/search', function(req, res, next) {
  res.render('prueba', { page: 'Contact Us', menuId: 'contact' })
})

router.post('/air/search', async function(req, res, next) {
  let result = await search(req.body) 

	res.end(result)
})

router.post('/air/reservation', async function(req, res, next) {
  let result = await reservation(req.body) 

	res.end(result)
})

// router.get('/', function(req, res, next) {
// router.get('*', function(req, res, next) {
// 	res.render('aleani', { query: req.params && req.params['0'], time: process.env.TIMEOUT })
// })

export default router

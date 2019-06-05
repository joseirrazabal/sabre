const booking = {
	bookingId: '8eda7240-87b2-11e9-8a63-e7ea3d60a81f',
	status: 'DRAFT',
	remainingTime: 12522866,
	date: '2019-06-05T19:54:19.000Z',
	fare: 2833,
	contactData: {
		email: 'jose.irrazabal@upate.com',
		phone: '123',
		secondary_phone: null
	},
	product: {
		bookingId: '8eda7240-87b2-11e9-8a63-e7ea3d60a81f',
		status: 'SUCCESS',
		code: 'KCXQEE',
		type: 'AIR',
		productId: 'bcb964fe-de9b-5068-bf8e-37cfa733d5b0',
		passengers: [
			{
				number: 1,
				firstName: 'ramiro',
				lastName: 'salazar',
				birthdate: '1999-01-02',
				idType: 'NI',
				idNumber: '29875456',
				residence: 'AR',
				gender: 'M',
				phone: '',
				email: '',
				type: 'ADT'
			}
		],
		breakdown: [
			{
				type: 'ADT',
				amount: 2145,
				currency: 'ARS',
				quantity: 1,
				subtotal: 2145
			},
			{
				type: 'FEE',
				amount: 151,
				currency: 'ARS',
				quantity: 1,
				subtotal: 151
			},
			{
				type: 'TAXES',
				amount: 537,
				currency: 'ARS',
				quantity: 1,
				subtotal: 537
			}
		],
		message: null
	},
	products: [
		{
			bookingId: '8eda7240-87b2-11e9-8a63-e7ea3d60a81f',
			status: 'DRAFT',
			code: null,
			type: 'AIR',
			productId: 'bcb964fe-de9b-5068-bf8e-37cfa733d5b0',
			passengers: [
				{
					number: 1,
					firstName: 'ramiro',
					lastName: 'salazar',
					birthdate: '1999-01-02',
					idType: 'NI',
					idNumber: '29875456',
					residence: 'AR',
					gender: 'M',
					phone: '',
					email: '',
					type: 'ADT'
				}
			],
			breakdown: [
				{
					type: 'ADT',
					amount: 2145,
					currency: 'ARS',
					quantity: 1,
					subtotal: 2145
				},
				{
					type: 'FEE',
					amount: 151,
					currency: 'ARS',
					quantity: 1,
					subtotal: 151
				},
				{
					type: 'TAXES',
					amount: 537,
					currency: 'ARS',
					quantity: 1,
					subtotal: 537
				}
			]
		}
	],
	transaction: {
		paymentId: '7656420',
		bookingId: '8eda7240-87b2-11e9-8a63-e7ea3d60a81f',
		transactionId: 'UPT1559753742152',
		amount: 283300,
		currency: 'ars',
		status: 'SUCCESS',
		reservationCode: 'KCXQEE'
	},
	messages: {
		status: 'SUCCESS',
		message: '¡Todo listo! Armá las valijas',
		message2: 'Tu compra fue exitosa.',
		message3: '',
		code: 'KCXQEE',
		color: '#25CC0A',
		image: 'success'
	}
}

export default booking

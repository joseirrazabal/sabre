import dotenv from 'dotenv'

dotenv.config()

const config = {
	host: process.env.GRAPHQL_HOST,
	port: process.env.GRAPHQL_PORT,
	mongo: {
		url: process.env.MONGO_URL
	},
	products: process.env.PRODUCTS || '',
	air: {
    endpoint: { 
      rest: 'https://api.havail.sabre.com', 
      // xml: 'https://webservices.havail.sabre.com' 
      // rest: 'https://api.test.sabre.com', 
      xml: 'https://sws-crt.cert.havail.sabre.com' 
    },
		userId: '',
		group: '',
		domain: '',
		clientSecret: '',
		formatVersion: 'V1',
		timeout: 25000
	}
}

export default config

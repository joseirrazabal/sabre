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
      rest: process.env.SABRE_ENV === 'production' 
        ? 'https://api.havail.sabre.com' 
        : 'https://api.test.sabre.com',
			xml:
				process.env.SABRE_ENV === 'production'
					? 'https://webservices.havail.sabre.com'
					: 'https://sws-crt.cert.havail.sabre.com'
		},
		userId: process.env.SABRE_USER,
		clientSecret: process.env.SABRE_SECRET,
		group: process.env.SABRE_GROUP,
		domain: process.env.SABRE_DOMAIN,
		formatVersion: 'V1',
		timeout: process.env.TIMEOUT
	}
}

export default config

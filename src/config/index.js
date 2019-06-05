import dotenv from 'dotenv'

dotenv.config()

const config = {
  host: process.env.GRAPHQL_HOST,
  port: process.env.GRAPHQL_PORT,
	mongo: {
		url: process.env.MONGO_URL
	},
	products: process.env.PRODUCTS || ''
}

export default config

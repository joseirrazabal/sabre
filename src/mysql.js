// import mysql from 'mysql'
import mysql from 'promise-mysql'
import util from 'util'

const dbConfig = {
	host: 'mysql.dev.upate.com',
	user: 'user',
	password: 'upate_dev',
	database: 'development',
	connectionLimit: 10
}

// module.exports = pool
module.exports = async () => {
	try {
		let pool
		let con
		if (pool) {
			con = pool.getConnection()
		} else {
			pool = await mysql.createPool(dbConfig)
			con = pool.getConnection()
		}
		return con
	} catch (ex) {
		throw ex
	}
}

import axios from 'axios'
import cheerio from 'cheerio'
import dbConnection from './mysql'
import mysql from 'promise-mysql'

const scriptSql = [
	`DROP TABLE installment`,
	`DROP TABLE provider`,
	`DROP TABLE card_bin`,
	`DROP TABLE card`,
	`DROP TABLE credit_cart_type `,
	`DROP TABLE bank`,
	`
	CREATE TABLE IF NOT EXISTS bank (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		name VARCHAR(80) NULL,
		code VARCHAR(5) NULL,
		active TINYINT NULL,
		PRIMARY KEY (id),
		UNIQUE INDEX id_UNIQUE (id ASC),
		UNIQUE INDEX code_UNIQUE (code ASC));
	`,
	`CREATE TABLE IF NOT EXISTS credit_cart_type (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		name VARCHAR(45) NOT NULL,
		code VARCHAR(45) NOT NULL,
		PRIMARY KEY (id),
		UNIQUE INDEX id_UNIQUE (id ASC),
		UNIQUE INDEX code_UNIQUE (code ASC));
	`,
	`CREATE TABLE IF NOT EXISTS card (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		name VARCHAR(45) NOT NULL,
		code_decidir TINYINT(3) UNSIGNED NULL,
		pan VARCHAR(10) NULL,
		cvv TINYINT(1) UNSIGNED NULL,
		type_id INT UNSIGNED NOT NULL,
		active TINYINT(1) UNSIGNED NULL,
		PRIMARY KEY (id),
		UNIQUE INDEX id_UNIQUE (id ASC),
		INDEX fk_card_1_idx (type_id ASC),
		CONSTRAINT fk__card_1
			FOREIGN KEY (type_id)
			REFERENCES credit_cart_type (id)
			ON DELETE NO ACTION
			ON UPDATE NO ACTION);
		`,
	`
  CREATE TABLE IF NOT EXISTS card_bin (
		id int(11) NOT NULL AUTO_INCREMENT,
		bank_id int(10) unsigned NOT NULL,
		card_id int(10) unsigned,
		code int(10) unsigned NOT NULL,
		PRIMARY KEY (id),
		UNIQUE KEY id_UNIQUE (id),
		UNIQUE KEY code_UNIQUE (code),
		KEY fk_card_bin_1_idx (bank_id),
		KEY fk_card_bin_2_idx (card_id),
		CONSTRAINT fk_card_bin_1 FOREIGN KEY (bank_id) REFERENCES bank (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
		CONSTRAINT fk_card_bin_2 FOREIGN KEY (card_id) REFERENCES card (id) ON DELETE NO ACTION ON UPDATE NO ACTION
	)
	`,
	`CREATE TABLE IF NOT EXISTS provider (
		id INT UNSIGNED NOT NULL,
		name VARCHAR(45) NULL,
		code VARCHAR(45) NULL,
		PRIMARY KEY (id),
		UNIQUE INDEX id_UNIQUE (id ASC),
		UNIQUE INDEX code_UNIQUE (code ASC));
  `,
	`CREATE TABLE IF NOT EXISTS installment (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		provider_id INT UNSIGNED NULL,
		bank_id INT UNSIGNED NULL,
		card_id INT UNSIGNED NULL,
		installment INT(1) UNSIGNED NOT NULL,
		cft DECIMAL(10,2) UNSIGNED NULL,
		tea DECIMAL(10,2) UNSIGNED NULL,
		interest DECIMAL(10,2) UNSIGNED NULL,
		date_from DATETIME NULL,
		date_to DATETIME NULL,
		PRIMARY KEY (id),
		UNIQUE INDEX id_UNIQUE (id ASC),
		INDEX fk_installment_1_idx (provider_id ASC),
		INDEX fk_installment_2_idx (bank_id ASC),
		INDEX fk_installment_3_idx (card_id ASC),
		CONSTRAINT fk_installment_1
			FOREIGN KEY (provider_id)
			REFERENCES provider (id)
			ON DELETE NO ACTION
			ON UPDATE NO ACTION,
		CONSTRAINT fk_installment_2
			FOREIGN KEY (bank_id)
			REFERENCES bank (id)
			ON DELETE NO ACTION
			ON UPDATE NO ACTION,
		CONSTRAINT fk_installment_3
			FOREIGN KEY (card_id)
			REFERENCES card (id)
			ON DELETE NO ACTION
			ON UPDATE NO ACTION);
	`
]

async function createTables() {
	/*
	let pool = await mysql.createPool({
		host: 'mysql.dev.upate.com',
		user: 'user',
		password: 'upate_dev',
		database: 'development',
		connectionLimit: 10
	})

	const connection = await pool.getConnection()
	try {
		await connection.beginTransaction()

		for (const script of scriptSql) {
			await connection.query(script)
		}

		await connection.commit()
	} catch (e) {
		await connection.rollback()

		throw e
	} finally {
		await connection.release()
	}
  */

	let con = await dbConnection()
	try {
		await con.query('START TRANSACTION')

		for (let script of scriptSql) {
			let savedTodo = await con.query(script)
		}

		await con.query('COMMIT')
	} catch (ex) {
		await con.query('ROLLBACK')

		throw ex
	} finally {
		await con.release()
		await con.destroy()
	}

	console.log('FIN')
}

const inserts = async () => {
	let con = await dbConnection()
	try {
		await con.query('START TRANSACTION')

		let banks = await con.query('SELECT * FROM banks')

		for (const bank of banks) {
			console.log(bank)
		}

		await con.query('COMMIT')
	} catch (ex) {
		await con.query('ROLLBACK')

		throw ex
	} finally {
		await con.release()
		await con.destroy()
	}
}

const banks = [
	{
		code: 'frances',
		urls: [
			'https://iinbinlist.com/c/argentina/b/banco-frances-s-a.html',
			'https://iinbinlist.com/c/argentina/b/bbva-banco-frances.html',
			'https://iinbinlist.com/c/argentina/b/bbva-banco-frances-s-a.html'
		]
	},
	{
		code: 'supervielle',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-supervielle-s-a.html']
	},
	{
		code: 'galicia',
		urls: [
			'https://iinbinlist.com/c/argentina/b/banco-de-galicia-y-buenos-aires.html',
			'https://iinbinlist.com/c/argentina/b/banco-de-galicia-y-buenos-aires-s-a.html',
			'https://iinbinlist.com/c/argentina/b/galicia.html'
		]
	},
	{
		code: 'citibank',
		urls: [
			'https://iinbinlist.com/c/argentina/b/citibank.html',
			'https://iinbinlist.com/c/argentina/b/citibank-colombia.html',
			'https://iinbinlist.com/c/argentina/b/citibank-international-plc.html',
			'https://iinbinlist.com/c/argentina/b/citibank-usa-n-a.html',
			'https://iinbinlist.com/c/argentina/b/citibank-n-a.html'
		]
	},
	{
		code: 'santander rio',
		urls: [
			'https://iinbinlist.com/c/argentina/b/banco-santander-rio-s-a.html',
			'https://iinbinlist.com/c/argentina/b/banco-rio.html'
		]
	},
	{
		code: 'comafi',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-comafi-s-a.html']
	},
	{
		code: 'municipal de rosario',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-municipal-de-rosario.html']
	},
	{
		code: 'banco provincia',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-de-la-provincia-de-buenos-aires.html']
	},
	{
		code: 'hipotecario',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-hipotecario-s-a.html']
	},
	{
		code: 'banco de cordoba',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-de-la-provincia-de-cordoba-banco-de-cordoba.html']
	},
	{
		code: 'itau',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-itau-buen-ayre-s-a.html']
	},
	{
		code: 'columbia',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-columbia-s-a.html']
	},
	{
		code: 'macro',
		urls: [
			'https://iinbinlist.com/c/argentina/b/banco-macro-bansud-s-a.html',
			'https://iinbinlist.com/c/argentina/b/banco-macro-s-a.html'
		]
	},
	{
		code: 'patagonia',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-patagonia-s-a.html']
	},
	{
		code: 'icbc',
		urls: ['https://iinbinlist.com/c/argentina/b/icbc.html']
	},
	{
		code: 'ciudad',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-de-la-ciudad-de-buenos-aires.html']
	},
	{
		code: 'hsbc',
		urls: ['https://iinbinlist.com/c/argentina/b/hsbc-bank-argentina-s-a.html']
	},
	{
		code: 'nacion',
		urls: ['https://iinbinlist.com/c/argentina/b/banco-de-la-nacion-argentina.html']
	}
]

const getInfo = async () => {
	// let todo = await axios.get('https://binlists.com/banco-frances')
	// let table = $('.table tr td')
	/*
	for (let bank of banks) {
		console.log(`=== ${bank.code} ===`)

		for (let url of bank.urls) {
			let todo = await axios.get(url)

			let $ = cheerio.load(todo.data)
			let table = $('.list-inline .bin')

			for (let i = 0; i < table.length; i++) {
				const urlSpan = $(table[i]).find('a')[0]

				if (urlSpan) {
					const urlText = $(urlSpan).text()
					console.log(urlText)
				}
			}
		}
	}
  */
}

// createTables().catch(e => {
// 	console.log(e)
// })

inserts().catch(e => {
	console.log(e)
})

// getInfo()

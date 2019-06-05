import fs from 'fs'
import jwt from 'jsonwebtoken'
import appRootDir from 'app-root-dir'

const KEY_public = fs.readFileSync(appRootDir.get() + '/keys/public.pem', 'utf8')

// export default {
module.exports = {
	verify: token => {
		const verifyOptions = {
			// issuer: 'issuer',
			// subject: 'subject',
			// audience: 'audience',
			expiresIn: process.env.JWT_EXPIRE,
			algorithm: ['RS256']
		}
		try {
			return jwt.verify(token, KEY_public, verifyOptions, (err, decoded) => {
				if (err) {
					return false
				}
				return decoded
			})
		} catch (err) {
			return false
		}
	},
	decode: token => {
		// returns null if token is invalid
		// return jwt.decode(token, { complete: true })
		return jwt.decode(token)
	}
}

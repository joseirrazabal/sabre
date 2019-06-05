import dir from 'node-dir'
import path from 'path'

export default (directory, recursive, regExp) => {
	// Assume absolute path by default
	let basepath = directory

	if (directory[0] === '.') {
		// Relative path
		basepath = path.join(__dirname, directory)
	} else if (!path.isAbsolute(directory)) {
		// Module path
		basepath = require.resolve(directory)
	}

	const keys = dir
		.files(basepath, {
			sync: true,
			recursive: recursive || false
		})
		.filter(file => file.match(regExp || /\.(json|js)$/))
		.map(file => path.join('.', file.slice(basepath.length + 1)))

	const context = key => require(context.resolve(key))

	context.resolve = key => path.join(directory, key)

	context.keys = () => keys

	return context
}

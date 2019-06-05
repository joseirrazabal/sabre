module.exports = {
	verbose: true,
	testEnvironment: 'node',
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.js'],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50
		}
	}
}

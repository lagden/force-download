module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['qunit'],
		files: [
			{
				pattern: 'src/*.js',
				type: 'module',
			},
			{
				pattern: 'test/*spec.js',
				type: 'module',
			},
		],
		exclude: [],
		preprocessors: {
			'./src/download.js': ['coverage'],
		},
		reporters: ['progress', 'coverage'],
		coverageReporter: {
			reporters: [
				{
					type: 'lcov',
					subdir: '.',
					file: 'lcov.info',
				},
				{type: 'text-summary'},
			],
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['ChromeHeadless'],
		singleRun: true,
		concurrency: Number.POSITIVE_INFINITY,
		plugins: Object.keys(require('./package.json').devDependencies).flatMap(
			packageName => {
				if (!packageName.startsWith('karma-')) {
					return []
				}

				return [require(packageName)]
			},
		),
	})
}

'use strict'

import {download} from '../src/index.js'

QUnit.test('download', async assert => {
	const response = await globalThis.fetch('https://api.mocki.io/v1/871ab1d2')
	await download(response, 'foo.json')
	assert.ok(true, 'download success')
})

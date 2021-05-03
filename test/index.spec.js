'use strict'

import {download} from '../src/index.js'

// // TODO - criar uma API que retorne `content-disposition`
// QUnit.test('download content-disposition', async assert => {
// 	const response = await globalThis.fetch('http://0.0.0.0:31116/__data/?download=1')
// 	await download(response)
// 	assert.ok(true, 'download success')
// })

QUnit.test('download', async assert => {
	const response = await globalThis.fetch('https://service.teleport.com.br/mol/v1/')
	await download(response, 'mol.json')
	assert.ok(true, 'download success')
})

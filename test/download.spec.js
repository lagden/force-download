import {download} from '../src/download.js'

QUnit.test('download content-disposition', async assert => {
	const response = await globalThis.fetch('https://services.teleport.com.br/cors/load/?url=https://www.pexels.com/download/video/3129671/')
	await download(response)
	assert.ok(true, 'download success')
})

QUnit.test('download', async assert => {
	const response = await globalThis.fetch('https://services.teleport.com.br/mol-rest/')
	await download(response, 'mol.json')
	assert.ok(true, 'download success')
})

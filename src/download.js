import {stream} from './stream.js'

export async function download(response, filename, onDownloadProgress) {
	const disposition = response?.headers.get('content-disposition')
	const regex = /filename=["']?(?<filename>[\w.\-\s()[\]]+)["']?/g
	const match = regex.exec(disposition)
	const _filename = match?.groups?.filename ?? filename

	const _stream = await stream(response, onDownloadProgress)
	const _response = new globalThis.Response(_stream, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	})
	const _blob = await _response.blob()
	const _url = URL.createObjectURL(_blob)

	const _link = document.createElement('a')
	_link.href = _url
	_link.download = _filename

	globalThis.document.body.insertAdjacentElement('beforeend', _link)

	const event = new globalThis.MouseEvent('click', {
		view: globalThis,
		bubbles: false,
		cancelable: true,
	})

	_link.dispatchEvent(event)
	_link.remove()
}

import {stream} from './stream.js'

/**
 * Downloads a file from a response.
 *
 * @param {Response} response - The HTTP response object containing the file data.
 * @param {string} filename - The default filename to use if not specified in the response.
 * @param {function(Object, Uint8Array): void} [onDownloadProgress] - An optional callback function to track the download progress.
 * @returns {void}
 */
export async function download(response, filename, onDownloadProgress) {
	// Check for content disposition header and extract the filename from it
	const disposition = response?.headers.get('content-disposition')
	const regex = /filename=["']?(?<filename>[\w.\-\s()[\]]+)["']?/g
	const match = regex.exec(disposition)
	const _filename = match?.groups?.filename ?? filename

	// Stream the response data
	const _stream = await stream(response, onDownloadProgress)
	const _response = new globalThis.Response(_stream, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	})

	// Create a blob from the response data
	const _blob = await _response.blob()

	// Create a URL for the blob
	const _url = URL.createObjectURL(_blob)

	// Create a link element to trigger the download
	const _link = document.createElement('a')
	_link.href = _url
	_link.download = _filename

	// Insert the link element into the document's body
	globalThis.document.body.insertAdjacentElement('beforeend', _link)

	// Simulate a click event to trigger the download
	const event = new globalThis.MouseEvent('click', {
		view: globalThis,
		bubbles: false,
		cancelable: true,
	})
	_link.dispatchEvent(event)

	// Remove the link element from the document after download
	_link.remove()
}

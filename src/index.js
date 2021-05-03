'use strict'

export async function download(response, filename) {
	const disposition = response?.headers.get('content-disposition')
	const regex = /filename=["']?(?<filename>[\w.-]+)["']?/g
	const match = regex.exec(disposition)
	filename = match?.groups?.filename ?? filename

	const _blob = await Promise.resolve(response.body.getReader())
		.then(reader => {
			return new globalThis.ReadableStream({
				start(controller) {
					function pump() {
						return reader.read().then(({done, value}) => {
							if (done) {
								controller.close()
								return
							}

							controller.enqueue(value)
							return pump()
						})
					}

					return pump()
				}
			})
		})
		.then(stream => new globalThis.Response(stream))
		.then(response => response.blob())

	const _url = globalThis.URL.createObjectURL(new globalThis.Blob([_blob]))
	const _link = document.createElement('a')
	_link.href = _url
	_link.setAttribute('download', filename)

	document.body.insertAdjacentElement('beforeend', _link)

	const event = new globalThis.MouseEvent('click', {
		view: globalThis,
		bubbles: true,
		cancelable: true
	})

	_link.dispatchEvent(event)
	_link.remove()
}

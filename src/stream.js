/**
 * Streams the response data to a ReadableStream, optionally providing progress updates.
 *
 * @param {Response} response - The HTTP response object to stream.
 * @param {function(Object, Uint8Array): void} [cb] - An optional callback function that receives progress and data updates.
 * @returns {ReadableStream} - A ReadableStream for streaming the response data.
 */
export async function stream(response, cb) {
	const hasCB = typeof cb === 'function'
	const totalBytes = Number(response.headers.get('content-length') ?? 0)
	let transferredBytes = 0

	if (response.status === 204) {
		if (hasCB) {
			// Notify with completion for empty response
			cb({percent: 1, transferredBytes, totalBytes, done: true}, new Uint8Array())
		}

		return
	}

	return new globalThis.ReadableStream({
		async start(controller) {
			const reader = response.body.getReader()

			if (hasCB) {
				// Notify the start of streaming
				cb({percent: 0, transferredBytes: 0, totalBytes, done: false}, new Uint8Array())
			}

			async function read() {
				const {done, value} = await reader.read()

				if (hasCB) {
					transferredBytes += done ? 0 : value.byteLength
					const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes
					cb({percent, transferredBytes, totalBytes, done}, value)
				}

				if (done) {
					controller.close()
					return
				}

				controller.enqueue(value)
				await read()
			}

			await read()
		},
	})
}

export async function stream(response, cb) {
	const hasCB = typeof cb === 'function'
	const totalBytes = Number(response.headers.get('content-length') ?? 0)
	let transferredBytes = 0

	if (response.status === 204) {
		if (hasCB) {
			cb({percent: 1, transferredBytes, totalBytes, done: true}, new Uint8Array())
		}

		return
	}

	return new globalThis.ReadableStream({
		async start(controller) {
			const reader = response.body.getReader()

			if (hasCB) {
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

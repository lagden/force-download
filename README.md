# force-download

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]

[ci-img]:        https://github.com/lagden/force-download/workflows/Node.js%20CI/badge.svg
[ci]:            https://github.com/lagden/force-download/actions?query=workflow%3A%22Node.js+CI%22
[coveralls-img]: https://coveralls.io/repos/github/lagden/force-download/badge.svg?branch=main
[coveralls]:     https://coveralls.io/github/lagden/force-download?branch=main
[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


Helper to force download

## Install

```
$ npm i -S @tadashi/fd
```


## Usage

Codepen example: https://codepen.io/lagden/pen/QWGzRXZ?editors=1010

```html
<button type="button" id="downloadFile">Download</button>

<script type="module">
  import {download} from 'https://unpkg.com/@tadashi/fd@1.0.0/src/index.js'

  async function getFile(url, filename) {
    const response = await globalThis.fetch(url)
    await download(response, filename)
  }

  downloadFile.addEventListener('click', async () => {
    await getFile('https://api.mocki.io/v1/871ab1d2', 'foo.json')
  })
</script>
```


## License

MIT © Thiago Lagden

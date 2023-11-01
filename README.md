# force-download

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]

[ci-img]:        https://github.com/lagden/force-download/actions/workflows/nodejs.yml/badge.svg
[ci]:            https://github.com/lagden/force-download/actions/workflows/nodejs.yml
[coveralls-img]: https://coveralls.io/repos/github/lagden/force-download/badge.svg?branch=main
[coveralls]:     https://coveralls.io/github/lagden/force-download?branch=main
[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


Helper to force download

## Install

```
$ npm i @tadashi/fd
```


## Usage

Codepen example: https://codepen.io/lagden/pen/QWGzRXZ?editors=1010

```html
<script type="module">
  import {download} from 'https://unpkg.com/@tadashi/fd'

  btn.addEventListener('click', async () => {
    const response = await globalThis.fetch('https://mdn.github.io/dom-examples/picture-in-picture/assets/bigbuckbunny.mp4')
    await download(response, 'xxx.mp4', percent => {
      const p = progress.percent * 100
      bar.value = p
    })
  })
</script>

<button type="button" id="btn">Download</button>
<progress id="bar" value="0" max="100"></progress>
```


## License

MIT © Thiago Lagden

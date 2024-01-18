# Bear Window Launcher

<p align="center">
    This is a window launcher for front-end compatibility with browser issues when using window.open.
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/bear-window-launcher.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-window-launcher)
[![npm downloads](https://img.shields.io/npm/dm/bear-window-launcher.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-window-launcher)
[![npm](https://img.shields.io/npm/dt/bear-window-launcher.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-window-launcher)
[![npm](https://img.shields.io/npm/l/bear-window-launcher?style=for-the-badge)](https://github.com/imagine10255/bear-window-launcher/blob/main/LICENSE)

</div>


## Features

- Supports window.open after asynchronous requests in iOS Safari.
- Supports whether to close the old window when opening a new one
- Provides browser detection (Safari, Firefox, IE, Wechat, Line, Facebook), default is Chrome.

## Installation

```bash
yarn add bear-window-launcher
```

## Examples

use in your page/component:
```tsx
import {Launcher} from 'bear-window-launcher';

const launcher = new Launcher({
    readyUrl: '/ready_page'
});

// This is to support safari, so it must be
// Safari needs to pre-open tabs before requesting, other browsers do not need to
launcher.ready();

// async requet
const response = await fetch('/url1.json');
const json = await response.json();

launcher.open(json.data);
```

## Check Browser

```ts
import Launcher, {
    checkIsMobile,
    checkIsAndroid,
    checkIsIOS,
    getBrowser,
    checkIsChromeBrowser,
    checkIsSafariBrowser,
    checkIsFirefoxBrowser,
    checkIsEdgeBrowser,
    checkIsLineBrowser,
    checkIsFacebookBrowser, checkIsWebview, checkIsPWA
} from 'bear-window-launcher';
```

## Check OS

```ts
import Launcher, {
    checkIsMobile,
    checkIsAndroid,
    checkIsIOS,
} from 'bear-window-launcher';
```

## License

MIT © [imagine10255](https://github.com/imagine10255)


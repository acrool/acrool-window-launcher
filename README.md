# Acrool Window Launcher


<a href="https://acrool-window-launcher.pages.dev/" title="Acrool Window Launcher - This is a window launcher for front-end compatibility with browser issues when using window.open">
    <img src="https://acrool-window-launcher.pages.dev/og.webp" alt="Acrool Window Launcher Logo"/>
</a>

<p align="center">
    This is a window launcher for front-end compatibility with browser issues when using window.open.
</p>

<div align="center">


[![NPM](https://img.shields.io/npm/v/@acrool/window-launcher.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/window-launcher)
[![npm](https://img.shields.io/bundlejs/size/@acrool/window-launcher?style=for-the-badge)](https://github.com/acrool/@acrool/window-launcher/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/window-launcher?style=for-the-badge)](https://github.com/acrool/window-launcher/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/window-launcher.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/window-launcher)
[![npm](https://img.shields.io/npm/dt/@acrool/window-launcher.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/window-launcher)


</div>


## Features

- Supports window.open after asynchronous requests in iOS Safari.
- Supports whether to close the old window when opening a new one
- Provides browser detection (Safari, Firefox, IE, Wechat, Line, Facebook), default is Chrome.

## Installation

```bash
yarn add @acrool/window-launcher
```

## Examples

use in your page/component:
```tsx
import {Launcher} from '@acrool/window-launcher';

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
} from '@acrool/window-launcher';
```

## Check OS

```ts
import Launcher, {
    checkIsMobile,
    checkIsAndroid,
    checkIsIOS,
} from '@acrool/window-launcher';
```

## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)


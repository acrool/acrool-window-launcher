# Acrool Window Launcher


<a href="https://acrool-window-launcher.pages.dev/" title="Acrool Window Launcher - This is a window launcher for front-end compatibility with browser issues when using window.open">
    <img src="https://raw.githubusercontent.com/acrool/acrool-window-launcher/main/example/public/og.webp" alt="Acrool Window Launcher Logo"/>
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
```ts
import {Launcher} from '@acrool/window-launcher';

const launcher = new Launcher({
    readyUrl: '/loading.html',
    isEnableCatchClose: true,
});

// 1. open loading page
// 2. xhr requet
// 3. replace loading page to new url
launcher
    .openUrl(async () => {
        const json = await axios.get('/url1.json');
        return json.data.gameUrl;
    })
    .catch(e => {
        logRef.current.append('\ncatch...');
    })
    .finally(() => {
        logRef.current.append('\nfinally...');
    });


// 1. open loading page
// 2. xhr requet
// 3. replace loading page to new html
launcher
    .openHtml(async () => {
        const json = await axios.get('/html.json');
        return json.data.html;
    })
    .catch(e => {
        logRef.current.append('\ncatch...');
    })
    .finally(() => {
        logRef.current.append('\nfinally...');
    });

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

## In Global

Here, declare things that go in the global namespace, or augment
existing declarations in the global namespace

typings/global.d.ts

```ts
import {Launcher} from '@acrool/window-launcher';

declare global {
    interface Window {
        ActiveXObject: string
        dataLayer: any[]
        launcher: Launcher
    }
}
```

tsconfig.json

```json
{
    "files": [
        "typings/global.d.ts"
    ]
}
```


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-window-launcher/main/play-in-example-button.svg)](https://acrool-window-launcher.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)


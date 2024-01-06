


export enum EBrowser {
    IOS_Safari = 'IOS_Safari',
    OSX_Safari = 'OSX_Safari',
    Chrome = 'Chrome',
    Firefox = 'Firefox',
    IE = 'IE',
    Line = 'Line',
    Facebook = 'Facebook',
    Wechat = 'Wechat',
    Webview = 'Webview',
    PWA = 'PWA',
}


/**
 * 非同步方式開啟
 * 用來避免呼叫非同步請求時，在呼叫API導致被 iOS Safari 安全性禁止
 * @param url
 */
export const asyncOpen = (url: string): Promise<WindowProxy|null> => {
    return new Promise(resolve => {
        window.requestAnimationFrame(() => {
            const childWindow = window.open(url);
            resolve(childWindow);
        });
    });

};


/**
 * 取得判斷是哪一個瀏覽器
 */
export const getBrowser = (): EBrowser => {
    if(checkIsIOS() && checkIsSafariBrowser()) return EBrowser.IOS_Safari;
    if(checkIsSafariBrowser()) return EBrowser.OSX_Safari;
    if(checkIsFirefoxBrowser()) return EBrowser.Firefox;
    if(checkIsIEBrowser()) return EBrowser.IE;
    if(checkIsLineBrowser()) return EBrowser.Line;
    if(checkIsFacebookBrowser()) return EBrowser.Facebook;
    if(checkIsWechatBrowser()) return EBrowser.Wechat;
    if(checkIsWebview()) return EBrowser.Webview;
    if(checkIsPWA()) return EBrowser.PWA;

    return EBrowser.Chrome;
};


/**
 * 判斷是否為手機裝置
 */
export function checkIsMobile(): boolean {
    try { document.createEvent('TouchEvent'); return true; } catch (e) { return false; }
}

/**
 * 判斷是否為IOS
 */
export function checkIsIOS(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}


/**
 * 判斷是否為IE瀏覽器
 */
export function checkIsIEBrowser(): boolean {
    // @ts-ignore
    return (!!window.ActiveXObject || 'ActiveXObject' in window);
}

/**
 * 判斷是否為LINE瀏覽器
 */
export function checkIsLineBrowser(): boolean {
    const u = navigator.userAgent;
    return u.includes('Line');
}

/**
 * 判斷是否為FB瀏覽器
 */
export function checkIsFacebookBrowser(): boolean {
    const u = navigator.userAgent;
    return u.includes('FBAV');
}

/**
 * 判斷是否為微信瀏覽器
 */
export function checkIsWechatBrowser(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('micromessenger');
}

/**
 * 判斷是否為 Firefox 瀏覽器
 */
export function checkIsFirefoxBrowser(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('firefox');
}

/**
 * 判斷是否為Safari
 */
export function checkIsSafariBrowser(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.includes('safari') && !userAgent.includes('chrome');
}

/**
 * 判斷是否為PWA模式
 */
export function checkIsPWA(): boolean {
    return ('standalone' in window.navigator) && (window.navigator.standalone as boolean);
}


/**
 * 判斷是否為Webview模式
 * (自行開發的 App webview, 需要 APP端傳 userAgent 進webview)
 */
export function checkIsWebview() {
    const regex = /(WebView|(iPhone|iPod|iPad)(?!.*WebKit\/)|Android.*(wv|.0.0.0))/gi;
    return Boolean(navigator.userAgent.match(regex));
}

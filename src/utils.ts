


export enum EBrowser {
    Unknown = 'Unknown',
    Safari = 'Safari',
    Chrome = 'Chrome',
    Firefox = 'Firefox',
    Edge = 'Edge',
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
// export const asyncOpen = (url: string): Promise<WindowProxy|null> => {
//     return new Promise(resolve => {
//         window.requestAnimationFrame(() => {
//             const childWindow = window.open(url);
//             resolve(childWindow);
//         });
//     });
//
// };


/**
 * 取得判斷是哪一個瀏覽器
 */
export const getBrowser = (): EBrowser => {
    // 特定標記先判斷
    // Telegram 同 Safari
    if(checkIsLineBrowser()) return EBrowser.Line;
    if(checkIsFacebookBrowser()) return EBrowser.Facebook;
    if(checkIsFirefoxBrowser()) return EBrowser.Firefox;
    if(checkIsWechatBrowser()) return EBrowser.Wechat;
    if(checkIsEdgeBrowser()) return EBrowser.Wechat;


    if(checkIsWebview()) return EBrowser.Webview;
    if(checkIsPWA()) return EBrowser.PWA;

    if(checkIsChromeBrowser()) return EBrowser.Chrome;
    if(checkIsSafariBrowser()) return EBrowser.Safari;

    return EBrowser.Unknown;
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
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua);
}

/**
 * 判斷是否為Android
 */
export function checkIsAndroid(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    return /android/.test(ua);
}


/**
 * 判斷是否為LINE瀏覽器
 */
export function checkIsLineBrowser(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return /line/.test(ua);
}

/**
 * 判斷是否為FB瀏覽器
 */
export function checkIsFacebookBrowser(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return /fbios/.test(ua);
}

/**
 * 判斷是否為微信瀏覽器
 */
export function checkIsWechatBrowser(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return /micromessenger/.test(ua);
}

/**
 * 判斷是否為 Firefox 瀏覽器
 */
export function checkIsFirefoxBrowser(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return /firefox|fxios/.test(ua);
}

/**
 * 判斷是否為 Edge 瀏覽器
 */
export function checkIsEdgeBrowser(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return /edg/.test(ua);
}

/**
 * 判斷是否為Safari
 */
export function checkIsSafariBrowser(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();

    // 不等於 Chrome 之後判斷有 safari字串 就是 Safari
    if(checkIsChromeBrowser()){
        return false;
    }
    return /safari/.test(ua);
}


/**
 * 判斷是否為Chrome
 */
export function checkIsChromeBrowser() {
    const ua = window.navigator.userAgent.toLowerCase();

    // 手機版
    if(checkIsMobile()){
        if(checkIsIOS()){
            return /crios/.test(ua) && /safari/.test(ua);
        }
        if(checkIsAndroid()){
            return /chrome/.test(ua) && /safari/.test(ua);
        }
    }

    // 網頁版
    return /chrome/.test(ua) && /safari/.test(ua);
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
    const ua = window.navigator.userAgent.toLowerCase();

    // 有額外串改為 webview 判斷(自行APP Webview開發優先)
    if(/webview/.test(ua)){
        return true;
    }

    // ios webview
    if(checkIsIOS()){
        return /mobile/.test(ua) && !/safari/.test(ua);
    }
    // android webview
    if(checkIsAndroid()){
        return /wv/.test(ua) && /android/.test(ua);
    }

    return false;

}


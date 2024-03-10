/** @jest-environment jsdom */

import * as utils from './utils';

enum EUserAgentExample {
    iOS_Webview = 'Mozilla/5.Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E1480',
    iOS_Safari = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    iOS_Chrome = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML like Gecko) CriOS/112.0.5615.70 Mobile/15E148 Safari/604.1',
    iOS_Firefox = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/121.2 Mobile/15E148 Safari/605.1.15',

    OSX_Chrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    OSX_Safari = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
    OSX_Firefox = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',

    Line = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari Line/13.21.0',
    Facebook = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A351 [FBAN/FBIOS;FBDV/iPhone13,3;FBMD/iPhone;FBSN/iOS;FBSV/17.0.2;FBSS/3;FBID/phone;FBLC/zh_TW;FBOP/5]',

    Android_Webview = 'Mozilla/5.0 (Linux; Android 14;sdk_gphone64_arm64 Build/UPB4.230623.005; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672 Mobile Safari/537.36',
    Android_Chrome = 'Mozilla/5.0 (Linux; Android 8.0.0; SM-C900Y) AppleWebkit/537.36 (KHTML like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36',

    Windows_Chrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Windows_Edge = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    Windows_Firefox = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
}

describe('utils', () => {

    // describe('asyncOpen', () => {
    //     it('should open a URL in a new window and return a promise', async () => {
    //         // 模擬 window.open
    //         const mockWindowOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
    //
    //         const url = 'https://example.com';
    //         const promise = utils.asyncOpen(url);
    //
    //         // 確保返回值是 Promise
    //         expect(promise).toBeInstanceOf(Promise);
    //
    //         // 等待 Promise 解決
    //         const result = await promise;
    //
    //         // 檢查 window.open 是否被正確調用
    //         expect(mockWindowOpen).toHaveBeenCalledWith(url);
    //
    //         // 檢查返回值是否為 null（根據模擬的實現）
    //         expect(result).toBeNull();
    //
    //         // 清理模擬
    //         mockWindowOpen.mockRestore();
    //     });
    // });



    describe('checkIsMobile', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return true if TouchEvent is supported', () => {
            jest.spyOn(document, 'createEvent').mockImplementation((type) => {
                if (type === 'TouchEvent') {
                    return new Event('touch');
                }
                throw new Error('Unsupported event type');
            });

            expect(utils.checkIsMobile()).toBeTruthy();
        });

        it('should return false if TouchEvent is not supported', () => {
            jest.spyOn(document, 'createEvent').mockImplementation(() => {
                throw new Error('Unsupported event type');
            });

            expect(utils.checkIsMobile()).toBeFalsy();
        });
    });




    describe('checkIsIOS', () => {
        it('should return true for iOS user agents', () => {
            // 模擬 iOS 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.iOS_Webview,
                configurable: true
            });

            expect(utils.checkIsIOS()).toBeTruthy();
        });

        it('should return false for non-iOS user agents', () => {
            // 模擬非 iOS 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Android_Chrome,
                configurable: true
            });

            expect(utils.checkIsIOS()).toBeFalsy();
        });
    });




    describe('checkIsWebview', () => {
        it('should return true for iOS Webview user agents', () => {
            // 模擬一個典型的 Webview 用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: `${EUserAgentExample.iOS_Webview} WebView`,
                configurable: true
            });

            expect(utils.checkIsWebview()).toBeTruthy();


        });

        it('should return true for Android Webview user agents', () => {

            // 模擬一個典型的 android webview_flutter 預設的 用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Android_Webview,
                configurable: true
            });

            expect(utils.checkIsWebview()).toBeTruthy();
        });
    });



    describe('checkIsLineBrowser', () => {
        it('should return true for LINE user agents', () => {
            // 模擬 LINE 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Line,
                configurable: true
            });

            expect(utils.checkIsLineBrowser()).toBeTruthy();
        });

    });




    describe('checkIsFacebookBrowser', () => {
        it('should return true for Facebook user agents', () => {
            // 模擬 Facebook 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Facebook,
                configurable: true
            });

            expect(utils.checkIsFacebookBrowser()).toBeTruthy();
        });

    });




    describe('checkIsWechatBrowser', () => {
        it('should return true for WeChat user agents', () => {
            // 模擬 WeChat 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.110 Mobile Safari/537.36 MicroMessenger/6.5.7.1041 NetType/WIFI Language/zh_CN',
                configurable: true
            });

            expect(utils.checkIsWechatBrowser()).toBeTruthy();
        });

        it('should return false for non-WeChat user agents', () => {
            // 模擬非 WeChat 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                configurable: true
            });

            expect(utils.checkIsWechatBrowser()).toBeFalsy();
        });
    });




    describe('checkIsFirefoxBrowser', () => {
        it('should return true for iOS Firefox user agents', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.iOS_Firefox,
                configurable: true
            });

            expect(utils.checkIsFirefoxBrowser()).toBeTruthy();
        });

        it('should return true for OSX Firefox user agents', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.OSX_Firefox,
                configurable: true
            });

            expect(utils.checkIsFirefoxBrowser()).toBeTruthy();
        });

        it('should return true for Windows Firefox user agents', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Windows_Firefox,
                configurable: true
            });

            expect(utils.checkIsFirefoxBrowser()).toBeTruthy();
        });

    });


    describe('checkIsEdgeBrowser', () => {
        it('should return true for Window Edge user agents', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Windows_Edge,
                configurable: true
            });

            expect(utils.checkIsEdgeBrowser()).toBeTruthy();
        });


    });






    describe('checkIsSafariBrowser', () => {
        it('should return true for iOS Safari user agents', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.iOS_Safari,
                configurable: true
            });

            expect(utils.checkIsSafariBrowser()).toBeTruthy();
        });

        it('should return true for OSX Safari user agents', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.OSX_Safari,
                configurable: true
            });

            expect(utils.checkIsSafariBrowser()).toBeTruthy();
        });
    });



    describe('checkIsChromeBrowser', () => {
        it('should return true for iOS Chrome', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.iOS_Chrome,
                configurable: true
            });

            expect(utils.checkIsChromeBrowser()).toBeTruthy();
        });


        it('should return true for OSX Chrome', () => {
            // 模擬 Android Chrome 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.OSX_Chrome,
                configurable: true
            });

            expect(utils.checkIsChromeBrowser()).toBeTruthy();
        });


        it('should return true for Android Chrome', () => {
            // 模擬 Android Chrome 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Android_Chrome,
                configurable: true
            });

            expect(utils.checkIsChromeBrowser()).toBeTruthy();
        });

        it('should return true for Window Chrome', () => {
            // 模擬 Android Chrome 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: EUserAgentExample.Windows_Chrome,
                configurable: true
            });

            expect(utils.checkIsChromeBrowser()).toBeTruthy();
        });


    });





    describe('checkIsPWA', () => {
        afterEach(() => {
            // @ts-ignore
            delete window.matchMedia.standalone;
        });

        it('should return true when running in PWA mode', () => {
            // 模擬 PWA 模式
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(query => ({
                    matches: true,
                    media: query,
                    onchange: null,
                    addListener: jest.fn(), // Deprecated
                    removeListener: jest.fn(), // Deprecated
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn(),
                })),
            });
            expect(utils.checkIsPWA()).toBeTruthy();
        });

        it('should return false when not running in PWA mode', () => {
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: jest.fn().mockImplementation(query => ({
                    matches: false,
                    media: query,
                    onchange: null,
                    addListener: jest.fn(), // Deprecated
                    removeListener: jest.fn(), // Deprecated
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn(),
                })),
            });
            expect(utils.checkIsPWA()).toBeFalsy();
        });
    });






});

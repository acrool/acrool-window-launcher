/** @jest-environment jsdom */

import * as utils from './utils';

describe('utils', () => {

    describe('asyncOpen', () => {
        it('should open a URL in a new window and return a promise', async () => {
            // 模擬 window.open
            const mockWindowOpen = jest.spyOn(window, 'open').mockImplementation(() => null);

            const url = 'https://example.com';
            const promise = utils.asyncOpen(url);

            // 確保返回值是 Promise
            expect(promise).toBeInstanceOf(Promise);

            // 等待 Promise 解決
            const result = await promise;

            // 檢查 window.open 是否被正確調用
            expect(mockWindowOpen).toHaveBeenCalledWith(url);

            // 檢查返回值是否為 null（根據模擬的實現）
            expect(result).toBeNull();

            // 清理模擬
            mockWindowOpen.mockRestore();
        });
    });



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
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
                configurable: true
            });

            expect(utils.checkIsIOS()).toBeTruthy();
        });

        it('should return false for non-iOS user agents', () => {
            // 模擬非 iOS 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                configurable: true
            });

            expect(utils.checkIsIOS()).toBeFalsy();
        });
    });




    describe('checkIsIEBrowser', () => {
        afterEach(() => {
            // @ts-ignore
            delete window.ActiveXObject;
        });

        it('should return true for IE browsers', () => {
            // 模擬 IE 瀏覽器
            Object.defineProperty(window, 'ActiveXObject', {
                value: true,
                configurable: true
            });

            expect(utils.checkIsIEBrowser()).toBeTruthy();
        });

        it('should return false for non-IE browsers', () => {
            // 在非 IE 瀏覽器中，window 上不應該有 ActiveXObject
            expect('ActiveXObject' in window).toBeFalsy();
            expect(utils.checkIsIEBrowser()).toBeFalsy();
        });
    });




    describe('checkIsLineBrowser', () => {
        it('should return true for LINE user agents', () => {
            // 模擬 LINE 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) Line/8.9.0',
                configurable: true
            });

            expect(utils.checkIsLineBrowser()).toBeTruthy();
        });

        it('should return false for non-LINE user agents', () => {
            // 模擬非 LINE 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                configurable: true
            });

            expect(utils.checkIsLineBrowser()).toBeFalsy();
        });
    });




    describe('checkIsFacebookBrowser', () => {
        it('should return true for Facebook user agents', () => {
            // 模擬 Facebook 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS) FBAV/1.0',
                configurable: true
            });

            expect(utils.checkIsFacebookBrowser()).toBeTruthy();
        });

        it('should return false for non-Facebook user agents', () => {
            // 模擬非 Facebook 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                configurable: true
            });

            expect(utils.checkIsFacebookBrowser()).toBeFalsy();
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
        it('should return true for Firefox user agents', () => {
            // 模擬 Firefox 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
                configurable: true
            });

            expect(utils.checkIsFirefoxBrowser()).toBeTruthy();
        });

        it('should return false for non-Firefox user agents', () => {
            // 模擬非 Firefox 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                configurable: true
            });

            expect(utils.checkIsFirefoxBrowser()).toBeFalsy();
        });
    });






    describe('checkIsSafariBrowser', () => {
        it('should return true for Safari user agents', () => {
            // 模擬 Safari 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
                configurable: true
            });

            expect(utils.checkIsSafariBrowser()).toBeTruthy();
        });

        it('should return false for non-Safari user agents', () => {
            // 模擬 Chrome 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
                configurable: true
            });

            expect(utils.checkIsSafariBrowser()).toBeFalsy();
        });
    });





    describe('checkIsPWA', () => {
        afterEach(() => {
            // @ts-ignore
            delete window.navigator.standalone;
        });

        it('should return true when running in PWA mode', () => {
            // 模擬 PWA 模式
            Object.defineProperty(window.navigator, 'standalone', {
                value: true,
                configurable: true
            });

            expect(utils.checkIsPWA()).toBeTruthy();
        });

        it('should return false when not running in PWA mode', () => {
            // 確保在非 PWA 模式下，standalone 屬性不存在
            expect('standalone' in window.navigator).toBeFalsy();
            expect(utils.checkIsPWA()).toBeFalsy();
        });
    });






    describe('checkIsWebview', () => {
        it('should return true for Webview user agents', () => {
            // 模擬一個典型的 Webview 用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E5239e WebView',
                configurable: true
            });

            expect(utils.checkIsWebview()).toBeTruthy();
        });

        it('should return false for non-Webview user agents', () => {
            // 模擬一個非 Webview 的用戶代理
            Object.defineProperty(window.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                configurable: true
            });

            expect(utils.checkIsWebview()).toBeFalsy();
        });
    });

});

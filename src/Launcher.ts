import {
    getBrowser,
    EBrowser,
    checkIsLineBrowser,
    checkIsWechatBrowser,
    checkIsFacebookBrowser, writeHtml,
} from './utils';
import {ILauncherOption} from './types';




/**
 * 瀏覽器頁籤啟動器
 */
export default class Launcher {
    _childWindow: WindowProxy|null = null;
    _readyUrl: string;
    _isPreClose: boolean;
    _isEnableCatchClose: boolean;

    get name(): EBrowser{
        return getBrowser();
    }

    constructor(option?: ILauncherOption) {
        this._readyUrl = option?.readyUrl ?? 'about:blank';
        this._isPreClose = option?.isPreClose ?? false;
        this._isEnableCatchClose = option?.isEnableCatchClose ?? true;
    }

    /**
     * 頁籤準備打開
     */
    private _ready(isPreClose?: boolean){
        if(typeof isPreClose !== 'undefined' && isPreClose) {
            this.close();

        }else if(this._isPreClose){
            this.close();
        }

        const isForbidWindowOpen =
            checkIsLineBrowser() ||
            checkIsWechatBrowser() ||
            checkIsFacebookBrowser();

        if(!isForbidWindowOpen){
            this._childWindow = window.open(this._readyUrl);
        }
        return this;
    }

    /**
     * 打開頁籤
     *
     * 嘗試在 既有的新開頁籤 (childWindow) 裡導航到新的網址，
     * 如果沒有現成的頁籤，就新開一個，
     * 如果連新開也失敗（例如被瀏覽器阻擋），就直接導到本頁。
     */
    private _openUrl(url: string){
        if(this._childWindow && this._childWindow?.window) {
            this._childWindow.focus();
            this._childWindow.location.href = url;
        }else{
            this._childWindow = window.open(url);
            if(this._childWindow === null){
                window.location.href = url;
            }
        }

        return this;
    }

    /**
     * 打開頁籤
     */
    private _openHtml(html: string){
        if(this._childWindow && this._childWindow?.window) {
            this._childWindow.focus();
            writeHtml(this._childWindow.document, html);
        }else{
            this._childWindow = window.open('');
            if(this._childWindow === null){
                writeHtml(document, html);
            } else {
                writeHtml(this._childWindow.document, html);
            }
        }

        return this;
    }

    /**
     * 關閉頁籤
     */
    close(){
        if(this._childWindow && !this._childWindow.closed){
            this._childWindow.close();
        }
        return this;
    }


    /**
     * 返回一個 Promise，接收一個 Promise<string>，在 resolve 時自動打開新頁籤
     */
    openHtml(promise: () => Promise<string>, isPreClose?: boolean): Promise<this> {
        this._ready(isPreClose);
        return promise()
            .then((html) => {
                return this._openHtml(html);
            })
            .catch(e => {
                if(this._isEnableCatchClose){
                    this.close();
                }
                throw e;
            });
    }

    /**
     * 返回一個 Promise，接收一個 Promise<string>，在 resolve 時自動打開新頁籤
     */
    openUrl(promise: () => Promise<string>, isPreClose?: boolean): Promise<this> {
        this._ready(isPreClose);
        return promise()
            .then((url) => {
                return this._openUrl(url);
            })
            .catch(e => {
                if(this._isEnableCatchClose){
                    this.close();
                }
                throw e;
            });
    }
}

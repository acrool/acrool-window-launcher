import {ulid} from 'ulid';
import {checkIsSafariBrowser} from './utils';
import {IBrowser} from './types';
import {Chrome, Safari} from './Browsers';


const getBrowser = () => {
    if(checkIsSafariBrowser()) return Safari;
    // if(checkIsSafariBrowser()) return Firefox;
    // if(checkIsSafariBrowser()) return AndroidWebview;
    // if(checkIsSafariBrowser()) return IOSWebview;

    return Chrome;
};


interface IOptions {
    openMode?: TOpenMode
    readyUrl?: string // 指定一個暫時開啟的頁面路徑，避免白頁
    noticeCloseUrl?: string // 指定一個通知使用者手動關閉的頁面路徑，避免白頁
}
type TOpenMode = 'blank'|'multiple'|'self';

export default class Launcher {
    _browser: IBrowser;
    _prefixName?: string;
    _openTargetId?: string;
    _targetWindow: any;
    _readyUrl: string;
    _noticeCloseUrl: string;

    _childWindow: WindowProxy|null = null;

    constructor(options?: IOptions) {
        this._openTargetId = this._createOpenTargetId();
        this._browser = new (getBrowser());
        this._readyUrl = options?.readyUrl ?? 'about:blank';
        this._noticeCloseUrl = options?.noticeCloseUrl ?? 'about:blank';
    }

    /**
     * 建立目標視窗ID
     */
    _createOpenTargetId(){
        return ulid();
    }

    /**
     * 準備
     */
    ready(){
        this._childWindow = this._browser.ready(this._readyUrl);
    }

    /**
     * 打開
     */
    open(url: string){
        this._childWindow = this._browser.open(url, this._childWindow);
    }

    /**
     * 關閉
     */
    close(){
        this._browser.close(this._childWindow);
    }
}

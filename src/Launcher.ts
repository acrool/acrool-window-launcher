import {ulid} from 'ulid';
import {checkIsSafariBrowser} from './utils';
import {IBrowser, Chrome, IOSSafari, OSXSafari} from './launchers';
import {checkIsIOS} from 'bear-jsutils/browser';


const getBrowser = () => {
    if(checkIsIOS() && checkIsSafariBrowser()) return IOSSafari;
    if(checkIsSafariBrowser()) return OSXSafari;
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
    // _readyUrl: string;
    // _noticeCloseUrl: string;

    // _childWindow: WindowProxy|null = null;

    constructor(options?: IOptions) {
        // this._openTargetId = this._createOpenTargetId();

        const readyUrl = options?.readyUrl ?? 'about:blank';
        const noticeCloseUrl = options?.noticeCloseUrl ?? 'about:blank';

        this._browser = new (getBrowser())({readyUrl, noticeCloseUrl});
    }


    /**
     * 建立目標視窗ID
     */
    _createOpenTargetId(){
        return ulid();
    }


    get name(){
        return this._browser.name;
    }



    /**
     * 打開
     */
    open(url: string){
        this._browser
            .close()
            .open(url);
    }

    /**
     * 關閉
     */
    close(){
        this._browser.close();
    }
}

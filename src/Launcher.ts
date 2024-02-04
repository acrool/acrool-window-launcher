import {getBrowser, EBrowser} from './utils';
import {ILauncherOption} from './types';


/**
 * 瀏覽器頁籤啟動器
 */
export default class Launcher {
    _childWindow: WindowProxy|null = null;
    _readyUrl: string;
    _isPreClose: boolean;

    get name(): EBrowser{
        return getBrowser();
    }

    constructor(option?: ILauncherOption) {
        this._readyUrl = option?.readyUrl ?? 'about:blank';
        this._isPreClose = option?.isPreClose ?? false;
    }

    /**
     * 頁籤準備打開
     */
    ready(isPreClose?: boolean){
        if(typeof isPreClose !== 'undefined' && isPreClose) {
            this.close();

        }else if(this._isPreClose){
            this.close();
        }

        this._childWindow = window.open(this._readyUrl);

        return this;
    }

    /**
     * 打開頁籤
     */
    open(url: string){
        if(this._childWindow && this._childWindow?.window) {
            this._childWindow.focus();
            this._childWindow.location.href = url;

        }else{
            this._childWindow = window.open(url);

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
}

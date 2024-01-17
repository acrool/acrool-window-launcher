import {getBrowser, EBrowser, checkIsWebview} from './utils';
import {ILauncherOption} from './types';


/**
 * 瀏覽器頁籤啟動器
 */
export default class Launcher {
    _childWindow: WindowProxy|null = null;
    _readyUrl: string;
    _isPreClose: boolean;
    _isTargetSelf: boolean;

    get name(): EBrowser{
        return getBrowser();
    }

    constructor(option?: ILauncherOption) {
        this._readyUrl = option?.readyUrl ?? 'about:blank';
        this._isPreClose = option?.isPreClose ?? false;
        this._isTargetSelf = option?.isTargetSelf ?? false;
    }

    /**
     * 頁籤準備打開
     */
    ready(){
        if(this._isPreClose){
            this.close();
        }
        if(!this._isTargetSelf && [EBrowser.Safari].includes(this.name)){
            this._childWindow = window.open(this._readyUrl);
        }

        return this;
    }

    /**
     * 打開頁籤
     */
    open(url: string){

        if(this._isTargetSelf) {
            window.open(url, '_self');

        }else if(this._childWindow && [EBrowser.Safari].includes(this.name)) {
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

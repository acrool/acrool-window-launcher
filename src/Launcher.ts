import {getBrowser, EBrowser, asyncOpen} from './utils';
import {IOpenOption} from './types';


/**
 * 瀏覽器頁籤啟動器
 */
export default class Launcher {
    _childWindow: WindowProxy|null = null;

    get name(): EBrowser{
        return getBrowser();
    }

    /**
     * 打開頁籤
     */
    async open(url: string, option?: IOpenOption){
        if(option?.isPreClose){
            this.close();
        }
        if(option?.isTargetSelf){
            window.location.href = url;
        }else{
            this._childWindow = await asyncOpen(url);
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

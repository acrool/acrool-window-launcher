import {IBrowser} from './types';
import _ from './_';
import {asyncOpen} from './utils';

/**
 * OSX Safari 瀏覽器
 */
class OSXSafari extends _ implements IBrowser {
    name = 'OSX Safari';

    /**
     * 需要在非同步前預先開啟頁面，否則會出現安全性阻擋
     */
    // ready() {
    //
    //     // 如果視窗已存在，沿用舊的先回到 readyUrl
    //     if (this._childWindow && !this._childWindow.closed) {
    //         this._childWindow.location.href = this._readyUrl;
    //     }
    //     this._childWindow = window.open(this._readyUrl, this._childWindowId);
    // }

    async open(url: string) {
        this._childWindow = await asyncOpen(url);

        return this;
    }

    close() {
        if(this._childWindow && !this._childWindow.closed){
            this._childWindow.close();
        }

        return this;
    }
}

export default OSXSafari;

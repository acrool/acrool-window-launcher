import {IBrowser} from './types';
import _ from './_';
import {asyncOpen} from './utils';

/**
 * OSX Safari 瀏覽器
 */

/**
 * IOS Safari 瀏覽器
 */
class IOSSafari extends _ implements IBrowser {

    name = 'iOS Safari';

    /**
     * 需要在非同步前預先開啟頁面，否則會出現安全性阻擋
     */
    // ready(): WindowProxy|null {
    //     // 因為無法Focus到原本的頁籤，先把舊的視窗通知關閉
    //     if (this._childWindow && !this._childWindow.closed) {
    //         this._childWindow.location.href = this._noticeCloseUrl;
    //     }
    //     // 開啟新的頁籤，使用不同的 windowId
    //     this._createOpenTargetId();
    //     return window.open(this._readyUrl, this._childWindowId);
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



export default IOSSafari;

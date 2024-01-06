import {ulid} from 'ulid';


/**
 * 主要的瀏覽器
 */
class _ {
    _childWindow: WindowProxy|null = null;
    _childWindowId: string;
    _readyUrl: string;
    _noticeCloseUrl: string;

    constructor(options: {readyUrl: string, noticeCloseUrl: string}) {
        this._noticeCloseUrl = options.noticeCloseUrl;
        this._readyUrl = options.readyUrl;
        this._childWindowId = 'childWindow';
    }


    /**
     * 建立目標視窗ID
     */
    _createOpenTargetId(){
        this._childWindowId = ulid();
    }

}


export default _;

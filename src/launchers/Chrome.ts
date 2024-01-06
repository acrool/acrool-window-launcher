import {IBrowser} from './types';
import _ from './_';
import {asyncOpen} from './utils';


/**
 * Chrome 瀏覽器
 */
class Chrome extends _ implements IBrowser {
    name = 'Chrome';

    // ready(): WindowProxy|null {
    //     return null;
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


export default Chrome;

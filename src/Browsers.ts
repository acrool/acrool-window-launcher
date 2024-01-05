import {IBrowser} from './types';



class Safari implements IBrowser {

    ready(readyUrl: string, childWindow?: WindowProxy|null): WindowProxy|null {
        if (childWindow && !childWindow.closed) {
            childWindow.location.href = readyUrl;
            return childWindow;
        }
        return window.open(readyUrl, 'childWindow');
    }

    open(url: string, childWindow: WindowProxy|null) {
        if(childWindow && !childWindow.closed){
            childWindow.location.href = url;
        }
        return childWindow;
    }

    close(childWindow: WindowProxy|null) {
        if(childWindow && !childWindow.closed){
            childWindow.close();
        }
    }
}




class Chrome implements IBrowser {

    ready(readyUrl: string, childWindow?: WindowProxy|null): WindowProxy|null {
        return null;
    }

    open(url: string, childWindow: WindowProxy|null) {
        if(childWindow && !childWindow.closed){
            childWindow.location.href = url;
        }
        return window.open(url, 'childWindow');
    }

    close(childWindow: WindowProxy|null) {
        if(childWindow && !childWindow.closed){
            childWindow.close();
        }
    }
}


export {Chrome, Safari};

import {delay} from '@acrool/js-utils/promise';
import Launcher from '@acrool/window-launcher';

/**
 * Mock call api
 */
export const callAPI = async () => {
    const [response] = await Promise.all([
        fetch('/mock_api/notFound.json', {method: 'GET'}),
        delay(500),
    ]);
    return response.json();
};



export const launcher = new Launcher({
    readyUrl: `${window.location.origin}/loading.html`,
    isPreClose: false,
});

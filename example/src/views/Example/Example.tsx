import Launcher, {getBrowser} from 'bear-window-launcher';
import {useRef} from 'react';


const launcher = new Launcher({
    readyUrl: '/url1.json',
    isPreClose: true,
    isTargetSelf: true,
});

const Example = () => {
    const logRef = useRef<HTMLDivElement>(null);

    const handleLauncherClose = async () => {
        launcher.close();
    };


    const handleLauncherClick2 = async () => {
        if(logRef && logRef.current){

            logRef.current.innerHTML = 'ready...';
            launcher.ready();
            // open('https://www.google.com');

            // @ts-ignore
            // window.open.postMessage('https://www.google.com');


            logRef.current.innerHTML = 'fetching...';

            // const testApiUrl1 = 'http://yapi.5881689.com:1000/mock/17/api5-member/api/lobby/lobbyStart';
            // const response = await fetch(testApiUrl1, {method: 'POST'});

            const testApiUrl2 = '/url1.json';
            const response = await fetch(testApiUrl2, {method: 'GET'});
            const json = await response.json();

            const targetUrl = json.data.lobbyUrl;
            logRef.current.innerHTML = `open url: ${targetUrl}`;

            launcher.open(targetUrl);

            logRef.current.append(' [done]');

        }
    };


    return <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
        <div>Current Browser: {getBrowser()}</div>
        <div>navigator.userAgent: <p>{navigator.userAgent}</p></div>

        <div>
            <button onClick={handleLauncherClick2} type="button">
                Launcher Open 2
            </button>
        </div>

        <div ref={logRef}>

        </div>

        <button onClick={handleLauncherClose} type="button">
            Close
        </button>

    </div>;
};

export default Example;




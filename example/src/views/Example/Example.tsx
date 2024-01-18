import Launcher, {
    getBrowser,
    checkIsMobile,
    checkIsChromeBrowser,
    checkIsAndroid,
    checkIsIOS,
    checkIsSafariBrowser,
    checkIsFirefoxBrowser,
    checkIsEdgeBrowser,
    checkIsLineBrowser,
    checkIsFacebookBrowser, checkIsWebview, checkIsPWA
} from 'bear-window-launcher';
import {objectKeys} from 'bear-jsutils/object';
import {useRef} from 'react';
import {Table} from 'bear-react-table';
import styled from 'styled-components';


const launcher = new Launcher({
    readyUrl: '/url1.json',
    isPreClose: true,
    isTargetSelf: false,
});

const Example = () => {
    const logRef = useRef<HTMLDivElement>(null);

    const handleClose = async () => {
        launcher.close();
    };


    const handleLauncher = async () => {
        if(logRef && logRef.current){

            logRef.current.innerHTML = 'ready...';
            launcher.ready();

            logRef.current.innerHTML = 'fetching...';

            const testApiUrl = '/url1.json';
            const response = await fetch(testApiUrl, {method: 'GET'});
            const json = await response.json();

            const targetUrl = json.data.lobbyUrl;
            logRef.current.innerHTML = `open url: ${targetUrl}`;

            launcher.open(targetUrl);

            logRef.current.append(' [done]');

        }
    };


    const os = {
        Android: checkIsAndroid(),
        iOS: checkIsIOS(),
        Mobile: checkIsMobile(),
    };
    const browser = {
        Android: checkIsAndroid(),
        Ios: checkIsIOS(),
        Chrome: checkIsChromeBrowser(),
        Safari: checkIsSafariBrowser(),
        Firefox: checkIsFirefoxBrowser(),
        Edge: checkIsEdgeBrowser(),
        Line: checkIsLineBrowser(),
        Facebook: checkIsFacebookBrowser(),
        Webview: checkIsWebview(),
        Pwa: checkIsPWA(),
    };


    const renderBrowserTable = () => {

        return <Table
            isDark
            isVisiblePaginate={false}
            gap="10px"
            title={{
                deviceName:   {text: 'Device',      col: 100},
                check:     {text: 'Check',   col: 'auto'},
            }}
            data={objectKeys(browser).map(key => {
                return {
                    id: 1,
                    field: {
                        deviceName: key.toString(),
                        check: browser[key] ? <Label>Yes</Label>: 'No',
                    },
                };
            })}
        />;
    };


    const renderDeviceTable = () => {

        return <Table
            isDark
            isVisiblePaginate={false}
            gap="10px"
            title={{
                deviceName:   {text: 'Device',      col: 'auto'},
                check:     {text: 'Check',   col: 'auto'},
            }}
            data={objectKeys(os).map(key => {
                return {
                    id: 1,
                    field: {
                        deviceName: key.toString(),
                        check: os[key] ? <Label>Yes</Label>: 'No',
                    },
                };
            })}
        />;
    };


    return <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', width: '100%'}}>

        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <button onClick={handleLauncher} type="button">Launcher Open</button>
            <button onClick={handleClose} type="button">
                Close
            </button>
        </div>

        <div>Current Browser: <Label>{getBrowser()}</Label></div>
        <div>[userAgent] {navigator.userAgent}</div>

        <div style={{display: 'flex', gap: '15px', width: '100%'}}>
            {renderDeviceTable()}
            {renderBrowserTable()}
        </div>


        <div ref={logRef}/>



    </div>;
};

export default Example;





const Label = styled.label`
  background-color: #dc457a;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

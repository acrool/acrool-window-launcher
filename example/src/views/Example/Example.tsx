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
} from '@acrool/window-launcher';
import {objectKeys} from 'bear-jsutils/object';
import {useRef} from 'react';
import {Table} from '@acrool/react-table';
import styled from 'styled-components';
import {Col, Container, Row} from "@acrool/react-grid";


const launcher = new Launcher({
    readyUrl: `${window.location.origin}/url1.json`,
    isPreClose: false,
});


function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Example = () => {
    const logRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        launcher.close();
    };


    const handleLauncher = async () => {
        if(logRef && logRef.current){

            logRef.current.innerHTML = 'ready...';
            launcher.ready();

            logRef.current.innerHTML = 'fetching...';

            const testApiUrl = '/url1.json';
            const [response] = await Promise.all([
                fetch(testApiUrl, {method: 'GET'}),
                delay(1500),
            ]);
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
                    id: key,
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
                    id: key,
                    field: {
                        deviceName: key.toString(),
                        check: os[key] ? <Label>Yes</Label>: 'No',
                    },
                };
            })}
        />;
    };


    return <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', width: '100%'}}>
        <div ref={logRef}/>

        <div style={{display: 'flex', justifyContent: 'center', width: '100%', gap: '10px'}}>
            <Button type="button" onClick={handleLauncher} >Launcher Open</Button>
            <CloseButton type="button" onClick={handleClose}>Close</CloseButton>
        </div>

        <div>Current Browser: <Label>{getBrowser()}</Label></div>
        <div>[userAgent] {navigator.userAgent}</div>

        <Container>
            <Row className="gy-3">
                <Col col={12} md={6}>
                    {renderDeviceTable()}
                </Col>
                <Col col={12} md={6}>
                    {renderBrowserTable()}
                </Col>
            </Row>
        </Container>






    </div>;
};

export default Example;


const Button = styled.button`
  background-color: #2c32a9;
  color: #fff;
`;
const CloseButton = styled.button`
  background-color: #3b3939;
  color: #fff;
`;


const Label = styled.label`
  background-color: #dc457a;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

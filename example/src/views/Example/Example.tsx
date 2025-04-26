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
import {objectKeys} from '@acrool/js-utils/object';
import {useRef} from 'react';
import {Table} from '@acrool/react-table';
import styled from 'styled-components';
import {Col, Container, Row} from '@acrool/react-grid';
import {delay} from '@acrool/js-utils/promise';
import {toast} from '@acrool/react-toaster';


const launcher = new Launcher({
    readyUrl: `${window.location.origin}/loading.html`,
    isPreClose: false,
});


/**
 * Mock call api
 */
const callUrlSuccessAPI = async () => {
    const [response] = await Promise.all([
        fetch('/url1.json', {method: 'GET'}),
        delay(1500),
    ]);
    return response.json();
};

/**
 * Mock call api
 */
const callHtmlSuccessAPI = async () => {
    const [response] = await Promise.all([
        fetch('/html.json', {method: 'GET'}),
        delay(1500),
    ]);
    return response.json();
};


/**
 * Mock call api
 */
const callUrlFailAPI = async () => {
    const [response] = await Promise.all([
        fetch('/xxxxxxxxx.json', {method: 'GET'}),
        delay(1500),
    ]);
    return response.json();
};


const Example = () => {
    const logRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        launcher.close();
    };


    const handleHtmlLauncher = () => {
        launcher
            .openHtml(async () => {
                const json = await callHtmlSuccessAPI();
                return json.data.html;
            }).catch(e => {
                toast.error(e.message);
                logRef.current.append('\ncatch...');
            })
            .finally(() => {
                logRef.current.append('\nfinally...');
            });
    };



    /**
     * 啟動流程 (成功)
     */
    const handleSuccessLauncher = async () => {
        if(logRef && logRef.current){

            logRef.current.innerHTML = 'ready...';

            launcher
                .openUrl(async () => {
                    const json = await callUrlSuccessAPI();
                    const targetUrl: string = json.data.lobbyUrl;
                    return targetUrl;
                })
                .catch(e => {
                    toast.error(e.message);
                    logRef.current.append('\ncatch...');
                })
                .finally(() => {
                    logRef.current.append('\nfinally...');
                });

        }
    };

    /**
     * 啟動流程 (失敗)
     */
    const handleFailLauncher = async () => {
        if(logRef && logRef.current){

            logRef.current.innerHTML = 'ready...';

            launcher
                .openUrl(async () => {
                    const json = await callUrlFailAPI();
                    const targetUrl: string = json.data.lobbyUrl;
                    return targetUrl;
                })
                .catch(e => {
                    toast.error(e.message);
                    logRef.current.append('\ncatch...');
                })
                .finally(() => {
                    logRef.current.append('\nfinally...');
                });

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
        <Log ref={logRef}/>

        <div style={{display: 'flex', justifyContent: 'center', width: '100%', gap: '10px'}}>
            <SuccessButton type="button" onClick={handleSuccessLauncher} >Launcher Open (Success)</SuccessButton>
            <FailButton type="button" onClick={handleFailLauncher} >Launcher Open (Fail)</FailButton>
            <CloseButton type="button" onClick={handleClose}>Close</CloseButton>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', width: '100%', gap: '10px'}}>
            <SuccessButton type="button" onClick={handleHtmlLauncher} >Launcher Open Blank</SuccessButton>
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


const Log = styled.div`
  white-space: pre-line;
`;

const FailButton = styled.button`
  background-color: #a92c58;
  color: #fff;
`;
const SuccessButton = styled.button`
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

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Launcher, { getBrowser, checkIsMobile, checkIsChromeBrowser, checkIsAndroid, checkIsIOS, checkIsSafariBrowser, checkIsFirefoxBrowser, checkIsEdgeBrowser, checkIsLineBrowser, checkIsFacebookBrowser, checkIsWebview, checkIsPWA } from 'bear-window-launcher';
import { objectKeys } from 'bear-jsutils/object';
import { useRef } from 'react';
import { Table } from 'bear-react-table';
import styled from 'styled-components';
const launcher = new Launcher({
    readyUrl: '/url1.json',
    isPreClose: true,
    isTargetSelf: false,
});
const Example = () => {
    const logRef = useRef(null);
    const handleClose = () => {
        launcher.close();
    };
    const handleLauncher = async () => {
        if (logRef && logRef.current) {
            logRef.current.innerHTML = 'ready...';
            launcher.ready();
            logRef.current.innerHTML = 'fetching...';
            const testApiUrl = '/url1.json';
            const response = await fetch(testApiUrl, { method: 'GET' });
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
        return _jsx(Table, { isDark: true, isVisiblePaginate: false, gap: "10px", title: {
                deviceName: { text: 'Device', col: 100 },
                check: { text: 'Check', col: 'auto' },
            }, data: objectKeys(browser).map(key => {
                return {
                    id: key,
                    field: {
                        deviceName: key.toString(),
                        check: browser[key] ? _jsx(Label, { children: "Yes" }) : 'No',
                    },
                };
            }) });
    };
    const renderDeviceTable = () => {
        return _jsx(Table, { isDark: true, isVisiblePaginate: false, gap: "10px", title: {
                deviceName: { text: 'Device', col: 'auto' },
                check: { text: 'Check', col: 'auto' },
            }, data: objectKeys(os).map(key => {
                return {
                    id: key,
                    field: {
                        deviceName: key.toString(),
                        check: os[key] ? _jsx(Label, { children: "Yes" }) : 'No',
                    },
                };
            }) });
    };
    return _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', width: '100%' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }, children: [_jsx(Button, { type: "button", onClick: handleLauncher, children: "Launcher Open" }), _jsx(CloseButton, { type: "button", onClick: handleClose, children: "Close" })] }), _jsxs("div", { children: ["Current Browser: ", _jsx(Label, { children: getBrowser() })] }), _jsxs("div", { children: ["[userAgent] ", navigator.userAgent] }), _jsxs("div", { style: { display: 'flex', gap: '15px', width: '100%' }, children: [renderDeviceTable(), renderBrowserTable()] }), _jsx("div", { ref: logRef })] });
};
export default Example;
const Button = styled.button `
  background-color: #2c32a9;
  color: #fff;
`;
const CloseButton = styled.button `
  background-color: #3b3939;
  color: #fff;
`;
const Label = styled.label `
  background-color: #dc457a;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

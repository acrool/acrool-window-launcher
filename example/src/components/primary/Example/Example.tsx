import {objectKeys} from '@acrool/js-utils/object';
import {Col, Container, Flex, Row} from '@acrool/react-grid';
import {Table} from '@acrool/react-table';
import {
    checkIsAndroid,
    checkIsChromeBrowser,
    checkIsEdgeBrowser,
    checkIsFacebookBrowser, checkIsFirefoxBrowser,
    checkIsIOS,
    checkIsLineBrowser,
    checkIsMobile,
    checkIsPWA,
    checkIsSafariBrowser,
    checkIsWebview
} from '@acrool/window-launcher';
import styled from 'styled-components';


const Example = () => {

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
                deviceName: {text: 'Device', col: 100},
                check: {text: 'Check', col: 'auto'},
            }}
            data={objectKeys(browser).map(key => {
                return {
                    id: key,
                    field: {
                        deviceName: key.toString(),
                        check: browser[key] ? <Label>Yes</Label> : 'No',
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
                deviceName: {text: 'Device', col: 'auto'},
                check: {text: 'Check', col: 'auto'},
            }}
            data={objectKeys(os).map(key => {
                return {
                    id: key,
                    field: {
                        deviceName: key.toString(),
                        check: os[key] ? <Label>Yes</Label> : 'No',
                    },
                };
            })}
        />;
    };


    return <ExampleRoot>
        <Container>

            <Row className="mb-5">
                <Col col={12}>
                    <Flex column className="gap-2 align-items-center">
                        <Flex>[userAgent] {navigator.userAgent}</Flex>
                    </Flex>


                </Col>
            </Row>
            <Row className="gy-3">
                <Col col={12} md={6}>
                    {renderDeviceTable()}
                </Col>
                <Col col={12} md={6}>
                    {renderBrowserTable()}
                </Col>
            </Row>
        </Container>

    </ExampleRoot>;
};

export default Example;









const Label = styled.label`
    background-color: #dc457a;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

`;

const ExampleRoot = styled.div`
    background: #000;
    color: #fff;
    padding: 50px;
    border-radius: 8px;
`;

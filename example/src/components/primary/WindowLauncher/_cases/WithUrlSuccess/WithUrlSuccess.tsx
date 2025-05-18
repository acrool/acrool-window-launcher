import {Flex} from '@acrool/react-grid';
import {toast} from '@acrool/react-toaster';
import styled from 'styled-components';

import {callAPI, launcher} from './utils';
import {useRef} from "react";




/**
 * 測試URL成功的情況
 */
const WithUrlSuccess = () => {
    const logRef = useRef<HTMLDivElement>(null);


    /**
     * 關閉視窗
     */
    const handleClose = () => {
        launcher.close();
    };

    /**
     * 啟動流程
     */
    const handleOpen = async () => {

        if(!logRef.current) return;
        logRef.current.innerHTML = 'ready...';

        launcher
            .open(async () => {
                const json = await callAPI();
                const targetUrl: string = json.data.lobbyUrl;
                return targetUrl;
            })
            .then(data => {
                logRef.current?.append('\ncatch...');
            })
            .catch(e => {
                toast.error(e.message);
                logRef.current?.append('\ncatch...');
            })
            .finally(() => {
                logRef.current?.append('\nfinally...');
            });

    };


    return <Flex column className="gap-2">

        <Flex className="gap-2">
            <SuccessButton
                data-testid="open-button"
                type="button"
                onClick={handleOpen}
            >
                Launcher Open
            </SuccessButton>
            <CloseButton
                data-testid="close-button"
                type="button"
                onClick={handleClose}
            >Close
            </CloseButton>
        </Flex>

        <Log ref={logRef}/>
    </Flex>;
};

export default WithUrlSuccess;


const SuccessButton = styled.button`
    background-color: #2c32a9;
    color: #fff;
    border-radius: 4px;
    padding: 4px 8px;
`;
const CloseButton = styled.button`
    background-color: #3b3939;
    color: #fff;
    border-radius: 4px;
    padding: 4px 8px;
`;

const Log = styled.div`
    white-space: pre-line;
`;

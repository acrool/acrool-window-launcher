import {Flex} from '@acrool/react-grid';
import {toast} from '@acrool/react-toaster';
import {useRef} from 'react';
import styled from 'styled-components';

import {callAPI, launcher} from './utils';




/**
 * 測試Html成功的情況
 */
const WithHtmlSuccess = () => {
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
                const targetHtml: string = json.data.html;
                return {
                    type: 'html',
                    value: targetHtml,
                };
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

export default WithHtmlSuccess;


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

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {pull} from 'bear-jsutils/array';
import {simpleDate} from 'bear-jsutils/date';
import Launcher from 'bear-window-launcher';

import './App.css';
import './bootstrap-base.min.css';

const delay = (delayMs: number) => {
    return new Promise(resolve => setTimeout(resolve, delayMs));
};
const asyncOpen = (url: string) => {
    setTimeout(() => {
        window.open(url);
    }, 0);
};

type TWindowOpen = (url: string) => WindowProxy|null;




const launcher = new Launcher();

function App() {

    const res = pull(['a', 'b'], 'c').join('-');
    const date = simpleDate('2023-04-04');



    const handleLauncherClose = async () => {
        launcher.close();
    };


    const handleLauncherClick1 = async () => {
        // launcher.ready();

        const response = await fetch('/url1.json');

        const json = await response.json();
        launcher.open(json.data);
        // await delay(2000);

        // window.requestAnimationFrame(() => {
        // asyncOpen(json.data);
        // });
        // setTimeout(() => {

        // },0);
        // launcher.open(json.data);
    };


    const handleLauncherClick2 = async () => {
        // launcher.ready();
        const response = await fetch('/url2.json');
        const json = await response.json();
        // await delay(2000);

        launcher.open(json.data);
    };

    // const handleDefaultClick = () => {
    //     console.log('childWindow', childWindow);
    //     if (childWindow) {
    //         childWindow.location.href = 'https://www.google.com';
    //     } else {
    //         childWindow = window.open('about:blank', 'childTab');
    //     }
    // };

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <div className="mb-3">
                    {launcher.name}
                </div>


                <button onClick={handleLauncherClick1} type="button">
                    Launcher Open 1
                </button>

                <button onClick={handleLauncherClick2} type="button">
                    Launcher Open 2
                </button>

                <button onClick={handleLauncherClose} type="button">
                    Close
                </button>

                {/*<button onClick={handleDefaultClick} type="button">*/}
                {/*    Default Open*/}
                {/*</button>*/}
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

        </div>
    );
}

export default App;

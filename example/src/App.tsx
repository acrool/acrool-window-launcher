import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './bootstrap-base.min.css';
import Example from './views/Example/Example';




function App() {


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
            <div className="">
                <Example/>
            </div>

        </div>
    );
}

export default App;

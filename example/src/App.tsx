import './App.css';
import Example from './views/Example/Example';
import Github from './assets/github.svg?react';




function App() {


    return (
        <div className="App">
            <a href="https://github.com/acrool/acrool-window-launcher" target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </a>

            <h1>Acrool Window Launcher</h1>
            <div className="">
                <Example/>
            </div>

        </div>
    );
}

export default App;



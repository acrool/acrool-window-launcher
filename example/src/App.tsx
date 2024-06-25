import './App.css';
import Example from './views/Example';
import Github from './assets/github.svg?react';




function App() {

    const renderHeader = () => {

        const repositoryUrl = 'https://github.com/acrool/acrool-window-launcher';
        const name = 'Acrool Window Launcher';

        return <>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </a>

            <div className="banner-wrapper">
                <img src="/logo.svg" alt={name}/>
                <h1>{name}</h1>
            </div>
        </>;
    };



    return (
        <div className="App">
            {renderHeader()}

            <Example/>
        </div>
    );
}

export default App;



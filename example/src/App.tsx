import './App.css';
import Example from './views/Example';
import Github from './assets/github.svg?react';




function App() {


    return (
        <div className="App">
            <a href="https://github.com/acrool/acrool-window-launcher" target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </a>

            <div style={{textAlign: 'center', border: '1px solid #606060', display: 'flex', flexDirection: 'column', padding: '20px', margin: '20px 0'}}>
                <img src="/logo.svg" style={{height: '100px'}} alt="Acrool Window Launcher"/>
                <div style={{fontSize: '40px', color: '#fff', fontWeight: 700}}>Acrool Window Launcher</div>
            </div>


            <Example/>

        </div>
    );
}

export default App;



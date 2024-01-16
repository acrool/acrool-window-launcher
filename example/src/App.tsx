import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './bootstrap-base.min.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import Example from './views/Example/Example';


const queryClient = new QueryClient();


function App() {


    return (
        <QueryClientProvider client={queryClient}>
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
                    <Example/>
                </div>
                <p className="read-the-docs">
                Click on the Vite and React logos to learn more
                </p>

            </div>
        </QueryClientProvider>
    );
}

export default App;

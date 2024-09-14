import './App.css';
import Example from './views/Example';
import Banner from './components/Banner';
import {GridThemeProvider} from '@acrool/react-grid';
import {ToasterPortal} from '@acrool/react-toaster';




function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>

                <Example/>
            </div>


            <ToasterPortal defaultTimeout={2500}/>
        </GridThemeProvider>
    );
}

export default App;



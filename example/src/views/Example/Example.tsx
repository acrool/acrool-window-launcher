import Launcher from 'bear-window-launcher';


const launcher = new Launcher({
    readyUrl: '/url1.json',
    isPreClose: true,
});

const Example = () => {

    const handleLauncherClose = async () => {
        launcher.close();
    };


    const handleLauncherClick2 = async () => {
        launcher.ready();

        const response = await fetch('/url1.json', {method: 'POST'});
        const json = await response.json();

        const con = document.getElementById('console');
        if(con){
            con.innerHTML = json.data;
        }

        launcher.open(json.data);

    };


    return <>
        <button onClick={handleLauncherClick2} type="button">
            Launcher Open 2
        </button>

        <br/>
        <br/>

        <div id="console">
            is url test
        </div>

        <button onClick={handleLauncherClose} type="button">
            Close
        </button>

    </>;
};

export default Example;




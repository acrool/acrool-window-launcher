import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './bootstrap-base.min.css';
import Example from './views/Example/Example';
function App() {
    return (_jsxs("div", { className: "App", children: [_jsxs("div", { children: [_jsx("a", { href: "https://vitejs.dev", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: viteLogo, className: "logo", alt: "Vite logo" }) }), _jsx("a", { href: "https://reactjs.org", target: "_blank", rel: "noreferrer", children: _jsx("img", { src: reactLogo, className: "logo react", alt: "React logo" }) })] }), _jsx("h1", { children: "Vite + React" }), _jsx("div", { className: "", children: _jsx(Example, {}) })] }));
}
export default App;

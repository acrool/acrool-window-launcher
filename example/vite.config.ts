import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        mkcert(),
        react(),
        svgr(),
    ],
    define: {
        'process.env': {
            PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
        },
    },
    server: {
        https: false,
        // port: 443,
        host: '0.0.0.0', // for debug
    },
});

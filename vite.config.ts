import {defineConfig, loadEnv} from 'vite';
import dts from 'vite-plugin-dts';
import {visualizer} from 'rollup-plugin-visualizer';
import eslint from 'vite-plugin-eslint';
import {viteCommonjs} from '@originjs/vite-plugin-commonjs';
import path from 'node:path';


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isDev = env.NODE_ENV !== 'production';
    return {
        plugins: [
            eslint(),
            viteCommonjs(),
            dts({
                insertTypesEntry: true,
            }),
            visualizer() as Plugin,
        ],
        build: {
            rollupOptions: {
                output: {
                    exports: 'named',
                },
            },
            sourcemap: isDev,
            outDir: 'dist',
            lib: {
                entry: path.resolve(__dirname, 'src/index.ts'),
                formats: ['es', 'cjs'],
                fileName: (format,entryName) => `bear-window-launcher.${format}.js`,
            }
        },
    }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import svgLoader from 'vite-svg-loader';
import vitePluginRequire from 'vite-plugin-require';
import { createRequire } from 'node:module';

import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';


const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

function reactVirtualized() {
  return {
    name: 'flat:react-virtualized',
    // Note: we cannot use the `transform` hook here
    //       because libraries are pre-bundled in vite directly,
    //       plugins aren't able to hack that step currently.
    //       so instead we manually edit the file in node_modules.
    //       all we need is to find the timing before pre-bundling.
    configResolved: async () => {
      const require = createRequire(import.meta.url);
      const reactVirtualizedPath = require.resolve('react-virtualized');
      const { pathname: reactVirtualizedFilePath } = new url.URL(reactVirtualizedPath, import.meta.url);
      const file = reactVirtualizedFilePath
        .replace(
          path.join('dist', 'commonjs', 'index.js'),
          path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
        );
      const code = await fs.readFile(file, 'utf-8');
      const modified = code.replace(WRONG_CODE, '');
      await fs.writeFile(file, modified);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), svgLoader(), reactVirtualized(), vitePluginRequire.default()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Alias for src directory
      '@common': path.resolve(__dirname, './src/common'),  // Alias for src directory
      '@components': path.resolve(__dirname, './src/components'),  // Alias for src directory
      '@hooks': path.resolve(__dirname, './src/hooks'),  // Alias for src directory
      '@redux': path.resolve(__dirname, './src/redux'),  // Alias for src directory
      '@slices': path.resolve(__dirname, './src/redux/slices'),  // Alias for src directory
      // Add more aliases as required
    },
  },
});



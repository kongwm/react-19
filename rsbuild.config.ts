// biome-ignore assist/source/organizeImports: <defineConfig>
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginBabel } from '@rsbuild/plugin-babel';

const ReactCompilerConfig = {
  compilationMode: 'strict',
};

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  output: {
    assetPrefix: '/react-19/',
  },
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift([
          'babel-plugin-react-compiler',
          { compilerConfig: ReactCompilerConfig },
        ]);
      },
    }),
  ],

  server: {
    port: 8000,
    base: '/react-19/',
  },
});

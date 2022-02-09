import { dirname, relative } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import { MakeCompulsory } from '@/types/make-required';
import { isDev, port, r } from './scripts/utils';
import windiConfig from './windi.config';

export const sharedConfig: MakeCompulsory<UserConfig, 'plugins'> = {
  root: r('src'),
  resolve: {
    alias: {
      '@/': `${r('src')}/`,
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    AutoImport({
      dts: r('src/auto-imports.d.ts'),
    }),
    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`);
      },
    },
  ],
  optimizeDeps: {
    include: ['webextension-polyfill'],
  },
};

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        background: r('src/background/index.html'),
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
      },
    },
  },
  plugins: [
    ...sharedConfig.plugins,

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      config: windiConfig,
    }),
  ],
}));

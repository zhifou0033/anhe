import { resolve,dirname } from 'node:path'
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            '@rarelyjs/core': resolve(__dirname, 'packages/core/index.ts'),
        },
    },
    define: {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
    },
    test: {
        environment: 'jsdom',
        globals: true,
        reporters: 'dot',
    },
})

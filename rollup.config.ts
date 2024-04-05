import fs from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { packages } from './meta/packages'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import { PluginPure as pure } from 'rollup-plugin-pure'
import type { OutputOptions, Plugin, RollupOptions } from 'rollup'

const require = createRequire(import.meta.url);
const configs: RollupOptions[] = []
const pluginEsbuild = esbuild()
const pluginDts = dts()
const pluginPure = pure({
    functions: ['defineComponent'],
})
console.log(require);

for (const { name, external, build, cjs, mjs, dts, target = 'es2018' } of packages) {
    if (build === false) continue;
    const functionNames = ['index'];
    for (const fn of functionNames) {
        const input = fn === 'index' ? `packages/${name}/index.ts` : `packages/${name}/${fn}/index.ts`
        const output: OutputOptions[] = []

        if (mjs !== false) {
            output.push({
                file: `packages/${name}/dist/${fn}.mjs`,
                format: 'es',
            })
        }

        if (cjs !== false) {
            output.push({
                file: `packages/${name}/dist/${fn}.cjs`,
                format: 'cjs',
            })
        }
        configs.push({
            input,
            output,
            plugins: [
                target ? esbuild({ target }) : pluginEsbuild, json(),
                pluginPure,
            ],
            external: [
                ...(external || []),
            ],
        });
        if (dts !== false) {
            configs.push({
                input,
                output: [
                    { file: `packages/${name}/dist/${fn}.d.cts` },
                    { file: `packages/${name}/dist/${fn}.d.mts` },
                    { file: `packages/${name}/dist/${fn}.d.ts` }, // for node10 compatibility
                ],
                plugins: [
                    pluginDts,
                ],
                external: [
                    ...(external || []),
                ],
            })
        }
    }
}

export default configs

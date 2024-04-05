import path from 'node:path'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { execSync as exec } from 'node:child_process'
import { packages } from '../meta/packages'
import { version } from '../package.json'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const FILES_COPY_ROOT = [
    'LICENSE',
]

const FILES_COPY_LOCAL = [
    'README.md',
    'index.json',
    '*.cjs',
    '*.mjs',
    '*.d.ts',
    '*.d.cts',
    '*.d.mts',
]

async function buildMetaFiles() {
    for (const { name } of packages) {
        const packageRoot = path.resolve(rootDir, 'packages', name)
        const packageDist = path.resolve(packageRoot, 'dist')

        if (name === 'core') await fs.copyFile(path.join(rootDir, 'README.md'), path.join(packageDist, 'README.md'))

        const packageJSON = await fs.readJSON(path.join(packageRoot, 'package.json'))
        for (const key of Object.keys(packageJSON.dependencies || {})) {
            if (key.startsWith('@rarelyjs/'))
                packageJSON.dependencies[key] = version
        }
        await fs.writeJSON(path.join(packageDist, 'package.json'), packageJSON, { spaces: 2 })
    }
}
async function build() {
    exec('pnpm run clean', { stdio: 'inherit' })
    exec('pnpm run build:rollup', { stdio: 'inherit' })
    await buildMetaFiles();
}

build();


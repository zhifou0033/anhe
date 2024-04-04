import fs from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { packages } from './meta/packages'
import dts from 'rollup-plugin-dts'

const require = createRequire(import.meta.url)

interface metaData {
    name: string
    description: string
    build: boolean
    mjs: boolean
    cjs: boolean
    dts: boolean
    external: string[]
}
export const packages: metaData[] = [
    {
        name: 'core',
        description: 'Collection of essential Vue Composition Utilities',
        build: true,
        mjs: true,
        cjs: true,
        dts: true,
        external: [
            '@vueuse/core'
        ]
    }
];

interface metaData {
    name: string,
    description: string,
    external: string[]
}
export const packages: metaData[] = [
    {
        name: 'core',
        description: 'Collection of essential Vue Composition Utilities',
        external: [
            '@vueuse/core'
        ]
    }
];

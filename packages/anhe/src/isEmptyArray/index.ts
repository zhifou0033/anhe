export function isEmptyArray<T>(arr:T):boolean{
    if (!Array.isArray(arr)) return false;
    return arr.length === 0;
}

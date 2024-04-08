export function isEmptyObject(obj:object):boolean{
    if (typeof obj !== 'object' || obj == null) return false;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

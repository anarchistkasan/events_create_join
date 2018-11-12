export const MAX_DESCRIPTION_SYMBOLS = 140;

export const MANDATORY_FIELDS = ["title", "description", "date", "time", "coordinator"];

export function isObjectTruthy(obj) {

    if (obj === null) return false;

    const isEmpty = Object.keys(obj).length === 0 && obj.constructor === Object;

    if (isEmpty) return false;

    let hasValue = false;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            hasValue = !!obj[key];
        }
    }

    return hasValue;
}

export function isObjectEmpty(obj) {
    if (!obj) return true;

    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
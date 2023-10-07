export function createTouched(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        if (Array.isArray(obj[key])) {
            acc[key] = obj[key].map(createTouched);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            acc[key] = createTouched(obj[key]);
        } else {
            acc[key] = true;
        }
        return acc;
    }, {});
}

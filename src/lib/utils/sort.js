function getCompare(s) {
    if (s.startsWith('-')) {
        s = s.substring(1);
        return (a, b) => (a[s] < b[s]) - (a[s] > b[s]);
    }
    return (a, b) => (a[s] > b[s]) - (a[s] < b[s]);
}

export function sort(collection, s) {
    const compare = getCompare(s);
    collection.sort(compare);
}
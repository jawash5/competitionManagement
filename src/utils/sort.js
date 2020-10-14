//排序
export default function sortValue(value, key) {
    value.sort((a, b) => {
        const data1 = a[key];
        const data2 = b[key];
        return data1 - data2;
    })
}
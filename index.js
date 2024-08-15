const oddArray = [1, 3, 56, 121, 343, 356, 400, 450, 678, 987, 1212];
const evenArray = [1, 3, 56, 121, 343, 356, 400, 450, 678, 987];

// oddArray.sort((a, b) => b - a);
// evenArray.sort((a, b) => b - a);

function binarySearch(arr, target, start = 0, end) {
    if (end === undefined) end = arr.length - 1;
    console.log(arr.slice(start, end));
    if (start > end) return false;

    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === target) return true;

    if (arr[mid] > target) return binarySearch(arr, target, start, mid - 1);
    else return binarySearch(arr, target, mid + 1, end);
}
// console.log(binarySearch(oddArray, 1212));
// console.log(binarySearch(evenArray, 1212));

function nLogN(n) {
    const y = n;
    while (n > 1) {
        n = Math.floor(n / 2);
        for (let i = 1; i <= y; i++) {
            console.log(i);
        }
    }
}

console.log(nLogN(100));

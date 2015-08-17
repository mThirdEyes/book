/**
 * 快速排序（Quicksort）的Javascript实现
 * 
 * @author  Yang,junlong at 2015-08-17 15:27:11 build.
 * @version $Id$
 */

var quickSort = function (arr) {
    var len = arr.length;
    if (len <= 1) {
        return arr;
    }

    var pivotIndex = Math.floor(len / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];

    var left = [];
    var right = [];

    for (var i = 0, l = arr.length; i < l; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};


// 测试
var arr = [23, 11, 34, 98, 45, 74, 17, 61, 28, 86, 95]
var res = quickSort(arr);

console.log(res);
/**
 * description
 * 
 * @author  Yang,junlong at 2015-08-17 16:11:05 build.
 * @version $Id$
 */

var bubbleSort = function(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i -1; j++) {
            if (arr[j] > arr[j+1]) {
                var tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
    return arr;
};

// 测试
var arr = [23, 11, 34, 98, 45, 74, 17, 61, 28, 86, 95];
console.log(bubbleSort(arr));
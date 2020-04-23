/***
 * 二维数组查找一个数
 * 两种方法没有哪个查询较快，需要看当前多要查询的位置
 */

/**
 * @param {number[]} nums
 * @return {number} 返回复重复的数字数组
 * 原理：从上往下，从右往左
 * 时间复杂度O(1),空间复杂度O(m+n)
 */
let arr = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
];

function find(nums, target) {
    let rows = nums.length,
        columns = nums[0].length;
    let row = 0;
    column = columns - 1;
    while (row < rows && column > 0) {
        let num = nums[row][column];
        if (target == num) {
            return true;
        } else if (num > target) {
            column--;
        } else {
            row++;
        }
    }
    return false;
}
let time1 = new Date().valueOf();
console.log(find(arr, 9));
let time2 = new Date().valueOf();
console.log(time2, time1, time2 - time1);

// 简单粗暴方式
//时间复杂度O(1),空间复杂度O(mn)
function find2(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums[i].length; j++) {
            if (target == nums[i][j]) {
                return true;
            }
        }
    }
    return false;
}
let time3 = new Date().valueOf();
console.log(find2(arr, 9));
let time4 = new Date().valueOf();
console.log(time4, time3, time4 - time3);

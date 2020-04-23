var nums = [2, 5, 2, 0, 2, 1, 3];

/**
 * @param {number[]} nums
 * @return {number[]} 返回复重复的数字数组
 * 检查数字是否是重复数字
 * 方法1：判断键值是否与当前数是否相等，如果已经有键值和值相等，那么该数为重复数字
 * 适用于数组元素大小范围在数组长度大小内
 * 时间复杂度 O(n), 空间复杂度(1)
 */
function findRepeatNumber(nums) {
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] != i) {
            if (nums[i] === nums[nums[i]]) {
                res.indexOf(nums[i]) == -1 && res.push(nums[i]);
                break;
            }
            let temp = nums[i];
            nums[i] = nums[temp];
            nums[temp] = temp;
        }
    }

    return res;
}
// console.log(findRepeatNumber(nums));

/**
 * @param {number[]} nums
 * @return {number[]} 返回复重复的数字数组
 * 检查数字是否是重复数字
 * 方法2：建立一个hash表去判断
 * 时间复杂度 O(1), 空间复杂度(n)
 */
function hashDuplicate(nums) {
    let hash = [];
    let res = [];

    for (let i = 0; i < nums.length; i++) {
        if (!hash[nums[i]]) {
            hash[nums[i]] = 1;
        } else {
            if (++hash[nums[i]] >= 2) {
                res.indexOf(nums[i]) == -1 && res.push(nums[i]);
            }
        }
    }
    return res;
}
// console.log(hashDuplicate(nums), 888);

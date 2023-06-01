/**
 * https://leetcode.com/problems/array-wrapper/?utm_campaign=DailyD28&utm_medium=Email&utm_source=Daily&gio_link_id=nRbADVD9
 * 
 * 
Example 1:

Input: nums = [[1,2],[3,4]], operation = "Add"
Output: 10
Explanation:
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
Example 2:

Input: nums = [[23,98,42,70]], operation = "String"
Output: "[23,98,42,70]"
Explanation:
const obj = new ArrayWrapper([23,98,42,70]);
String(obj); // "[23,98,42,70]"
Example 3:

Input: nums = [[],[]], operation = "Add"
Output: 0
Explanation:
const obj1 = new ArrayWrapper([]);
const obj2 = new ArrayWrapper([]);
obj1 + obj2; // 0
 

Constraints:

0 <= nums.length <= 1000
0 <= nums[i] <= 1000
Note: nums is the array passed to the constructor
 */

import { run_simple_tests, perform_test } from './common/TestingUtils.js'

/**
 * @param {number[]} nums
 */

// https://leetcode.com/problems/array-wrapper/editorial/?utm_campaign=DailyD28&utm_medium=Email&utm_source=Daily&gio_link_id=nRbADVD9
/**
 * Runtime
60 ms
Beats
57.14%
Memory
43.7 MB
Beats
65.33%
 */
var ArrayWrapper = function(nums) {
    this.nums = nums;
};

ArrayWrapper.prototype.valueOf = function() {
    return this.nums.reduce((a, b) => a+b, 0);
}

ArrayWrapper.prototype.toString = function() {
    return "[" + this.nums.join(",") + "]";
}

/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; // 10
 * String(obj1); // "[1,2]"
 * String(obj2); // "[3,4]"
 */

const tests = [
    {
        input: {
            nums: [[1,2],[3,4]], 
            operation: "Add"
        },
        output: 10
    },
    {
        input: {
            nums: [[23,98,42,70]], 
            operation: "String"
        },
        output: "[23,98,42,70]"
    },
    {
        input: {
            nums: [[],[]], 
            operation: "Add"
        },
        output: 0
    }
];

tests.forEach(test => {
    const wrapper = ArrayWrapper(test.input.nums, test.input.operation);
    // if (test.input.operation )
});
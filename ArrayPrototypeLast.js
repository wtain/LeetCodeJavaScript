/**
 * https://leetcode.com/problems/array-prototype-last/?utm_campaign=DailyD23&utm_medium=Email&utm_source=Daily&gio_link_id=noqbNOw9
 * 
 * Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.
 

Example 1:

Input: nums = [1,2,3]
Output: 3
Explanation: Calling nums.last() should return the last element: 3.
Example 2:

Input: nums = []
Output: -1
Explanation: Because there are no elements, return -1.
 

Constraints:

0 <= arr.length <= 1000
0 <= arr[i] <= 1000
 */

import { perform_test } from './common/TestingUtils.js'


/** Runtime
63 ms
Beats
19.91%
Memory
41.6 MB
Beats
79.14% */
Array.prototype.last = function() {
    if (this.length === 0) {
        return -1;
    }
    return this[this.length-1];
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */


const tests = [
    {
        array: [1,2,3],
        result: 3
    },
    {
        array: [],
        result: -1
    }
];

tests.forEach(test => {
    const res = test.array.last();
    perform_test(res, test.result);
});
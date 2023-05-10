/*
https://leetcode.com/problems/array-reduce-transformation/?utm_campaign=DailyD6&utm_medium=Email&utm_source=Daily&gio_link_id=kojBgyKo

Given an integer array nums, a reducer function fn, and an initial value init, return a reduced array.

A reduced array is created by applying the following operation: val = fn(init, nums[0]), val = fn(val, nums[1]), val = fn(val, nums[2]), ... until every element in the array has been processed. The final value of val is returned.

If the length of the array is 0, it should return init.

Please solve it without using the built-in Array.reduce method.

 

Example 1:

Input: 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
Output: 10
Explanation:
initially, the value is init=0.
(0) + nums[0] = 1
(1) + nums[1] = 3
(3) + nums[2] = 6
(6) + nums[3] = 10
The final answer is 10.
Example 2:

Input: 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100
Output: 130
Explanation:
initially, the value is init=100.
(100) + nums[0]^2 = 101
(101) + nums[1]^2 = 105
(105) + nums[2]^2 = 114
(114) + nums[3]^2 = 130
The final answer is 130.
Example 3:

Input: 
nums = []
fn = function sum(accum, curr) { return 0; }
init = 25
Output: 25
Explanation: For empty arrays, the answer is always init.
 

Constraints:

0 <= nums.length <= 1000
0 <= nums[i] <= 1000
0 <= init <= 1000
*/

import { run_simple_tests } from './common/TestingUtils.js'

/*
Runtime
52 ms
Beats
93.56%
Memory
41.7 MB
Beats
97.43%
*/

/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    var result = init;
    nums.forEach(current => result = fn(result, current));
    return result;
};


const tests = [
    {
        input: [[1,2,3,4], function sum(accum, curr) { return accum + curr; }, 0],
        output: 10
    },
    {
        input: [[1,2,3,4], function sum(accum, curr) { return accum + curr * curr; }, 100],
        output: 130
    },
    {
        input: [[], function sum(accum, curr) { return 0; }, 25],
        output: 25
    }
];

run_simple_tests(reduce, tests);
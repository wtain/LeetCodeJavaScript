/*
https://leetcode.com/problems/apply-transform-over-each-element-in-array/?utm_campaign=DailyD4&utm_medium=Email&utm_source=Daily&gio_link_id=xo040rVo

Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.

The returned array should be created such that returnedArray[i] = fn(arr[i], i).

Please solve it without the built-in Array.map method.

 

Example 1:

Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
Output: [2,3,4]
Explanation:
const newArray = map(arr, plusone); // [2,3,4]
The function increases each value in the array by one. 
Example 2:

Input: arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
Output: [1,3,5]
Explanation: The function increases each value by the index it resides in.
Example 3:

Input: arr = [10,20,30], fn = function constant() { return 42; }
Output: [42,42,42]
Explanation: The function always returns 42.
 

Constraints:

0 <= arr.length <= 1000
-109 <= arr[i] <= 109
fn returns a number
*/

import { run_simple_tests } from './common/TestingUtils.js'

/*
Runtime
61 ms
Beats
39.20%
Memory
42.3 MB
Beats
27.83%
*/

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    var result = [];
    arr.forEach((item, index) => result.push(fn(item, index)));
    // return arr.map(fn);
    return result;
};


const tests = [
    {
        input: [[1,2,3], function plusone(n) { return n + 1; }],
        output: [2,3,4]
    },
    {
        input: [[1,2,3], function plusI(n, i) { return n + i; }],
        output: [1,3,5]
    },
    {
        input: [[10,20,30], function constant() { return 42; }],
        output: [42,42,42]
    }
];

run_simple_tests(map, tests);

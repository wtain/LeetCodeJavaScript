/* 
https://leetcode.com/problems/filter-elements-from-array/?utm_campaign=DailyD5&utm_medium=Email&utm_source=Daily&gio_link_id=JoOOVL8o

Given an integer array arr and a filtering function fn, return a new array with a fewer or equal number of elements.

The returned array should only contain elements where fn(arr[i], i) evaluated to a truthy value.

Please solve it without the built-in Array.filter method.

 

Example 1:

Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
Output: [20,30]
Explanation:
const newArray = filter(arr, fn); // [20, 30]
The function filters out values that are not greater than 10
Example 2:

Input: arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
Output: [1]
Explanation:
fn can also accept the index of each element
In this case, the function removes elements not at index 0
Example 3:

Input: arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }
Output: [-2,0,1,2]
Explanation:
Falsey values such as 0 should be filtered out
 

Constraints:

0 <= arr.length <= 1000
-109 <= arr[i] <= 109

*/

import { run_simple_tests } from './common/TestingUtils.js'

/*
Runtime
58 ms
Beats
58.67%
Memory
42.1 MB
Beats
50.33%
*/

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
 var filter = function(arr, fn) {
    var result = [];
    arr.forEach((item, index) => {
        if (fn(item, index)) {
            result.push(item);
        }
    });
    // return arr.map(fn);
    return result;
};


const tests = [
    {
        input: [[0,10,20,30], function greaterThan10(n) { return n > 10; }],
        output: [20,30]
    },
    {
        input: [[1,2,3], function firstIndex(n, i) { return i === 0; }],
        output: [1]
    },
    {
        input: [[-2,-1,0,1,2], function plusOne(n) { return n + 1 }],
        output: [-2,0,1,2]
    }
];

run_simple_tests(filter, tests);
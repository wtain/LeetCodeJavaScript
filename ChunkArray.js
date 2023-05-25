/**
 * https://leetcode.com/problems/chunk-array/?utm_campaign=DailyD21&utm_medium=Email&utm_source=Daily&gio_link_id=xogkVnzo
 * 
 * Given an array arr and a chunk size size, return a chunked array. A chunked array contains the original elements in arr, but consists of subarrays each of length size. The length of the last subarray may be less than size if arr.length is not evenly divisible by size.

You may assume the array is the output of JSON.parse. In other words, it is valid JSON.

Please solve it without using lodash's _.chunk function.

 

Example 1:

Input: arr = [1,2,3,4,5], size = 1
Output: [[1],[2],[3],[4],[5]]
Explanation: The arr has been split into subarrays each with 1 element.
Example 2:

Input: arr = [1,9,6,3,2], size = 3
Output: [[1,9,6],[3,2]]
Explanation: The arr has been split into subarrays with 3 elements. However, only two elements are left for the 2nd subarray.
Example 3:

Input: arr = [8,5,3,2,6], size = 6
Output: [[8,5,3,2,6]]
Explanation: Size is greater than arr.length thus all elements are in the first subarray.
Example 4:

Input: arr = [], size = 1
Output: []
Explanation: There are no elements to be chunked so an empty array is returned.
 

Constraints:

arr is a valid JSON array
2 <= JSON.stringify(arr).length <= 105
1 <= size <= arr.length + 1
 */

import { run_simple_tests } from './common/TestingUtils.js'

/**
 * Runtime
60 ms
Beats
76.32%
Memory
44.4 MB
Beats
62.13%
 */
/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function(arr, size) {
    let result = [];
    for (let start = 0; start < arr.length; start += size) {
        let end = Math.min(start + size, arr.length);
        result.push(arr.slice(start, end));
    }
    return result;
};

const tests = [
    {
        input: [[1,2,3,4,5], 1],
        output: [[1],[2],[3],[4],[5]]
    },
    {
        input: [[1,9,6,3,2], 3],
        output: [[1,9,6],[3,2]]
    },
    {
        input: [[8,5,3,2,6], 6],
        output: [[8,5,3,2,6]]
    },
    {
        input: [[], 1],
        output: []
    }
];

run_simple_tests(chunk, tests);
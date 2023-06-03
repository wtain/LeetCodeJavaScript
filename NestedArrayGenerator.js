/**
 * https://leetcode.com/problems/nested-array-generator/?utm_campaign=DailyD30&utm_medium=Email&utm_source=Daily&gio_link_id=woVyOjeP
 * 
 * Given a multi-dimensional array of integers, return a generator object which yields integers in the same order as inorder traversal.

A multi-dimensional array is a recursive data structure that contains both integers and other multi-dimensional arrays.

inorder traversal iterates over each array from left to right, yielding any integers it encounters or applying inorder traversal to any arrays it encounters.

 

Example 1:

Input: arr = [[[6]],[1,3],[]]
Output: [6,1,3]
Explanation:
const generator = inorderTraversal(arr);
generator.next().value; // 6
generator.next().value; // 1
generator.next().value; // 3
generator.next().done; // true
Example 2:

Input: arr = []
Output: []
Explanation: There are no integers so the generator doesn't yield anything.
 

Constraints:

0 <= arr.flat().length <= 105
0 <= arr.flat()[i] <= 105
maxNestingDepth <= 105
 

Can you solve this without creating a new flattened version of the array?
 */

import { run_simple_tests, perform_test } from './common/TestingUtils.js'


/**
 * Runtime
220 ms
Beats
53.73%
Memory
92.1 MB
Beats
20.72%
 */
/**
 * @param {Array} arr
 * @return {Generator}
 */
// var inorderTraversal = function*(arr) {
//     for (let item of arr) {
//         if (Array.isArray(item)) {
//             yield* inorderTraversal(item);
//         } else {
//             yield item;
//         }
//     } 
// };

/**
 * Runtime
125 ms
Beats
98.20%
Memory
60.6 MB
Beats
96.62%
 */
// var inorderTraversal = function*(arr) {
//     const stack = [arr];
//     while (stack.length > 0) {
//         const item = stack.pop();
//         if (!Array.isArray(item)) {
//             yield item;
//             continue; 
//         }
//         for (let i = item.length-1; i >= 0; i--) {
//             stack.push(item[i]);
//         }
//     } 
// };


/**
 * Runtime
156 ms
Beats
86.46%
Memory
66.3 MB
Beats
80.66%
 */
var inorderTraversal = function*(arr) {
    yield* arr.flat(Infinity);
};

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */

const tests = [
    {
        arr: [[[6]],[1,3],[]],
        output: [6,1,3]
    },
    {
        arr: [],
        output: []
    }
];

tests.forEach(test => {
    const result = [...inorderTraversal(test.arr)];
    perform_test(result, test.output);
});
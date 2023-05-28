/**
 * https://leetcode.com/problems/group-by/?utm_campaign=DailyD24&utm_medium=Email&utm_source=Daily&gio_link_id=a9a5VZ69
 * 
 * Write code that enhances all arrays such that you can call the array.groupBy(fn) method on any array and it will return a grouped version of the array.

A grouped array is an object where each key is the output of fn(arr[i]) and each value is an array containing all items in the original array with that key.

The provided callback fn will accept an item in the array and return a string key.

The order of each value list should be the order the items appear in the array. Any order of keys is acceptable.

Please solve it without lodash's _.groupBy function.

 

Example 1:

Input: 
array = [
  {"id":"1"},
  {"id":"1"},
  {"id":"2"}
], 
fn = function (item) { 
  return item.id; 
}
Output: 
{ 
  "1": [{"id": "1"}, {"id": "1"}],   
  "2": [{"id": "2"}] 
}
Explanation:
Output is from array.groupBy(fn).
The selector function gets the "id" out of each item in the array.
There are two objects with an "id" of 1. Both of those objects are put in the first array.
There is one object with an "id" of 2. That object is put in the second array.
Example 2:

Input: 
array = [
  [1, 2, 3],
  [1, 3, 5],
  [1, 5, 9]
]
fn = function (list) { 
  return String(list[0]); 
}
Output: 
{ 
  "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]] 
}
Explanation:
The array can be of any type. In this case, the selector function defines the key as being the first element in the array. 
All the arrays have 1 as their first element so they are grouped together.
{
  "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]]
}
Example 3:

Input: 
array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
fn = function (n) { 
  return String(n > 5);
}
Output:
{
  "true": [6, 7, 8, 9, 10],
  "false": [1, 2, 3, 4, 5]
}
Explanation:
The selector function splits the array by whether each number is greater than 5.
 

Constraints:

0 <= array.length <= 105
fn returns a string
 */

import { run_simple_tests, perform_test } from './common/TestingUtils.js'


/** Runtime
151 ms
Beats
42.13%
Memory
60.5 MB
Beats
93.68% */
/**
 * @param {Function} fn
 * @return {Array}
 */
// Array.prototype.groupBy = function(fn) {
//     let result = {};
//     this.forEach(item => {
//         const group = fn(item);
//         if (group in result) {
//             result[group].push(item);
//         } else {
//             result[group] = [item];
//         }
//     });
//     return result;
// };

/**
 * Runtime
161 ms
Beats
18.7%
Memory
65.5 MB
Beats
35.9%
 */
// https://leetcode.com/problems/group-by/editorial/?utm_campaign=DailyD24&utm_medium=Email&utm_source=Daily&gio_link_id=a9a5VZ69
Array.prototype.groupBy = function(fn) {
    return this.reduce((accum, item) => {
        const key = fn(item);
        accum[key] ||= [];
        accum[key].push(item);
        return accum;
    }, {});
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */

const tests = [
    {
        input: {
            array: [
                {"id":"1"},
                {"id":"1"},
                {"id":"2"}
            ], 
            func: function (item) { 
                return item.id; 
            },
        },
        output: 
        { 
            "1": [{"id": "1"}, {"id": "1"}],   
            "2": [{"id": "2"}] 
        }
    },
    {
        input: {
            array: [
                [1, 2, 3],
                [1, 3, 5],
                [1, 5, 9]
            ],
            func: function (list) { 
                return String(list[0]); 
            }
        },
        output: 
        { 
            "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]] 
        }
    },
    {
        input: {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            func: function (n) { 
                return String(n > 5);
            }
        },
        output:
        {
            "true": [6, 7, 8, 9, 10],
            "false": [1, 2, 3, 4, 5]
        }
    }
];

tests.forEach(test => {
    const result = test.input.array.groupBy(test.input.func);
    console.log(`Result: ${result}`);
    perform_test(result, test.output);
});
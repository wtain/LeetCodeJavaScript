/**
 * https://leetcode.com/problems/array-of-objects-to-matrix/?utm_campaign=DailyD19&utm_medium=Email&utm_source=Daily&gio_link_id=QPDw0JVR
 * 
 * Write a function that converts an array of objects arr into a matrix m.

arr is an array of objects or arrays. Each item in the array can be deeply nested with child arrays and child objects. It can also contain numbers, strings, booleans, and null values.

The first row m should be the column names. If there is no nesting, the column names are the unique keys within the objects. If there is nesting, the column names are the respective paths in the object separated by ".".

Each of the remaining rows corresponds to an object in arr. Each value in the matrix corresponds to a value in an object. If a given object doesn't contain a value for a given column, the cell should contain an empty string "".

The colums in the matrix should be in lexographically ascending order.

 

Example 1:

Input: 
arr = [
  {"b": 1, "a": 2},
  {"b": 3, "a": 4}
]
Output: 
[
  ["a", "b"],
  [2, 1],
  [4, 3]
]

Explanation:
There are two unique column names in the two objects: "a" and "b".
"a" corresponds with [2, 4].
"b" coresponds with [1, 3].
Example 2:

Input: 
arr = [
  {"a": 1, "b": 2},
  {"c": 3, "d": 4},
  {}
]
Output: 
[
  ["a", "b", "c", "d"],
  [1, 2, "", ""],
  ["", "", 3, 4],
  ["", "", "", ""]
]

Explanation:
There are 4 unique column names: "a", "b", "c", "d".
The first object has values associated with "a" and "b".
The second object has values associated with "c" and "d".
The third object has no keys, so it is just a row of empty strings.
Example 3:

Input: 
arr = [
  {"a": {"b": 1, "c": 2}},
  {"a": {"b": 3, "d": 4}}
]
Output: 
[
  ["a.b", "a.c", "a.d"],
  [1, 2, ""],
  [3, "", 4]
]

Explanation:
In this example, the objects are nested. The keys represent the full path to each value separated by periods.
There are three paths: "a.b", "a.c", "a.d".
Example 4:

Input: 
arr = [
  [{"a": null}],
  [{"b": true}],
  [{"c": "x"}]
]
Output: 
[
  ["0.a", "0.b", "0.c"],
  [null, "", ""],
  ["", true, ""],
  ["", "", "x"]
]

Explanation:
Arrays are also considered objects with their keys being their indices.
Each array has one element so the keys are "0.a", "0.b", and "0.c".
Example 5:

Input: 
arr = [
  {},
  {},
  {},
]
Output: 
[
  [],
  [],
  [],
  []
]

Explanation:
There are no keys so every row is an empty array.
 

Constraints:

1 <= arr.length <= 1000
unique keys <= 1000
 */

import { perform_test } from './common/TestingUtils.js'

/**
 * @param {Array} arr
 * @return {Matrix}
 */
// WRONG
// var jsonToMatrix = function(arr) {
//     let columns = new Map();
//     arr.forEach(obj => {
//         Object.keys(obj).forEach(key => columns.set(key, columns.size));
//     });
//     let firstRow = [];
//     let index = 0
//     columns.forEach((value, key) => {
//         firstRow.push(key);
//         columns.set(key, index++);
//     });
//     let result = [];
//     result.push(firstRow);

//     arr.forEach(obj => {
//         let row = [];
//         columns.forEach((value, column) => {
//             if (obj[column] !== undefined) {
//                 row.push(`${obj[column]}`);
//             } else {
//                 row.push('');
//             }
//         });
//         result.push(row);
//     });

//     return result;
// };

// https://leetcode.com/problems/array-of-objects-to-matrix/editorial/?utm_campaign=DailyD19&utm_medium=Email&utm_source=Daily&gio_link_id=QPDw0JVR
/**
 * Runtime
423 ms
Beats
72.43%
Memory
91.1 MB
Beats
96.1%
 */
// var jsonToMatrix = function(arr) {
//     const isObject = x => (x !== null && typeof x === 'object');

//     const getKeys = (object) => {
//         if (!isObject(object)) {
//             return [''];
//         }
//         const result = [];
//         for (const key of Object.keys(object)) {
//             const childKeys = getKeys(object[key]);
//             for (const childKey of childKeys) {
//                 result.push(childKey ? `${key}.${childKey}` : key);
//             }
//         }
//         return result;
//     }

//     const keySet = arr.reduce((acc, curr) => {
//         getKeys(curr).forEach(k => acc.add(k));
//         return acc;
//     }, new Set());

//     const keys = Array.from(keySet).sort();

//     const getValue = (obj, path) => {
//         const paths = path.split('.');
//         let i = 0;
//         let value = obj;
//         while (i < paths.length) {
//             if (!isObject(value)) {
//                 break;
//             }
//             value = value[paths[i++]];
//         }
//         if (i < paths.length || isObject(value) || value === undefined) {
//             return '';
//         }
//         return value;
//     };

//     const matrix = [keys];
//     arr.forEach(obj => {
//         matrix.push(keys.map(key => getValue(obj, key)));
//     });

//     return matrix;
// };


/**
 * Runtime
561 ms
Beats
41.20%
Memory
133.5 MB
Beats
5.32%
 */
// https://leetcode.com/problems/array-of-objects-to-matrix/editorial/?utm_campaign=DailyD19&utm_medium=Email&utm_source=Daily&gio_link_id=QPDw0JVR
// var jsonToMatrix = function(arr) {
//     const isObject = elem => elem instanceof Object;

//     const getSub = (obj) => {
//         const map = new Map();

//         const setMap = (elem, preKey) => {
//             if (!isObject(elem)) {
//                 map.set(preKey, elem);
//                 return;
//             }

//             const subMap = getSub(elem);
//             for (const entry of subMap.entries()) {
//                 const symbol = `${preKey}.${entry[0]}`;
//                 map.set(symbol, entry[1]);
//             }
//         }

//         if (Array.isArray(obj)) {
//             for (let i = 0; i < obj.length; ++i) {
//                 setMap(obj[i], `${i}`);
//             }
//         } else {
//             for (const key of Object.keys(obj)) {
//                 setMap(obj[key], key);
//             }
//         }
//         return map;
//     };

//     const map = getSub(arr);
//     const set = new Set();

//     for (const key of map.keys()) {
//         const i = key.indexOf('.');
//         const symbol = key.slice(i+1);
//         set.add(symbol);
//     }

//     const keys = [...set].sort((a, b) => a < b ? -1 : 1);
//     const len = arr.length;
//     const matrix = [keys];

//     for (let i = 1; i <= len; ++i) {
//         if (keys.length === 0) {
//             matrix[i] = [];
//             continue;
//         }

//         for (let j = 0; j < keys.length; ++j) {
//             const key = `${i-1}.${keys[j]}`;
//             if (!matrix[i]) {
//                 matrix[i] = []
//             }
//             matrix[i][j] = map.has(key) ? map.get(key) : "";
//         }
//     }

//     return matrix;
// };


/**
 * Runtime
579 ms
Beats
40.20%
Memory
96.2 MB
Beats
81.6%
*/
// https://leetcode.com/problems/array-of-objects-to-matrix/editorial/?utm_campaign=DailyD19&utm_medium=Email&utm_source=Daily&gio_link_id=QPDw0JVR
var jsonToMatrix = function(arr) {
    const colMap = new Map();
    const res = [[]];

    const sortCols = (matrix) => {
        const sortedColNames = matrix[0].slice().sort((a, b) => a.localeCompare(b));

        const sortedMatrix = matrix.map((row) => {
            const sortedRow = [];
            for (let i = 0; i < sortedColNames.length; ++i) {
                const colIndex = matrix[0].indexOf(sortedColNames[i]);
                sortedRow.push(row[colIndex]);
            }
            return sortedRow;
        });

        return sortedMatrix;
    };

    for (let i = 0; i < arr.length; ++i) {
        const stack = [[arr[i], []]];
        res.push(Array(colMap.size).fill(''));

        while (stack.length > 0) {
            const [front, path] = stack.pop();
            
            if (typeof front === 'object' && front !== null) {
                const keys = Object.keys(front);

                for (let j = keys.length-1; j >= 0; --j) {
                    stack.push([front[keys[j]], path.concat(keys[j])]);
                }
            } else if (Array.isArray(front)) {
                for (let j = front.length-1; j >= 0; --j) {
                    stack.push([front[j], path.concat(j)]);
                }
            } else {
                let pathStr = path.join('.');

                if (!colMap.has(pathStr)) {
                    res[0].push(pathStr);
                    colMap.set(pathStr, res[0].length - 1);

                    for (let j = 1; j < res.length; ++j) {
                        res[j][res[0].length-1] = '';
                    }
                }

                let j = colMap.get(pathStr);
                res[i+1][j] = front;
            }
        }
    }

    return sortCols(res);
};

const tests = [
    {
        arr: [
            {"b": 1, "a": 2},
            {"b": 3, "a": 4}
          ],
        output: [
            ["a", "b"],
            [2, 1],
            [4, 3]
          ]          
    },
    {
        arr: [
            {"a": 1, "b": 2},
            {"c": 3, "d": 4},
            {}
          ],
        output: 
          [
            ["a", "b", "c", "d"],
            [1, 2, "", ""],
            ["", "", 3, 4],
            ["", "", "", ""]
          ]
    },
    {
        arr: [
            {"a": {"b": 1, "c": 2}},
            {"a": {"b": 3, "d": 4}}
          ],
        output: 
          [
            ["a.b", "a.c", "a.d"],
            [1, 2, ""],
            [3, "", 4]
          ]
    },
    {
        arr: [
            [{"a": null}],
            [{"b": true}],
            [{"c": "x"}]
          ],
        output: 
          [
            ["0.a", "0.b", "0.c"],
            [null, "", ""],
            ["", true, ""],
            ["", "", "x"]
          ]     
    },
    {
        arr: [
            {},
            {},
            {},
          ],
        output: 
          [
            [],
            [],
            [],
            []
          ]
    }
];

tests.forEach(test => {
    const result = jsonToMatrix(test.arr);
    perform_test(result, test.output);
});

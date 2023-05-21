/**
 * https://leetcode.com/problems/json-deep-equal/?utm_campaign=DailyD17&utm_medium=Email&utm_source=Daily&gio_link_id=nP2127dR
 * 
 * Given two objects o1 and o2, check if they are deeply equal.

For two objects to be deeply equal, they must contain the same keys, and the associated values must also be deeply equal. Two objects are also considered deeply equal if they pass the === equality check.

You may assume both objects are the output of JSON.parse. In other words, they are valid JSON.

Please solve it without using lodash's _.isEqual() function.

 

Example 1:

Input: o1 = {"x":1,"y":2}, o2 = {"x":1,"y":2}
Output: true
Explanation: The keys and values match exactly.
Example 2:

Input: o1 = {"y":2,"x":1}, o2 = {"x":1,"y":2}
Output: true
Explanation: Although the keys are in a different order, they still match exactly.
Example 3:

Input: o1 = {"x":null,"L":[1,2,3]}, o2 = {"x":null,"L":["1","2","3"]}
Output: false
Explanation: The array of numbers is different from the array of strings.
Example 4:

Input: o1 = true, o2 = false
Output: false
Explanation: true !== false
 

Constraints:

1 <= JSON.stringify(o1).length <= 105
1 <= JSON.stringify(o2).length <= 105
maxNestingDepth <= 1000
 */

import { perform_test } from './common/TestingUtils.js'

/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
/**
 * Runtime
84 ms
Beats
33.8%
Memory
51.1 MB
Beats
13.73%
 */
// var areDeeplyEqual = function(o1, o2) {
//     if (typeof o1 !== typeof o2) {
//         return false;
//     }
//     if (o1 === null || o2 === null) {
//         return o1 === null && o2 === null;
//     }
//     if (Array.isArray(o1) !== Array.isArray(o2)) {
//         return false;
//     }
//     if (typeof o1 === "object") {
//         if (Object.keys(o1).sort().toString() !== Object.keys(o2).sort().toString()) {
//             return false;
//         }
//         return Object.keys(o1).every(key => areDeeplyEqual(o1[key], o2[key]));
//     }
//     return o1 === o2;
// };


/**
 * Runtime
75 ms
Beats
66.77%
Memory
46.2 MB
Beats
62.51%
 */
// https://leetcode.com/problems/json-deep-equal/editorial/?utm_campaign=DailyD17&utm_medium=Email&utm_source=Daily&gio_link_id=nP2127dR
// var areDeeplyEqual = function(o1, o2) {
//     if (o1 === o2) {
//         return true;
//     }
//     if (o1 === null || o2 === null) {
//         return false;
//     }
//     if (String(o1) !== String(o2)) {
//         return false;
//     }
//     if (typeof o1 !== 'object') {
//         return o1 === o2;
//     }
//     if (Array.isArray(o1)) {
//         if (o1.length !== o2.length) {
//             return false;
//         }

//         for (let i = 0; i < o1.length; i++) {
//             if (!areDeeplyEqual(o1[i], o2[i])) {
//                 return false;
//             }
//         }

//         return true;
//     }
//     if (Object.keys(o1).length !== Object.keys(o2).length) {
//         return false;
//     }
//     for (const key in o1) {
//         if (!areDeeplyEqual(o1[key], o2[key])) {
//             return false;
//         }
//     }
//     return true;
// };


/**
 * Runtime
88 ms
Beats
24.56%
Memory
47.3 MB
Beats
45.16%
 */
// var areDeeplyEqual = function(o1, o2) {
//     var objs = [[o1, o2]];

//     while (objs.length) {
//         [o1, o2] = objs.pop();

//         if (o1 === o2) {
//             continue;
//         }

//         if (typeof o1 !== 'object' || typeof o2 !== 'object') {
//             return false;
//         }

//         if (Array.isArray(o1) !== Array.isArray(o2)) {
//             return false;
//         }

//         const keys1 = Object.keys(o1);
//         const keys2 = Object.keys(o2);

//         if (keys1.length !== keys2.length) {
//             return false;
//         }
//         for (const key of keys1) {
//             if (!(key in o2)) {
//                 return false;
//             }
//             objs.push([o1[key], o2[key]]);
//         }
//     }

//     return true;
// };


/**
 * Runtime
144 ms
Beats
8.77%
Memory
51.3 MB
Beats
13.28%
 */
function helper(key, value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.fromEntries(Object.entries(value).sort());
    }
    return value;
}

var areDeeplyEqual = function(o1, o2) {
    const s1 = JSON.stringify(o1, helper);
    const s2 = JSON.stringify(o2, helper);
    return s1 === s2;
};

const tests = [
    {
        o1: {"0":1},
        o2: [1],
        result: false
    },
    {
        o1: {"x":1,"y":2}, 
        o2: {"x":1,"y":2},
        result: true
    },
    {
        o1: {"y":2,"x":1}, 
        o2: {"x":1,"y":2},
        result: true
    },
    {
        o1: {"x":null,"L":[1,2,3]}, 
        o2: {"x":null,"L":["1","2","3"]},
        result: false
    },
    {
        o1: true, 
        o2: false,
        result: false
    }
];

tests.forEach(test => {
    const result = areDeeplyEqual(test.o1, test.o2);
    perform_test(result, test.result);
});
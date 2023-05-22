/**
 * https://leetcode.com/problems/convert-object-to-json-string/?utm_campaign=DailyD18&utm_medium=Email&utm_source=Daily&gio_link_id=woVyOn5P
 * 
 * Given an object, return a valid JSON string of that object. You may assume the object only inludes strings, integers, arrays, objects, booleans, and null. The returned string should not include extra spaces. The order of keys should be the same as the order returned by Object.keys().

Please solve it without using the built-in JSON.stringify method.

 

Example 1:

Input: object = {"y":1,"x":2}
Output: {"y":1,"x":2}
Explanation: 
Return the JSON representation.
Note that the order of keys should be the same as the order returned by Object.keys().
Example 2:

Input: object = {"a":"str","b":-12,"c":true,"d":null}
Output: {"a":"str","b":-12,"c":true,"d":null}
Explanation:
The primitives of JSON are strings, numbers, booleans, and null.
Example 3:

Input: object = {"key":{"a":1,"b":[{},null,"Hello"]}}
Output: {"key":{"a":1,"b":[{},null,"Hello"]}}
Explanation:
Objects and arrays can include other objects and arrays.
Example 4:

Input: object = true
Output: true
Explanation:
Primitive types are valid inputs.
 

Constraints:

object includes strings, integers, booleans, arrays, objects, and null
1 <= JSON.stringify(object).length <= 105
maxNestingLevel <= 1000
all strings will only contain alphanumeric characters
 */


import { perform_test } from './common/TestingUtils.js'

/**
 * Runtime
99 ms
Beats
30.43%
Memory
75.7 MB
Beats
13.88%
 */
/**
 * @param {any} object
 * @return {string}
 */
var jsonStringify = function(object) {
    if (object === null) {
        return "null";
    }
    if (typeof object === 'object') {
        if (Array.isArray(object)) {
            return "[" + object.map(v => jsonStringify(v)).join(",") + "]";
        } else {
            return "{" + Object.keys(object).map(key => {
                return `"${key}":${jsonStringify(object[key])}`
            }).join(",") + "}";
        }
    }
    if (typeof object === 'string') {
        return `"${object}"`;
    }
    return `${object}`;
};


const tests = [
    {
        object: {"y":1,"x":2},
        result: '{"y":1,"x":2}'
    },
    {
        object: {"a":"str","b":-12,"c":true,"d":null},
        result: '{"a":"str","b":-12,"c":true,"d":null}'
    },
    {
        object: {"key":{"a":1,"b":[{},null,"Hello"]}},
        result: '{"key":{"a":1,"b":[{},null,"Hello"]}}'
    },
    {
        object: true,
        result: 'true'
    }
];

tests.forEach(test => {
    const result = jsonStringify(test.object);
    console.log(`${result}`);
    perform_test(result, test.result);
});
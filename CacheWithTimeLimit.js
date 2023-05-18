/**
 * https://leetcode.com/problems/cache-with-time-limit/?utm_campaign=DailyD14&utm_medium=Email&utm_source=Daily&gio_link_id=korbYD3o
 * 
 * Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.

The class has three public methods:

set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.

get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.

count(): returns the count of un-expired keys.

 

Example 1:

Input: 
["TimeLimitedCache", "set", "get", "count", "get"]
[[], [1, 42, 100], [1], [], [1]]
[0, 0, 50, 50, 150]
Output: [null, false, 42, 1, -1]
Explanation:
At t=0, the cache is constructed.
At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The value doesn't exist so false is returned.
At t=50, key=1 is requested and the value of 42 is returned.
At t=50, count() is called and there is one active key in the cache.
At t=100, key=1 expires.
At t=150, get(1) is called but -1 is returned because the cache is empty.
Example 2:

Input: 
["TimeLimitedCache", "set", "set", "get", "get", "get", "count"]
[[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []]
[0, 0, 40, 50, 120, 200, 250]
Output: [null, false, true, 50, 50, -1]
Explanation:
At t=0, the cache is constructed.
At t=0, a key-value pair (1: 42) is added with a time limit of 50ms. The value doesn't exist so false is returned.
At t=40, a key-value pair (1: 50) is added with a time limit of 100ms. A non-expired value already existed so true is returned and the old value was overwritten.
At t=50, get(1) is called which returned 50.
At t=120, get(1) is called which returned 50.
At t=140, key=1 expires.
At t=200, get(1) is called but the cache is empty so -1 is returned.
At t=250, count() returns 0 because the cache is empty.
 

Constraints:

0 <= key <= 109
0 <= value <= 109
0 <= duration <= 1000
total method calls will not exceed 100
 */

import { perform_test } from './common/TestingUtils.js'


/**
 * Runtime
52 ms
Beats
92.9%
Memory
41.3 MB
Beats
98.20%
 */

// var TimeLimitedCache = function() {
//     this.cache = new Map();
// };

// /** 
//  * @param {number} key
//  * @param {number} value
//  * @param {number} time until expiration in ms
//  * @return {boolean} if un-expired key already existed
//  */
// TimeLimitedCache.prototype.set = function(key, value, duration) {
//     var result = false;
//     if (this.cache.has(key)) {
//         clearTimeout(this.cache.get(key).timeout);
//         result = true;
//     }
//     const timeout = setTimeout(() => {
//         this.cache.delete(key);
//     }, duration);
//     this.cache.set(key, { value, timeout });
//     return result;
// };

// /** 
//  * @param {number} key
//  * @return {number} value associated with key
//  */
// TimeLimitedCache.prototype.get = function(key) {
//     if (this.cache.has(key)) {
//         return this.cache.get(key).value;
//     }
//     return -1;
// };

// /** 
//  * @return {number} count of non-expired keys
//  */
// TimeLimitedCache.prototype.count = function() {
//     return this.cache.size;
// };


/**
 * Runtime
64 ms
Beats
33.96%
Memory
41.8 MB
Beats
67.39%
 */
// class TimeLimitedCache {
//     cache = new Map();

//     /** 
//      * @param {number} key
//      * @param {number} value
//      * @param {number} time until expiration in ms
//      * @return {boolean} if un-expired key already existed
//      */
//     set(key, value, duration) {
//         var result = false;
//         if (this.cache.has(key)) {
//             clearTimeout(this.cache.get(key).timeout);
//             result = true;
//         }
//         const timeout = setTimeout(() => {
//             this.cache.delete(key);
//         }, duration);
//         this.cache.set(key, { value, timeout });
//         return result;
//     };

//     /** 
//      * @param {number} key
//      * @return {number} value associated with key
//      */
//     get(key) {
//         if (this.cache.has(key)) {
//             return this.cache.get(key).value;
//         }
//         return -1;
//     };

//     /** 
//      * @return {number} count of non-expired keys
//      */
//     count() {
//         return this.cache.size;
//     };
// };


/**
 * Runtime
63 ms
Beats
40.27%
Memory
41.5 MB
Beats
90.15%
 */
// class TimeLimitedCache {
//     cache = new Map();

//     /** 
//      * @param {number} key
//      * @param {number} value
//      * @param {number} time until expiration in ms
//      * @return {boolean} if un-expired key already existed
//      */
//     set(key, value, duration) {
//         const hasUnexpiredValue = key in this.cache && Date.now() < this.cache[key].expiration;

//         this.cache[key] = { value, expiration: Date.now() + duration }
//         return hasUnexpiredValue;
//     };

//     /** 
//      * @param {number} key
//      * @return {number} value associated with key
//      */
//     get(key) {
//         if (this.cache[key] === undefined) {
//             return -1;
//         }
//         if (Date.now() > this.cache[key].expiration) {
//             return -1;
//         }
//         return this.cache[key].value;
//     };

//     /** 
//      * @return {number} count of non-expired keys
//      */
//     count() {
//         let count = 0;
//         for (const entry of Object.values(this.cache)) {
//             if (Date.now() < entry.expiration) {
//                 count ++;
//             }
//         }
//         return count;
//     };
// };


/**
 * Runtime
71 ms
Beats
7.62%
Memory
41.9 MB
Beats
67.39%
 */
class TimeLimitedCache {
    cache = {};
    queue = new MinPriorityQueue();
    size = 0;

    handleExpiredData() {
        const now = Date.now();
        while (this.queue.size() > 0 && this.queue.front().priority < now) {
            const entry = this.queue.dequeue().element;
            if (!entry.overwritten) {
                delete this.cache[entry.key]
                this.size --;
            }
        }
    }

    /** 
     * @param {number} key
     * @param {number} value
     * @param {number} time until expiration in ms
     * @return {boolean} if un-expired key already existed
     */
    set(key, value, duration) {
        this.handleExpiredData();
        const hasVal = key in this.cache;
        if (hasVal) {
            this.cache[key].overwritten = true;
        } else {
            this.size ++;
        }
        const expiration = Date.now() + duration;
        const entry = { key, value, expiration, overwritten: false };
        this.cache[key] = entry;
        this.queue.enqueue(entry, expiration);
        return hasVal
    };

    /** 
     * @param {number} key
     * @return {number} value associated with key
     */
    get(key) {
        this.handleExpiredData();
        if (this.cache[key] === undefined) {
            return -1;
        }
        return this.cache[key].value;
    };

    /** 
     * @return {number} count of non-expired keys
     */
    count() {
        this.handleExpiredData();
        return this.size;
    };
};

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */

const tests = [
    {
        function: ["TimeLimitedCache", "set", "get", "count", "get"],
        input: [[], [1, 42, 100], [1], [], [1]],
        duration: [0, 0, 50, 50, 150],
        output: [null, false, 42, 1, -1]
    },
    {
        function: ["TimeLimitedCache", "set", "set", "get", "get", "get", "count"],
        input: [[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []],
        duration: [0, 0, 40, 50, 120, 200, 250],
        output: [null, false, true, 50, 50, -1]
    }
];

async function sleep(millis) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, millis);
    });
}

tests.forEach((test, index) => {
    console.log(`Running test ${(index+1)}`);
    var obj = TimeLimitedCache();
    test.input.slice(1).forEach(async (input, index) => {
        await sleep(test.duration);
        const result = obj[test.function[index]](...input);
        const output = test.output[index];
        perform_test(result, output);
    });
});

 // run_functional_tests(TimeLimitedCache, )
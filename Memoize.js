/*
https://leetcode.com/problems/memoize/?utm_campaign=DailyD9&utm_medium=Email&utm_source=Daily&gio_link_id=qR5E7eAR

Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

You can assume there are 3 possible input functions: sum, fib, and factorial.

sum accepts two integers a and b and returns a + b.
fib accepts a single integer n and returns 1 if n <= 1 or fib(n - 1) + fib(n - 2) otherwise.
factorial accepts a single integer n and returns 1 if n <= 1 or factorial(n - 1) * n otherwise.
 

Example 1:

Input
"sum"
["call","call","getCallCount","call","getCallCount"]
[[2,2],[2,2],[],[1,2],[]]
Output
[4,4,1,3,2]

Explanation
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // Returns 4. sum() was called as (2, 2) was not seen before.
memoizedSum(2, 2); // Returns 4. However sum() was not called because the same inputs were seen before.
// Total call count: 1
memoizedSum(1, 2); // Returns 3. sum() was called as (1, 2) was not seen before.
// Total call count: 2
Example 2:

Input
"factorial"
["call","call","call","getCallCount","call","getCallCount"]
[[2],[3],[2],[],[3],[]]
Output
[2,6,2,2,6,2]

Explanation
const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // Returns 2.
memoFactorial(3); // Returns 6.
memoFactorial(2); // Returns 2. However factorial was not called because 2 was seen before.
// Total call count: 2
memoFactorial(3); // Returns 6. However factorial was not called because 3 was seen before.
// Total call count: 2
Example 3:

Input
"fib"
["call","getCallCount"]
[[5],[]]
Output
[8,1]

Explanation
fib(5) = 8
// Total call count: 1

 

Constraints:

0 <= a, b <= 105
1 <= n <= 10
at most 105 function calls
at most 105 attempts to access callCount
input function is sum, fib, or factorial
*/


/**
 * Runtime
494 ms
Beats
6.51%
Memory
103.5 MB
Beats
38.42%
 */

/**
 * @param {Function} fn
 */
// function memoize(fn) {

//     // var func;

//     // if (fn === "sum") {
//     //     func = sum;
//     // } else if (fn === "fib") {
//     //     func = fib;
//     // } else if (fn === "factorial") {
//     //     func = factorial;
//     // }

//     var cache = {};

//     return function(...args) {
//         const key = [...args];
//         if (!(key in cache)) {
//             cache[key] = fn(...args);
//         }
//         return cache[key];
//     }
// }


/**
 * Runtime
323 ms
Beats
96.22%
Memory
106.5 MB
Beats
34.16%
 */
function memoize(fn) {

    var cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */


const tests = [
    {
        initParams: "sum",
        inputs: ["call","call","getCallCount","call","getCallCount"],
        params: [[2,2],[2,2],[],[1,2],[]],
        outputs: [4,4,1,3,2]
    },
    {
        initParams: "factorial",
        inputs: ["call","call","call","getCallCount","call","getCallCount"],
        params: [[2],[3],[2],[],[3],[]],
        outputs: [2,6,2,2,6,2]
    },
    {
        initParams: "fib",
        inputs: ["call","getCallCount"],
        params: [[5],[]],
        outputs: [8,1]
    }
];


var callCount = 0

function sum(a, b) {
    callCount ++;
    return a + b;
}

function fib(n) {
    callCount ++;
    if (n <= 1) {
        return 1;
    }
    return fib(n-1) + fib(n-2);
}

function factorial(n) {
    callCount ++;
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n-1);
}

function get_function(fn) {
    var func;

    if (fn === "sum") {
        func = sum;
    } else if (fn === "fib") {
        func = fib;
    } else if (fn === "factorial") {
        func = factorial;
    }
    callCount = 0;

    return func;
}

tests.forEach((test, index) => {
    console.log(`Running test ${index+1}`);
    const obj = memoize(get_function(test.initParams));
    test.inputs.forEach((f, idx) => {
        if (f === "call") {
            const result = obj(...test.params[idx]);
            if (result === test.outputs[idx]) {
                console.log('PASSED');
            } else {
                console.log('FAILED');
            }
        } else if (f === "getCallCount") {
            console.log(`Call count: ${callCount}`)
        }
    });
});
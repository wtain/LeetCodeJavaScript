/**
 * https://leetcode.com/problems/throttle/?utm_campaign=DailyD16&utm_medium=Email&utm_source=Daily&gio_link_id=DPWg0Z4P
 * 
 * Given a function fn and a time in milliseconds t, return a throttled version of that function.

A throttled function is first called without delay and then, for a time interval of t milliseconds, can't be executed but should store the latest function arguments provided to call fn with them after the end of the delay.

For instance, t = 50ms, and the function was called at 30ms, 40ms, and 60ms. The first function call would block calling functions for the following t milliseconds. The second function call would save arguments, and the third call arguments should overwrite currently stored arguments from the second call because the second and third calls are called before 80ms. Once the delay has passed, the throttled function should be called with the latest arguments provided during the delay period, and it should also create another delay period of 80ms + t.

Throttle DiagramThe above diagram shows how throttle will transform events. Each rectangle represents 100ms and the throttle time is 400ms. Each color represents a different set of inputs.

 

Example 1:

Input: t = 100, calls = [{"t":20,"inputs":[1]}]
Output: [{"t":20,"inputs":[1]}]
Explanation: The 1st call is always called without delay
Example 2:

Input: t = 50, calls = [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]}]
Output: [{"t":50,"inputs":[1]},{"t":100,"inputs":[2]}]
Explanation: 
The 1st is called a function with arguments (1) without delay.
The 2nd is called at 75ms, within the delay period because 50ms + 50ms = 100ms, so the next call can be reached at 100ms. Therefore, we save arguments from the 2nd call to use them at the callback of the 1st call.
Example 3:

Input: t = 70, calls = [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]},{"t":90,"inputs":[8]},{"t": 140, "inputs":[5,7]},{"t": 300, "inputs": [9,4]}]
Output: [{"t":50,"inputs":[1]},{"t":120,"inputs":[8]},{"t":190,"inputs":[5,7]},{"t":300,"inputs":[9,4]}]
Explanation: 
The 1st is called a function with arguments (1) without delay.
The 2nd is called at 75ms within the delay period because 50ms + 70ms = 120ms, so it should only save arguments. 
The 3rd is also called within the delay period, and because we need just the latest function arguments, we overwrite previous ones. After the delay period, we do a callback at 120ms with saved arguments. That callback makes another delay period of 120ms + 70ms = 190ms so that the next function can be called at 190ms.
The 4th is called at 140ms in the delay period, so it should be called as a callback at 190ms. That will create another delay period of 190ms + 70ms = 260ms.
The 5th is called at 300ms, but it is after 260ms, so it should be called immediately and should create another delay period of 300ms + 70ms = 370ms.
 

Constraints:

0 <= t <= 1000
1 <= calls.length <= 10
0 <= calls[i].t <= 1000
0 <= calls[i].inputs[i], calls[i].inputs.length <= 10
 */


import { sleep } from "./common/AsyncHelpers.js";

/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
// WRONG
// var throttle = function(fn, t) {
//     let isRunning = false;
//     let storedArgs;
//     return function(...args) {

//         function startFunction(...args) {
//             isRunning = true;
//             fn(...args);
//             isRunning = false;
//         }

//         if (isRunning) {
//             storedArgs = args;
//         } else {
//             setTimeout(() => {
//                 isRunning = false;
//                 if (storedArgs) {
//                     startFunction(...storedArgs)
//                 }
//             }, t);
//             startFunction(...args);
//         }
//     }
//   };
  
  /**
   * const throttled = throttle(console.log, 100);
   * throttled("log"); // logged immediately.
   * throttled("log"); // logged at t=100ms.
   */

/**
 * Runtime
56 ms
Beats
86.47%
Memory
42.4 MB
Beats
11.22%
 */
// https://leetcode.com/problems/throttle/editorial/?utm_campaign=DailyD16&utm_medium=Email&utm_source=Daily&gio_link_id=DPWg0Z4P
// var throttle = function(fn, t) {
//     let timeoutInProgress = null;
//     let argsToProcess = null;

//     const timeoutFunction = () => {
//         if (argsToProcess === null) {
//             timeoutInProgress = null;
//         } else {
//             fn(...argsToProcess);
//             argsToProcess = null;
//             timeoutInProgress = setTimeout(timeoutFunction, t);
//         }
//     };

//     return function(...args) {
//         if (timeoutInProgress) {
//             argsToProcess = args;
//         } else {
//             fn(...args);
//             timeoutInProgress = setTimeout(timeoutFunction, t);
//         }
//     };
// };


/**
 * Runtime
64 ms
Beats
46.86%
Memory
41.6 MB
Beats
88.45%
 */
var throttle = function(fn, t) {
    let intervalInProgress = null;
    let argsToProcess = null;

    const intervalFunction = () => {
        if (argsToProcess === null) {
            clearInterval(intervalInProgress);
            intervalInProgress = null;
        } else {
            fn(...argsToProcess);
            argsToProcess = null;
        }
    };

    return function(...args) {
        if (intervalInProgress) {
            argsToProcess = args;
        } else {
            fn(...args);
            intervalInProgress = setInterval(intervalFunction, t);
        }
    };
};


const tests = [
    {
        t: 100, 
        calls: [{"t":20,"inputs":[1]}],
        output: [{"t":20,"inputs":[1]}]
    },
    {
        t: 50, 
        calls: [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]}],
        output: [{"t":50,"inputs":[1]},{"t":100,"inputs":[2]}]
    },
    {
        t: 70, 
        calls: [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]},{"t":90,"inputs":[8]},{"t": 140, "inputs":[5,7]},{"t": 300, "inputs": [9,4]}],
        output: [{"t":50,"inputs":[1]},{"t":120,"inputs":[8]},{"t":190,"inputs":[5,7]},{"t":300,"inputs":[9,4]}]
    }
];

tests.forEach(test => {
    let startedAt = new Date();
    let f = throttle((...args) => {
        let tt = (new Date() - startedAt);
        console.log(`${tt} Called with ${args}`);
    }, test.t);
    let t = 0
    test.calls.forEach((call, index) => {
        sleep(call.t - t);
        t = call.t;
        f(call.args)
    });
});
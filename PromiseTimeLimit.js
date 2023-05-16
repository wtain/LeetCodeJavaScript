/**
 * https://leetcode.com/problems/promise-time-limit/?utm_campaign=DailyD12&utm_medium=Email&utm_source=Daily&gio_link_id=q9A2ewMR
 * 
 * Given an asyncronous function fn and a time t in milliseconds, return a new time limited version of the input function.

A time limited function is a function that is identical to the original unless it takes longer than t milliseconds to fullfill. In that case, it will reject with "Time Limit Exceeded".  Note that it should reject with a string, not an Error.

 

Example 1:

Input: 
fn = async (n) => { 
  await new Promise(res => setTimeout(res, 100)); 
  return n * n; 
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
The provided function is set to resolve after 100ms. However, the time limit is set to 50ms. It rejects at t=50ms because the time limit was reached.
Example 2:

Input: 
fn = async (n) => { 
  await new Promise(res => setTimeout(res, 100)); 
  return n * n; 
}
inputs = [5]
t = 150
Output: {"resolved":25,"time":100}
Explanation:
The function resolved 5 * 5 = 25 at t=100ms. The time limit is never reached.
Example 3:

Input: 
fn = async (a, b) => { 
  await new Promise(res => setTimeout(res, 120)); 
  return a + b; 
}
inputs = [5,10]
t = 150
Output: {"resolved":15,"time":120}
Explanation:
The function resolved 5 + 10 = 15 at t=120ms. The time limit is never reached.
Example 4:

Input: 
fn = async () => { 
  throw "Error";
}
inputs = []
t = 1000
Output: {"rejected":"Error","time":0}
Explanation:
The function immediately throws an error.
 

Constraints:

0 <= inputs.length <= 10
0 <= t <= 1000
fn returns a promise
 */


/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
// var timeLimit = function(fn, t) {
// 	return async function(...args) {
//         return new Promise(async (resolve, reject) => {
//             setTimeout(() => reject("Time Limit Exceeded"), t);
//             resolve(await fn(...args));
//         });    
//     }
// };


/** Runtime
58 ms
Beats
71.8%
Memory
41.6 MB
Beats
91.12% */
// var timeLimit = function(fn, t) {
// 	return function(...args) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => reject("Time Limit Exceeded"), t);
//             fn(...args)
//                 .then(resolve)
//                 .catch(reject);
//         });    
//     }
// };


/** Runtime
63 ms
Beats
43.21%
Memory
41.9 MB
Beats
58.81% */
/**https://leetcode.com/problems/promise-time-limit/editorial/?utm_campaign=DailyD12&utm_medium=Email&utm_source=Daily&gio_link_id=q9A2ewMR */
// var timeLimit = function(fn, t) {
// 	return function(...args) {
//         return new Promise((resolve, reject) => {
//             var timeout = setTimeout(() => reject("Time Limit Exceeded"), t);
//             fn(...args)
//                 .then(resolve)
//                 .catch(reject)
//                 .finally(() => clearTimeout(timeout));
//         });    
//     }
// };


/** Runtime
67 ms
Beats
21.23%
Memory
41.5 MB
Beats
95.20% */
// var timeLimit = function(fn, t) {
// 	return async function(...args) {
//         const tlPromise = new Promise((resolve, reject) => {
//             setTimeout(() => reject("Time Limit Exceeded"), t)
//         });
//         const retPromise = fn(...args);
//         return Promise.race([tlPromise, retPromise]);
//     }
// };


/** Runtime
67 ms
Beats
21.23%
Memory
41.9 MB
Beats
58.81% */
var timeLimit = function(fn, t) {
	return async function(...args) {
        return new Promise(async (resolve, reject) => {
            const timeout = setTimeout(() => reject("Time Limit Exceeded"), t)

            try {
                const result = await fn(...args);
                resolve(result);
            } catch (e) {
                reject(e);
            }
            clearTimeout(timeout);
        });
    }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */


const tests = [
    {
        fn: async (n) => { 
            await new Promise(res => setTimeout(res, 100)); 
            return n * n; 
          },
        inputs: [5],
        t: 50,
        output: {"rejected":"Time Limit Exceeded","time":50}
    },
    {
        fn: async (n) => { 
            await new Promise(res => setTimeout(res, 100)); 
            return n * n; 
          },
        inputs: [5],
        t: 150,
        output: {"resolved":25,"time":100}
    },
    {
        fn: async (a, b) => { 
            await new Promise(res => setTimeout(res, 120)); 
            return a + b; 
          },
        inputs: [5,10],
        t: 150,
        output: {"resolved":15,"time":120}
    },
    {
        fn: async () => { 
            throw "Error";
          },
        inputs: [],
        t: 1000,
        output: {"rejected":"Error","time":0}
    }
];


tests.forEach(async test => {
    timeLimit(test.fn, test.t)(...test.inputs)
        .then(result => console.log(result))
        .catch(e => console.log(e));
});
/**
 * https://leetcode.com/problems/sleep/?utm_campaign=DailyD11&utm_medium=Email&utm_source=Daily&gio_link_id=Y9Jw7b6R
 * 
 * Given a positive integer millis, write an asyncronous function that sleeps for millis milliseconds. It can resolve any value.

 

Example 1:

Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
Example 2:

Input: millis = 200
Output: 200
Explanation: It should return a promise that resolves after 200ms.
 

Constraints:

1 <= millis <= 1000
 */


/**
 * Runtime
57 ms
Beats
70.90%
Memory
41.6 MB
Beats
69.70%
 */
/**
 * @param {number} millis
 */
async function sleep(millis) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, millis);
    });
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */


const tests = [
    {
        input: 100,
        output: 100
    },
    {
        input: 200,
        output: 200
    }
]

function run_test(test) {
        let t = Date.now();
        sleep(test.input).then(() => {
        console.log(Date.now() - t); // 100
    });
}

tests.forEach((test) => {
    run_test(test);
});
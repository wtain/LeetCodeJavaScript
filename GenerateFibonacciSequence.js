/**
 * https://leetcode.com/problems/generate-fibonacci-sequence/?utm_campaign=DailyD29&utm_medium=Email&utm_source=Daily&gio_link_id=QRekxgno
 * 
 * Write a generator function that returns a generator object which yields the fibonacci sequence.

The fibonacci sequence is defined by the relation Xn = Xn-1 + Xn-2.

The first few numbers of the series are 0, 1, 1, 2, 3, 5, 8, 13.

 

Example 1:

Input: callCount = 5
Output: [0,1,1,2,3]
Explanation:
const gen = fibGenerator();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
Example 2:

Input: callCount = 0
Output: []
Explanation: gen.next() is never called so nothing is outputted
 

Constraints:

0 <= callCount <= 50
 */

import { run_simple_tests, perform_test } from './common/TestingUtils.js'


/**
 * Runtime
62 ms
Beats
31.29%
Memory
42.3 MB
Beats
28.34%
 */
/**
 * @return {Generator<number>}
 */
// var fibGenerator = function*() {
//     let v1 = 0;
//     let v2 = 1;
//     while (true) {
//         yield v1;
//         const t = v1;
//         v1 = v2;
//         v2 += t;
//     }
// };

/**
 * Runtime
67 ms
Beats
8.94%
Memory
42.3 MB
Beats
28.34%
 */
// var fibGenerator = function*() {
//     let v1 = 0;
//     let v2 = 1;
//     while (true) {
//         yield v1;
//         [v1, v2] = [v2, v1+v2];
//     }
// };


/**
 * Runtime
57 ms
Beats
63.40%
Memory
42.4 MB
Beats
20.57%
 */
// var fibGenerator = function*(v1 = 0, v2 = 1) {
//     yield v1;
//     yield* fibGenerator(v2, v1+v2);
// };

/**
 * Runtime
52 ms
Beats
85.9%
Memory
42 MB
Beats
65.32%
 */
// https://leetcode.com/problems/generate-fibonacci-sequence/editorial/?utm_campaign=DailyD29&utm_medium=Email&utm_source=Daily&gio_link_id=QRekxgno
var fibGenerator = function(v1 = 0, v2 = 1) {
    const len = 50;
    const seq = Array(len).fill(0);

    seq[1] = 1;
    for (let i = 2; i < seq.length; ++i) {
        seq[i] = seq[i-2] + seq[i-1];
    }

    return seq[Symbol.iterator]();
};

/**
 * const gen = fibGenerator();
 * gen.next().value; // 0
 * gen.next().value; // 1
 */

const tests = [
    {
        input: [5],
        output: [0,1,1,2,3]
    },
    {
        input: [0],
        output: []
    }
];

tests.forEach(test => {
    const gen = fibGenerator();
    let result = []
    for (let i = 0; i < test.input; ++i) {
        result.push(gen.next().value);
    }
    console.log(result);
    perform_test(result, test.output);
});
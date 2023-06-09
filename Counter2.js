/* 
Write a function createCounter. It should accept an initial integer init. It should return an object with three functions.

The three functions are:

increment() increases the current value by 1 and then returns it.
decrement() reduces the current value by 1 and then returns it.
reset() sets the current value to init and then returns it.
 

Example 1:

Input: init = 5, calls = ["increment","reset","decrement"]
Output: [6,5,4]
Explanation:
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4
Example 2:

Input: init = 0, calls = ["increment","increment","decrement","reset","reset"]
Output: [1,2,1,0,0]
Explanation:
const counter = createCounter(0);
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.reset(); // 0
counter.reset(); // 0
 

Constraints:

-1000 <= init <= 1000
total calls not to exceed 1000
*/

import { run_suite } from './common/TestingUtils.js'

/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
 /*
 Runtime
 79 ms
 Beats
 6.78%
 Memory
 44.6 MB
 Beats
 74.53%
 */
 var createCounter = function(init) {

    var value = init;

    var object = {
        increment: function() {
            value ++;
            return value
        },

        decrement: function() {
            value --;
            return value
        },

        reset: function() {
            value = init;
            return value;
        }
    }

    return object;
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */

// const counter = createCounter(5)
// console.log(counter.increment()); // 6
// console.log(counter.reset()); // 5
// console.log(counter.decrement()); // 4


 const tests = [
    {
        initParams: 5,
        inputs: ["increment","reset","decrement"],
        outputs: [6,5,4]
    },
    {
        initParams: 0,
        inputs: ["increment","increment","decrement","reset","reset"],
        outputs: [1,2,1,0,0]
    }
 ]

 run_suite(createCounter, tests);
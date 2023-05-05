/*
https://leetcode.com/problems/create-hello-world-function/?utm_campaign=DailyD1&utm_medium=Email&utm_source=Daily&gio_link_id=39lbqx4P

Write a function createHelloWorld. It should return a new function that always returns "Hello World".
 

Example 1:

Input: args = []
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f(); // "Hello World"

The function returned by createHelloWorld should always return "Hello World".
Example 2:

Input: args = [{},null,42]
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

Any arguments could be passed to the function but it should still always return "Hello World".
 

Constraints:

0 <= args.length <= 10
*/


/*
Runtime
56 ms
Beats
100%
Sorry, there are not enough accepted submissions to show data
Memory
41.4 MB
Beats
100%
*/

/**
 * @return {Function}
 */
var createHelloWorld = function() {
    return function(...args) {
 		return "Hello World";
    }
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

 const f = createHelloWorld();
 f(); // "Hello World"
 console.log(f());
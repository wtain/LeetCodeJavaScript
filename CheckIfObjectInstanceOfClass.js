/**
 * https://leetcode.com/problems/check-if-object-instance-of-class/?utm_campaign=DailyD25&utm_medium=Email&utm_source=Daily&gio_link_id=nPN45jJ9
 * 
 * Write a function that checks if a given value is an instance of a given class or superclass. For this problem, an object is considered an instance of a given class if that object has access to that class's methods.

There are no constraints on the data types that can be passed to the function. For example, the value or the class could be undefined.

 

Example 1:

Input: func = () => checkIfInstanceOf(new Date(), Date)
Output: true
Explanation: The object returned by the Date constructor is, by definition, an instance of Date.
Example 2:

Input: func = () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
Output: true
Explanation:
class Animal {};
class Dog extends Animal {};
checkIfInstance(new Dog(), Animal); // true

Dog is a subclass of Animal. Therefore, a Dog object is an instance of both Dog and Animal.
Example 3:

Input: func = () => checkIfInstanceOf(Date, Date)
Output: false
Explanation: A date constructor cannot logically be an instance of itself.
Example 4:

Input: func = () => checkIfInstanceOf(5, Number)
Output: true
Explanation: 5 is a Number. Note that the "instanceof" keyword would return false. However, it is still considered an instance of Number because it accesses the Number methods. For example "toFixed()".
 */

import { run_simple_tests, perform_test } from './common/TestingUtils.js'

// https://leetcode.com/problems/check-if-object-instance-of-class/editorial/?utm_campaign=DailyD25&utm_medium=Email&utm_source=Daily&gio_link_id=nPN45jJ9
/**
 * @param {any} obj
 * @param {any} classFunction
 * @return {boolean}
 */
/**
 * Runtime
113 ms
Beats
36.14%
Memory
52 MB
Beats
62.18%
 */
// var checkIfInstanceOf = function(obj, classFunction) {
//     if (obj === null || obj === undefined || typeof classFunction !== 'function') {
//         return false;
//     }
//     let currentPotentialPrototype = Object.getPrototypeOf(obj);

//     while (currentPotentialPrototype !== null) {
//         if (currentPotentialPrototype === classFunction.prototype) {
//             return true;
//         }
//         currentPotentialPrototype = Object.getPrototypeOf(currentPotentialPrototype);
//     }

//     return false;
// };

/**
 * Runtime
118 ms
Beats
19%
Memory
51.3 MB
Beats
93.98%
 */
// var checkIfInstanceOf = function(obj, classFunction) {
//     if (obj === null || obj === undefined || typeof classFunction !== 'function') {
//         return false;
//     }
    
//     let inputObj = obj;

//     if (typeof inputObj !== 'object') {
//         inputObj = new Object(obj);
//     }

//     return inputObj instanceof classFunction;
// };


/**
 * Runtime
106 ms
Beats
65.30%
Memory
52 MB
Beats
62.18%
*/
var checkIfInstanceOf = function(obj, classFunction) {
    if (obj === null || obj === undefined || typeof classFunction !== 'function') {
        return false;
    }
    
    function* prototypeGenerator(obj) {
        let currPrototype = Object.getPrototypeOf(obj);
        while (currPrototype !== null) {
            yield currPrototype;
            currPrototype = Object.getPrototypeOf(currPrototype);
        }
    }

    for (const prototype of prototypeGenerator(obj)) {
        if (prototype === classFunction.prototype) {
            return true;
        }
    }

    return false;
};

/**
 * checkIfInstanceOf(new Date(), Date); // true
 */

const tests = [
    {
        func: () => checkIfInstanceOf(new Date(), Date),
        output: true
    },
    {
        func: () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); },
        output: true
    },
    {
        func: () => checkIfInstanceOf(Date, Date),
        output: false
    },
    {
        func: () => checkIfInstanceOf(5, Number),
        output: true
    }
];

tests.forEach(test => {
    const result = test.func();
    perform_test(result, test.output);
});

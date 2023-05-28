
function compare(a, b) {
    if (a === b) {
        return true;
    }
    if (a === null && b === null) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }
    if (Array.isArray(a)) {   
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; ++i) {
            if (!compare(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    if (typeof a !== typeof b) {
        return false;
    }
    if (typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function perform_test(result, expectedResult) {
    if (compare(result, expectedResult)) {
        console.log('Passed');
    } else {
        console.log('Failed');
    }
}

export function run_test(func, test) {
    let obj = func(test.initParams);
    const n = test.inputs.length;
    for (var i = 0; i < n; i++) {
        const result = obj[test.inputs[i]]()
        perform_test(result, test.outputs[i]);
    }
}

export function run_suite(func, tests) {
     tests.forEach((test, index) => {
        console.log(`Running test ${(index+1)}`);
        run_test(func, test);
     });
}

export function run_simple_tests(fun, tests) {
    tests.forEach((test, index) => {
        console.log(`Running test ${(index+1)}`);
        const input = test.input;
        const output = test.output;
        const result = fun(...input);
        console.log(`Expected: ${output}`);
        console.log(`Output: ${result}`);
        perform_test(result, output)
     });
}

export function run_functional_tests(func, tests) {
    const fun = func();
    run_simple_tests(fun, tests);
}

function perform_test(result, expectedResult) {
    if (result === expectedResult) {
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

export function run_functional_tests(func, tests) {
    const fun = func();
    tests.forEach((test, index) => {
        console.log(`Running test ${(index+1)}`);
        const input = test.input;
        const output = test.output;
        const result = fun(input);
        perform_test(result, output)
     });
}
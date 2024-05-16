let sum = function (a) {
    let finalSum = a;
    return function abc(b) {
        if (b) {
            finalSum = finalSum + b;
            return abc;
        } else {
            return finalSum;
        }
    };
    // Write your code here
};

console.log(sum(1)(2)(10)(10)());

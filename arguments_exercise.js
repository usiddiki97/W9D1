// sum

// Write a sum function that takes any number of arguments:

// sum(1, 2, 3, 4) === 10;
// sum(1, 2, 3, 4, 5) === 15;
// Solve it first using the arguments keyword, then rewrite your solution to use the ...rest operator.

// function sumV1() {
//     let total = 0;
//     for (let i = 0; i < arguments.length; i++) {
//         total += arguments[i];
//     }
//     return total;
// }
// console.log(sumV1(1, 2, 3, 4));

function sumV1() {
    let args = Array.from(arguments);
    return args.reduce(function (acc, ele) {return acc + ele} );
}
// console.log(sumV1(1, 2, 3, 4));

// function sumV2(...args) {
//     let total = 0;
//     for (let i = 0; i < args.length; i++) {
//         total += args[i];
//     }
//     return total;
// }
// console.log(sumV2(1, 2, 3, 4));


function sumV2(...args) {
    return args.reduce(function (acc, ele) { return acc + ele });
}
// console.log(sumV2(1, 2, 3, 4));

// ----------------------------------------------------------------------------
class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

Function.prototype.myBindV1 = function(context) {
    let func = this;
    let bindArgs = Array.from(arguments).slice(1);
    return function original() {
        let callArgs = Array.from(arguments);
        return func.apply(context, bindArgs.concat(callArgs));
    };
};

Function.prototype.myBindV2 = function (context, ...bindArgs) {
    let func = this;
    return function original(...callArgs) {
        return func.apply(context, bindArgs.concat(callArgs));
    };
};


// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBindV2(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBindV2(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBindV2(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true

// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBindV2(pavlov);
// notMarkovSays("meow", "me");
// // Pavlov says meow to me!
// // true

// ----------------------------------------------------------------------------
// Write a curriedSum function that takes an integer(how many numbers to sum) and returns a function that can be successively called with single arguments until it finally returns a sum.That is:

// const sum = curriedSum(4);
// sum(5)(30)(20)(1); // => 56


// Hint: curriedSum(numArgs) should:

// Define an empty array, numbers.
// Defines a function, _curriedSum that:
// Closes over numArgs and numbers.
// Takes a single number as an argument.
// Appends this to numbers each time.
// If numbers.length === numArgs, it sums the numbers in the array and returns the result.
//     Else, it returns itself.
// Returns _curriedSum.

function curriedSum(numArgs) {
    let numbers = [];

    function _curriedSum(num) {
        numbers.push(num);
        debugger
        if (numbers.length === numArgs) {
            numbers.reduce((acc, el) => {return acc + el});
            // same as numbers.reduce(function(acc,el) {return acc + el});
        } else {
            return _curriedSum;
        }
    }
    return _curriedSum;
}

// const sum = curriedSum(4);
// console.log(sum(2)(30));
// console.log(sum(2)(1));


// console.log(sum(5)(30)(20)(1)); // => 56;


// If you're confused, think of it this way: _curriedSum keeps collecting arguments and returning itself until it has enough arguments, at which point it actually does the required work of summing.

// ----------------------------------------------------------------------------
// Function.prototype.curry

// Write a method Function.prototype.curry(numArgs).This should return a function that will:

// Collect up arguments until there are numArgs of them,
//     If there are too few arguments still, it should return itself.
// When there are numArgs arguments, it should call the original function.
// Write a version that uses Function.prototype.apply and another one that uses ... (the spread operator).


function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30


Function.prototype.curryV1 = function (numArgs) {
    let args = [];
    let func = this; // func/this refers to function curry is being called on
    
    function _curried(arg) {
        args.push(arg);
        
        if (args.length === numArgs) {
            return func.apply(null, args);
        } else {
            return _curried;
        }
    }
    return _curried;
}

Function.prototype.curryV2 = function (numArgs) {
    let args = [];
    let func = this;

    function _curried(arg) {
        args.push(arg);

        if (args.length === numArgs) {
            return func(...args);
        } else {
            return _curried;
        }
    }
    return _curried;
}

// you'll write `Function#curry`!
let f1 = sumThree.curryV1(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curryV2(3)(4)(20)(6)); // == 30

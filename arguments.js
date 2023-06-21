function sum_arguments() {
    let args = Array.from(arguments);
    return args.reduce((acc, el) => acc + el, 0);
}

function sum_spread_operator(...args) {
    return args.reduce((acc, el) => acc + el, 0);
}

// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5));

// ____________________________________________________________________________

// ARGUMENTS KEYWORD VERSION
// Function.prototype.myBind = function(context) {
//     let bindTimeArgs = Array.from(arguments).slice(1);
//     let that = this;
//     return () => {
//         let callTimeArgs = Array.from(arguments);
//         return that.apply(context, bindTimeArgs.concat(callTimeArgs));
//     }
// };

// SPREAD OPERATOR VERSION
Function.prototype.myBind = function(context, ...bindTimeArgs) {
    return (...callTimeArgs) => this.apply(context, bindTimeArgs.concat(callTimeArgs));
}



// class Cat {
//     constructor(name) {
//         this.name = name;
//     }

//     says(sound, person) {
//         console.log(`${this.name} says ${sound} to ${person}!`);
//         return true;
//     }
// }

// class Dog {
//     constructor(name) {
//         this.name = name;
//     }
// }

// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true

// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(pavlov);
// notMarkovSays("meow", "me");
// // Pavlov says meow to me!
// // true

//_____________________________________________________________________________

function curriedSum(numArgs) {
    const numbers = [];
    return function _curriedSum(num) {
        numbers.push(num);
        if (numbers.length === numArgs) {
            return numbers.reduce((acc, el) => acc + el);
        } else {
            return _curriedSum;
        }
    }
}

Function.prototype.curry = function(numArgs) {
    const args = [];
    let that = this;
    return function _curried(arg) {
        args.push(arg);
        if (args.length === numArgs) {
            return that.apply(null, args);
        } else {
            return _curried;
        }
    } 
}

Function.prototype.curry2 = function(numArgs) {
    const args = [];
    let that = this;
    return function _curried(arg) {
        args.push(arg);
        if (args.length === numArgs) {
            return that(...args);
        } else {
            return _curried;
        }
    } 
}
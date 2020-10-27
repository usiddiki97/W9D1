Function.prototype.inheritsV1 = function (ParentClass) {
    function Surrogate(){};
    Surrogate.prototype = ParentClass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}


// Function.prototype.inheritsV1 = function (ParentClass) {
//     function Surrogate() { };
//     Surrogate.prototype = ParentClass.prototype;
//     this.prototype = new Surrogate();
//     this.prototype.constructor = this;
// }


Function.prototype.inheritsV2 = function (ParentClass) {
    this.prototype = Object.create(ParentClass.prototype);
    this.prototype.constructor = this;
}
function MovingObject(speed) {
    this.speed = speed;
 }

 MovingObject.prototype.statement = function () {
    return "I am a statement, if you see me you are blessed.";
 }

function Ship(size, speed) { 
    MovingObject.call(this, speed);
    this.size = size;
}
Ship.inheritsV1(MovingObject);

function Asteroid(speed, composition) { 
    this.speed = speed;
    this.composition = composition;
}
Asteroid.inheritsV1(MovingObject);

let titanic = new Ship("huge", "not so fast anymore");
let pluto = new Asteroid("fast", "Ice");
debugger
console.log(titanic.statement());
console.log(pluto.statement());

// There are a number of steps:

// Define a Surrogate class
// Set the prototype of the Surrogate(Surrogate.prototype = SuperClass.prototype)
// Set Subclass.prototype = new Surrogate()
// Set Subclass.prototype.constructor = Subclass
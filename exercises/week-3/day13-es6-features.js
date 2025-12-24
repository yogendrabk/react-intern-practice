/*
===================================================
WEEK 3 — DAY 13: ES6+ Modern JavaScript Features
===================================================

Topics:
- Template literals
- Destructuring (array + object)
- Spread and rest operators
- Default parameters
- Shorthand properties
- Computed property names
- Optional chaining (?.)
- Nullish coalescing (??)
- Logical assignment operators
- Classes and inheritance
- Static methods, private fields

Each feature show before ES5 and after ES6+.

Date: December 24, 2025
===================================================
*/

// ===================================================
// 1. TEMPLATE LITERALS
// ===================================================

console.log("===== 1. TEMPLATE LITERALS =====\n");

// BEFORE (ES5):
const name_es5 = "Yogendra";
const age_es5 = 20;
const greeting_es5 = "Hello, my name is " + name_es5 + " and I am " + age_es5 + " years old.";
console.log("BEFORE (ES5):", greeting_es5);

// AFTER (ES6+):
const name_es6 = "Yogendra";
const age_es6 = 20;
const greeting_es6 = `Hello, my name is ${name_es6} and I am ${age_es6} years old.`;
console.log("AFTER (ES6+):", greeting_es6);

/* Explanation:
   Template literals use backticks `` not quotes.
   Interpolation with ${expression}.
   Can span multiple lines.
   Much cleaner than string concatenation!
*/

// Multi-line example
const htmlBefore = "<div>" + "\n" + "<h1>Title</h1>" + "\n" + "<p>Content</p>" + "\n" + "</div>";
const htmlAfter = `
<div>
    <h1>Title</h1>
    <p>Content</p>
</div>
`;
console.log("Multi-line template literal:\n", htmlAfter);

// ===================================================
// 2. DESTRUCTURING — ARRAYS
// ===================================================

console.log("\n===== 2. DESTRUCTURING — ARRAYS =====\n");

// BEFORE (ES5):
const colors_es5 = ["red", "blue", "green"];
const primaryColor_es5 = colors_es5[0];
const secondaryColor_es5 = colors_es5[1];
console.log("BEFORE (ES5):", primaryColor_es5, secondaryColor_es5);

// AFTER (ES6+):
const colors_es6 = ["red", "blue", "green"];
const [primary, secondary, tertiary] = colors_es6;
console.log("AFTER (ES6+):", primary, secondary, tertiary);

/* Explanation:
   Destructuring unpack array to variables.
   Much cleaner than accessing by index!
   Order matter (first item first var, etc).
*/

// Skip elements
const [first, , third] = ["a", "b", "c"];
console.log("Skip middle:", first, third); // a, c

// Rest operator in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log("Head:", head, "Tail:", tail); // 1, [2,3,4,5]

// ===================================================
// 3. DESTRUCTURING — OBJECTS
// ===================================================

console.log("\n===== 3. DESTRUCTURING — OBJECTS =====\n");

// BEFORE (ES5):
const person_es5 = { name: "Yogendra", age: 20, city: "Kathmandu" };
const name_person_es5 = person_es5.name;
const age_person_es5 = person_es5.age;
console.log("BEFORE (ES5):", name_person_es5, age_person_es5);

// AFTER (ES6+):
const person_es6 = { name: "Yogendra", age: 20, city: "Kathmandu" };
const { name, age, city } = person_es6;
console.log("AFTER (ES6+):", name, age, city);

/* Explanation:
   Object destructuring extract property to variables.
   Property name become variable name automatically.
   Much cleaner than multiple assignment!
*/

// Rename during destructuring
const { name: personName, age: personAge } = person_es6;
console.log("Renamed:", personName, personAge);

// Default values
const { country = "Nepal", region = "Asia" } = person_es6;
console.log("With defaults:", country, region); // Nepal, Asia

// Nested destructuring
const employee = {
    id: 1,
    details: {
        name: "Priya",
        contact: {
            email: "priya@tech.com",
            phone: "9841234567"
        }
    }
};

const { details: { contact: { email } } } = employee;
console.log("Nested destructuring:", email);

// ===================================================
// 4. SPREAD OPERATOR (...)
// ===================================================

console.log("\n===== 4. SPREAD OPERATOR (...) =====\n");

// BEFORE (ES5): Copying arrays/objects hard
const arr1_es5 = [1, 2, 3];
const arr2_es5 = [4, 5, 6];
const combined_es5 = arr1_es5.concat(arr2_es5);
console.log("BEFORE (ES5):", combined_es5); // [1,2,3,4,5,6]

// AFTER (ES6+): Spread operator
const arr1_es6 = [1, 2, 3];
const arr2_es6 = [4, 5, 6];
const combined_es6 = [...arr1_es6, ...arr2_es6];
console.log("AFTER (ES6+):", combined_es6); // [1,2,3,4,5,6]

/* Explanation:
   Spread operator ... unpack array/object.
   For arrays: spread individual elements.
   For objects: spread individual properties.
   Very useful for copying, combining, passing args.
*/

// Spread in function arguments
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
const nums = [1, 2, 3, 4, 5];
console.log("Spread in function args:", sum(...nums)); // 15

// Copy array (not reference)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log("Original untouched:", original); // [1,2,3]
console.log("Copy modified:", copy); // [1,2,3,4]

// Copy object and merge
const obj1 = { x: 1, y: 2 };
const obj2 = { y: 3, z: 4 };
const merged = { ...obj1, ...obj2 };
console.log("Merged object:", merged); // {x:1, y:3, z:4}

// ===================================================
// 5. REST OPERATOR (...)
// ===================================================

console.log("\n===== 5. REST OPERATOR (...) =====\n");

// Rest in function parameters
const printArgs = (first, second, ...rest) => {
    console.log("First:", first);
    console.log("Second:", second);
    console.log("Rest:", rest);
};
printArgs("a", "b", "c", "d", "e");

/* Explanation:
   Rest operator ... (same syntax as spread!).
   But in PARAMETER position, collect remaining args.
   In UNPACKING position, spread individual elements.
   Context determine meaning!
*/

// Rest in array destructuring
const [leader, secondLeader, ...team] = ["A", "B", "C", "D", "E"];
console.log("Team structure:", leader, secondLeader, team);

// ===================================================
// 6. DEFAULT PARAMETERS
// ===================================================

console.log("\n===== 6. DEFAULT PARAMETERS =====\n");

// BEFORE (ES5):
function greet_es5(name, greeting) {
    name = name || "Guest";
    greeting = greeting || "Hello";
    console.log(greeting + ", " + name);
}
greet_es5(); // Requires setting defaults manually

// AFTER (ES6+):
const greet_es6 = (name = "Guest", greeting = "Hello") => {
    console.log(`${greeting}, ${name}`);
};
greet_es6(); // Hello, Guest
greet_es6("Yogendra"); // Hello, Yogendra
greet_es6("Yogendra", "Namaste"); // Namaste, Yogendra

/* Explanation:
   Default parameter auto use if not provided.
   Cleaner than manual assignment!
   Order matter — required before optional.
*/

// ===================================================
// 7. SHORTHAND PROPERTIES
// ===================================================

console.log("\n===== 7. SHORTHAND PROPERTIES =====\n");

// BEFORE (ES5):
const firstName_es5 = "Yogendra";
const lastName_es5 = "BK";
const age_obj_es5 = 20;
const person_obj_es5 = {
    firstName: firstName_es5,
    lastName: lastName_es5,
    age: age_obj_es5
};
console.log("BEFORE (ES5):", person_obj_es5);

// AFTER (ES6+):
const firstName = "Yogendra";
const lastName = "BK";
const age_obj = 20;
const person_obj = { firstName, lastName, age_obj };
console.log("AFTER (ES6+):", person_obj);

/* Explanation:
   If variable name match property name,
   can shorten to just name.
   Equivalent: { firstName: firstName }
   Becomes: { firstName }
*/

// Method shorthand
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply(a, b) { return a * b; } // Also shorthand
};
console.log("Method calls:", calculator.add(5, 3), calculator.multiply(4, 2));

// ===================================================
// 8. COMPUTED PROPERTY NAMES
// ===================================================

console.log("\n===== 8. COMPUTED PROPERTY NAMES =====\n");

// BEFORE (ES5):
const key_es5 = "status";
const obj_es5 = {};
obj_es5[key_es5] = "active";
console.log("BEFORE (ES5):", obj_es5); // {status: "active"}

// AFTER (ES6+):
const key_es6 = "status";
const obj_es6 = {
    [key_es6]: "active",
    [Math.random()]: "random key"
};
console.log("AFTER (ES6+):", obj_es6);

/* Explanation:
   Bracket [] in object literal allow dynamic key.
   Key computed at creation time.
   Key can be any expression (variable, function, etc).
*/

// Dynamic key from data
const createObject = (prop, value) => ({
    created: new Date().toISOString(),
    [`is_${prop}`]: value
});
console.log("Dynamic properties:", createObject("active", true));

// ===================================================
// 9. OPTIONAL CHAINING (?.)
// ===================================================

console.log("\n===== 9. OPTIONAL CHAINING (?.) =====\n");

// BEFORE (ES5): Check every level
const user_es5 = { profile: { address: { city: "Kathmandu" } } };
const city_es5 = user_es5 && user_es5.profile && user_es5.profile.address 
    && user_es5.profile.address.city;
console.log("BEFORE (ES5):", city_es5);

// AFTER (ES6+): Optional chaining
const user_es6 = { profile: { address: { city: "Kathmandu" } } };
const city_es6 = user_es6?.profile?.address?.city;
console.log("AFTER (ES6+):", city_es6); // "Kathmandu"

// When property missing
const user_no_address = { profile: {} };
const city_missing = user_no_address?.profile?.address?.city;
console.log("Missing property:", city_missing); // undefined (not error!)

/* Explanation:
   Optional chaining ?. safe access nested property.
   If intermediate null/undefined, stop and return undefined.
   No TypeError! Much cleaner than chain check.
   Can use with arrays too: arr?.[0]?.name
*/

// Optional chaining with method
const person_obj_methods = {
    greet: () => "Hello!"
};
console.log("Method call:", person_obj_methods?.greet?.()); // "Hello!"

const person_no_method = {};
console.log("Missing method:", person_no_method?.greet?.()); // undefined

// ===================================================
// 10. NULLISH COALESCING (??)
// ===================================================

console.log("\n===== 10. NULLISH COALESCING (??) =====\n");

// BEFORE (ES5): OR operator ||
const value1_es5 = null;
const result1_es5 = value1_es5 || "default"; // "default"
console.log("BEFORE (OR):", result1_es5);

// Problem with OR: treat 0, "", false as falsy
const count_es5 = 0;
const displayCount_es5 = count_es5 || 100; // 100 (wrong! 0 should display)
console.log("OR problem with 0:", displayCount_es5);

// AFTER (ES6+): Nullish coalescing ??
const value_es6 = null;
const result_es6 = value_es6 ?? "default"; // "default"
console.log("AFTER (ES6+):", result_es6);

// Only null/undefined trigger default (not 0, "", false)
const count_es6 = 0;
const displayCount_es6 = count_es6 ?? 100; // 0 (correct!)
console.log("Nullish coalescing with 0:", displayCount_es6);

/* Explanation:
   ?? (nullish coalescing) different from || (OR).
   ?? only trigger for null/undefined.
   || trigger for any falsy (0, "", false, etc).
   
   Use ?? when want use 0, empty string, false as valid!
*/

// ===================================================
// 11. LOGICAL ASSIGNMENT OPERATORS
// ===================================================

console.log("\n===== 11. LOGICAL ASSIGNMENT OPERATORS =====\n");

// &&= (AND assign)
let count_and = 5;
count_and &&= 10; // Assign 10 if count_and truthy
console.log("count &&= 10:", count_and); // 10

let count_and_false = 0;
count_and_false &&= 10; // Don't assign (0 falsy)
console.log("0 &&= 10:", count_and_false); // 0

// ||= (OR assign)
let count_or = 0;
count_or ||= 20; // Assign if count_or falsy
console.log("0 ||= 20:", count_or); // 20

let count_or_true = 5;
count_or_true ||= 20; // Don't assign (5 truthy)
console.log("5 ||= 20:", count_or_true); // 5

// ??= (Nullish assign)
let count_null = null;
count_null ??= 30; // Assign if null/undefined
console.log("null ??= 30:", count_null); // 30

let count_zero = 0;
count_zero ??= 30; // Don't assign (0 not nullish)
console.log("0 ??= 30:", count_zero); // 0

// ===================================================
// 12. CLASSES — ES6+ Way
// ===================================================

console.log("\n===== 12. CLASSES =====\n");

// BEFORE (ES5): Constructor function
function PersonES5(name, age) {
    this.name = name;
    this.age = age;
}
PersonES5.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

const personES5 = new PersonES5("Yogendra", 20);
console.log("BEFORE (ES5):", personES5.greet());

// AFTER (ES6+): Class syntax
class PersonES6 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    getAge() {
        return `I am ${this.age} years old`;
    }
}

const personES6 = new PersonES6("Yogendra", 20);
console.log("AFTER (ES6+):", personES6.greet());
console.log(personES6.getAge());

/* Explanation:
   Class syntax cleaner than constructor function.
   constructor() method run when new object created.
   Methods defined inside class (not prototype).
   Behind scenes, still use prototypal inheritance!
   Class just syntactic sugar.
*/

// ===================================================
// 13. INHERITANCE with extends & super
// ===================================================

console.log("\n===== 13. INHERITANCE =====\n");

class Animal {
    constructor(name) {
        this.name = name;
    }
    
    sound() {
        return `${this.name} make sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    sound() {
        return `${this.name} barks!`; // Override parent method
    }
    
    getInfo() {
        return `${this.name} is ${this.breed} breed`;
    }
}

const dog = new Dog("Buddy", "Labrador");
console.log(dog.sound()); // "Buddy barks!"
console.log(dog.getInfo()); // "Buddy is Labrador breed"

/* Explanation:
   extends keyword inherit from parent class.
   super() call parent constructor and methods.
   Can override parent methods in child class.
   Single inheritance only (not multiple).
*/

// ===================================================
// 14. STATIC METHODS
// ===================================================

console.log("\n===== 14. STATIC METHODS =====\n");

class MathHelper {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static isEven(num) {
        return num % 2 === 0;
    }
}

console.log("Static methods (call on class, not instance):");
console.log("MathHelper.add(5, 3):", MathHelper.add(5, 3));
console.log("MathHelper.isEven(4):", MathHelper.isEven(4));

// Cannot call on instance
// const helper = new MathHelper(); // Error

/* Explanation:
   Static methods belong to class, not instance.
   Call on class directly: ClassName.method()
   No 'this' access (unless pass instance).
   Useful for utility functions related class.
*/

// ===================================================
// 15. PRIVATE FIELDS (#)
// ===================================================

console.log("\n===== 15. PRIVATE FIELDS =====\n");

class BankAccount {
    #balance = 0; // Private field (# prefix)
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#balance += amount;
        return this.#balance;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
console.log("Deposit 500:", account.deposit(500)); // 1500
console.log("Get balance:", account.getBalance()); // 1500

// Cannot access private field directly
// console.log(account.#balance); // SyntaxError!
console.log("Try access private field:", undefined); // Only through method

/* Explanation:
   Private fields #fieldName only accessible inside class.
   Cannot access from outside or subclass.
   True privacy (unlike convention _fieldName).
   Perfect for encapsulation, data protection.
*/

// ===================================================
// SUMMARY
// ===================================================

console.log(`
✓ Template literals: Cleaner string interpolation
✓ Destructuring: Extract values cleanly
✓ Spread operator: Copy and combine arrays/objects
✓ Rest operator: Collect remaining arguments
✓ Default parameters: Auto defaults for function params
✓ Shorthand properties: Shorter object creation
✓ Computed properties: Dynamic object keys
✓ Optional chaining: Safe nested property access
✓ Nullish coalescing: Smart fallback values
✓ Logical assignment: Conditional assignment
✓ Classes: Modern syntax for objects
✓ Inheritance: extend parent class functionality
✓ Static methods: Utility methods on class
✓ Private fields: True data encapsulation

ES6+ make JavaScript much cleaner and safer!
`);

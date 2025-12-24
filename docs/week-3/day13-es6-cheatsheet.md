# ES6+ Modern JavaScript — Quick Cheatsheet

**Date:** December 24, 2025  
**Topic:** ES6+ Features Reference Guide

---

## 1. Template Literals

**Old Way (ES5):**
```javascript
const name = "Yogendra";
const msg = "Hello " + name + "!";
```

**New Way (ES6+):**
```javascript
const name = "Yogendra";
const msg = `Hello ${name}!`;
```

**Key Points:**
- Use backticks `` ` ``
- Interpolation with `${expression}`
- Can span multiple lines
- Much cleaner and readable

---

## 2. Destructuring — Arrays

**Extract values from array to variables**

```javascript
// Basic destructuring
const [first, second, third] = [1, 2, 3];

// Skip elements
const [head, , tail] = [1, 2, 3];

// Rest operator
const [x, ...rest] = [1, 2, 3, 4, 5];
// x = 1, rest = [2, 3, 4, 5]

// Swap variables (nice trick!)
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

---

## 3. Destructuring — Objects

**Extract properties from object to variables**

```javascript
// Basic destructuring
const { name, age } = { name: "Yogendra", age: 20 };

// Rename during destructuring
const { name: personName } = { name: "Yogendra" };
// personName = "Yogendra"

// Default values
const { country = "Nepal" } = {}; // country = "Nepal"

// Nested destructuring
const { address: { city } } = { 
    address: { city: "Kathmandu" } 
};

// Rest in object
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
// rest = { c: 3, d: 4 }
```

---

## 4. Spread Operator (...)

**Unpack array/object elements**

```javascript
// Spread arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Spread in function calls
const numbers = [1, 2, 3, 4, 5];
Math.max(...numbers); // 5

// Copy array (not reference)
const original = [1, 2, 3];
const copy = [...original]; // Different array

// Spread objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }

// Copy object
const user = { id: 1, name: "Yogendra" };
const userCopy = { ...user };
```

---

## 5. Rest Operator (...)

**Collect remaining arguments/elements**

```javascript
// Rest in function parameters
const sum = (first, second, ...rest) => {
    console.log(first, second, rest);
};
sum(1, 2, 3, 4, 5); // first=1, second=2, rest=[3,4,5]

// Rest in array destructuring
const [leader, ...team] = ["Yogendra", "A", "B", "C"];
// leader = "Yogendra", team = ["A", "B", "C"]

// Rest in object destructuring
const { a, b, ...others } = { a: 1, b: 2, c: 3, d: 4 };
// others = { c: 3, d: 4 }
```

---

## 6. Default Parameters

**Auto default values for function parameters**

```javascript
// Old way (ES5)
function greet(name) {
    name = name || "Guest";
}

// New way (ES6+)
const greet = (name = "Guest") => {
    console.log(`Hello ${name}`);
};

greet(); // Hello Guest
greet("Yogendra"); // Hello Yogendra

// Multiple defaults
const introduce = (name = "Unknown", age = 0) => {
    console.log(`${name} is ${age} years old`);
};
```

---

## 7. Shorthand Properties

**Shorter syntax for creating objects**

```javascript
const name = "Yogendra";
const age = 20;
const city = "Kathmandu";

// Old way
const person = { name: name, age: age, city: city };

// New way (shorthand)
const person = { name, age, city };

// Method shorthand
const calc = {
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; }
};
```

---

## 8. Computed Property Names

**Dynamic key names in objects**

```javascript
const key = "status";
const obj = {
    [key]: "active", // key computed at creation
    [`is_${key}`]: true // Can use expressions
};
// obj = { status: "active", is_status: true }

// Practical use
const createProp = (name) => ({
    [`user_${name}`]: true,
    created: new Date()
});
```

---

## 9. Optional Chaining (?.)

**Safe access to nested properties**

```javascript
// Without optional chaining
const city = user && user.profile && user.profile.address 
    && user.profile.address.city;

// With optional chaining
const city = user?.profile?.address?.city;

// Returns undefined if any level is null/undefined
// No TypeError thrown

// Works with arrays
const firstItem = arr?.[0];

// Works with methods
user?.greet?.(); // undefined if greet not exists
```

---

## 10. Nullish Coalescing (??)

**Smart default values (only null/undefined trigger default)**

```javascript
// OR operator (triggers for any falsy)
const count1 = 0 || 100; // 100 (wrong!)

// Nullish coalescing (triggers only for null/undefined)
const count2 = 0 ?? 100; // 0 (correct!)

// Practical use
const name = userInput ?? "Anonymous";
const port = process.env.PORT ?? 3000;
const items = cart.items ?? [];
```

---

## 11. Logical Assignment Operators

**Conditional assignment based on truthiness**

```javascript
// &&= (AND assignment)
// Only assign if current value truthy
let a = 5;
a &&= 10; // a = 10

let b = 0;
b &&= 10; // b = 0 (not assigned)

// ||= (OR assignment)
// Only assign if current value falsy
let c = 0;
c ||= 20; // c = 20

let d = 5;
d ||= 20; // d = 5 (not assigned)

// ??= (Nullish assignment)
// Only assign if null/undefined
let e = null;
e ??= 30; // e = 30

let f = 0;
f ??= 30; // f = 0 (not assigned)
```

---

## 12. Classes

**Modern syntax for creating objects**

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    getAge() {
        return this.age;
    }
}

const person = new Person("Yogendra", 20);
person.greet(); // "Hello, I'm Yogendra"
```

**Key Points:**
- `constructor()` runs when object created
- Methods defined inside (cleaner than prototype)
- Still uses prototypal inheritance behind scenes

---

## 13. Inheritance (extends & super)

**Child class inherits from parent class**

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    sound() {
        return `${this.name} makes sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    sound() {
        return `${this.name} barks!`; // Override
    }
}

const dog = new Dog("Buddy", "Labrador");
dog.sound(); // "Buddy barks!"
```

---

## 14. Static Methods

**Methods that belong to class, not instances**

```javascript
class Math2 {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
}

// Call on class directly
Math2.add(5, 3); // 8

// Cannot call on instance
// const m = new Math2();
// m.add(5, 3); // Error!

// Useful for utility methods
```

---

## 15. Private Fields (#)

**True private data in classes**

```javascript
class BankAccount {
    #balance = 0; // Private field (# prefix)
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.getBalance(); // 1000

// Cannot access private field
// account.#balance; // SyntaxError!
```

**Key Points:**
- `#fieldName` only accessible inside class
- True privacy (unlike convention `_fieldName`)
- Perfect for encapsulation

---

## Quick Reference Table

| Feature | Purpose | Example |
|---------|---------|---------|
| Template Literals | String interpolation | `` `Hello ${name}` `` |
| Destructuring | Extract values | `const { name } = obj` |
| Spread (...) | Copy/combine | `[...arr1, ...arr2]` |
| Rest (...) | Collect remaining | `(...args) => args` |
| Default Params | Auto defaults | `(name = "Guest") => {}` |
| Shorthand | Shorter objects | `{ name, age }` |
| Computed Props | Dynamic keys | `[expression]: value` |
| Optional Chaining (?.) | Safe access | `obj?.prop?.nested` |
| Nullish (??) | Smart default | `val ?? "default"` |
| Logical Assign | Conditional assign | `a &&= 10` |
| Classes | Object syntax | `class Person {}` |
| Inheritance | Child class | `class Dog extends Animal` |
| Static Methods | Class methods | `static add() {}` |
| Private Fields | True privacy | `#balance` |

---

## Best Practices

✅ **Use const by default, let if reassignment**  
✅ **Use destructuring for cleaner code**  
✅ **Use template literals for strings**  
✅ **Use spread for copying arrays/objects**  
✅ **Use classes for constructors**  
✅ **Use optional chaining for safe access**  
✅ **Use nullish coalescing for smart defaults**  
✅ **Use private fields for data protection**  

---

## Nepali-English Defense Notes

**Template literals bhanne ke ho?**  
"Backticks use garera string interpolation garchau. ${variable} le variable value automatically insert garchha. Concatenation ko jagha vayo."

**Destructuring useful kina?**  
"Array/object ma destructuring use garera directly variable declare garchau. Multiple assignment lines save hunchha, code cleaner hunchha."

**Class bhanne ke ho? Constructor function ka farak?**  
"Class ES6+ syntax ho cleaner. Behind scenes prototypal inheritance use garchha. Constructor function jasto hi kaam garchha but syntax nicer chha."

**Optional chaining (?.) kasari useful hunchha?**  
"Nested property access safe garchha. Intermediate null/undefined vaye undefined return garchha, TypeError throw garena. Aba checking chain ko zaroorat naparchha."

**Private fields (#) kina use garchau?**  
"True privacy provide garchha class ma. Outside from access garnu impossible (unlike underscore convention). Data encapsulation secure garchha."


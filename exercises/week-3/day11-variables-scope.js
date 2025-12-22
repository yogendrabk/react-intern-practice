/*
===================================================
WEEK 3 — DAY 11: JavaScript Variables & Scope
===================================================

Topics:
- var vs let vs const
- Hoisting behavior
- Scope types (global, function, block, lexical)
- Temporal Dead Zone (TDZ)
- Scope chain
- Closure basics

Notes:
This file document all variable types behavior. Key
difference remember: var function-scoped (hoisted),
let and const block-scoped (TDZ). Learn this deeply!

Date: December 22, 2025
===================================================
*/

// ===================================================
// 1. VAR — Function Scoped, Hoisted
// ===================================================

console.log("=== VAR BEHAVIOR ===");

// EXAMPLE 1: Hoisting — var declaration moves to top
console.log("x before declaration:", x); // undefined (not error!)
var x = 5;
console.log("x after declaration:", x); // 5

/* Explanation:
   JavaScript engine read above code like this:
   
   var x;  // HOISTED (declared but not initialized)
   console.log("x before declaration:", x); // undefined
   x = 5;  // initialization stay here
   console.log("x after declaration:", x); // 5
   
   TDZ (Temporal Dead Zone) NOT applicable for var.
   var initialized with undefined automatically.
*/

// EXAMPLE 2: Function Scope — var not block scoped
function demonstrateVarScope() {
    if (true) {
        var count = 10; // var is function-scoped, not block-scoped!
    }
    console.log("var count after if block:", count); // 10 (accessible!)
}
demonstrateVarScope();

/* Explanation:
   var is function-scoped, not block-scoped!
   Even declared inside if block, accessible entire function.
   This a PROBLEM — var can leak out of blocks.
*/

// EXAMPLE 3: var in loops — common problem
for (var i = 0; i < 3; i++) {
    // var is function-scoped, not loop-scoped
}
console.log("i after loop:", i); // 3 (accessible outside loop!)

/* Explanation:
   This why var problematic. Loop variable leak!
   With let/const, this not happen (block-scoped).
*/

// ===================================================
// 2. LET — Block Scoped, Temporal Dead Zone
// ===================================================

console.log("\n=== LET BEHAVIOR ===");

// EXAMPLE 4: Block Scope — let is block-scoped
{
    let blockVar = "inside block";
    console.log("let inside block:", blockVar); // "inside block"
}
// console.log("let outside block:", blockVar); // ReferenceError!

/* Explanation:
   let is block-scoped. Accessible only inside
   block {} where declared. Block can be:
   - if statement
   - else block
   - switch block
   - for loop
   - while loop
   - function
   - any { } braces
*/

// EXAMPLE 5: Temporal Dead Zone (TDZ)
console.log("\n--- Temporal Dead Zone ---");

// console.log("letVar before:", letVar); // ReferenceError!
/* 
   ReferenceError: Cannot access 'letVar' before initialization
   
   Zone time between entering scope and declaration is TDZ.
   In TDZ, letVar exist but not initialized — can't access!
   This DIFFERENT from var (which give undefined).
*/

let letVar = "now initialized";
console.log("letVar after:", letVar); // "now initialized"

/* Explanation:
   Hoisting DOES happen for let, but different than var!
   let hoisted but not initialized (TDZ applies).
   var hoisted AND initialized as undefined.
*/

// EXAMPLE 6: let in loops — each iteration new binding
console.log("\n--- Let in Loops ---");

for (let j = 0; j < 3; j++) {
    // let is block-scoped to this iteration
    setTimeout(() => console.log("j in loop:", j), 100 * j);
    // Each iteration new binding of j
}
// console.log("j after loop:", j); // ReferenceError!

/* Explanation:
   With let, each loop iteration get NEW binding.
   So setTimeout capture different j each time.
   If var used, all setTimeout see same j (3, 3, 3).
   
   This because:
   - var: one variable across all iterations
   - let: new variable each iteration (block scope)
*/

// ===================================================
// 3. CONST — Block Scoped, Must Initialize
// ===================================================

console.log("\n=== CONST BEHAVIOR ===");

// EXAMPLE 7: const must initialize
const APP_NAME = "TechFlow";
console.log("const APP_NAME:", APP_NAME); // "TechFlow"

/* Explanation:
   const MUST initialize at declaration.
   Trying declare without value: SyntaxError.
*/

// const notInitialized; // SyntaxError!

// EXAMPLE 8: const not reassignable (primitives)
try {
    const pi = 3.14;
    console.log("pi before:", pi); // 3.14
    // pi = 3.14159; // Error!
    console.log("Cannot reassign const primitive");
} catch (e) {
    console.log("Error:", e.message);
}

/* Explanation:
   const prevent reassignment. But important!
   const prevent REASSIGNMENT not MUTATION.
   
   For primitives (number, string, boolean):
   - Reassignment impossible
   
   For objects/arrays:
   - Reassignment impossible
   - But properties/elements CAN be mutated!
*/

// EXAMPLE 9: const with objects — mutation allowed
const person = { name: "Yogendra", age: 20 };
console.log("person before:", person); // { name: "Yogendra", age: 20 }

person.age = 21; // ALLOWED (mutation, not reassignment)
person.email = "yog@tech.com"; // ALLOWED (add property)
console.log("person after mutation:", person);

// person = {}; // ERROR! (reassignment not allowed)

/* Explanation:
   const not make object immutable, just prevent
   reassignment. To prevent mutation, use Object.freeze().
*/

// EXAMPLE 10: const with arrays
const colors = ["red", "blue"];
console.log("colors before:", colors);

colors.push("green"); // ALLOWED (mutation)
console.log("colors after push:", colors);

// colors = []; // ERROR! (reassignment not allowed)

// ===================================================
// 4. SCOPE TYPES
// ===================================================

console.log("\n=== SCOPE TYPES ===");

// EXAMPLE 11: Global Scope
const GLOBAL_VAR = "I in global scope";

function showGlobal() {
    console.log("From function, global accessible:", GLOBAL_VAR);
}
showGlobal();

// EXAMPLE 12: Function Scope
function functionScopeDemo() {
    const functionScoped = "Only inside this function";
    console.log("Inside function:", functionScoped);
    
    function nestedFunction() {
        console.log("Nested can see parent function scope:", functionScoped);
    }
    nestedFunction();
}
functionScopeDemo();
// console.log(functionScoped); // ReferenceError!

// EXAMPLE 13: Block Scope
{
    const blockScoped = "Only inside this block";
    console.log("Inside block:", blockScoped);
}
// console.log(blockScoped); // ReferenceError!

// ===================================================
// 5. SCOPE CHAIN & LEXICAL SCOPE
// ===================================================

console.log("\n=== SCOPE CHAIN & LEXICAL SCOPE ===");

// EXAMPLE 14: Scope Chain
const global = "global level";

function outer() {
    const outerVar = "outer level";
    
    function middle() {
        const middleVar = "middle level";
        
        function inner() {
            const innerVar = "inner level";
            
            // inner can access: innerVar, middleVar, outerVar, global
            console.log("Inner can access innerVar:", innerVar);
            console.log("Inner can access middleVar:", middleVar);
            console.log("Inner can access outerVar:", outerVar);
            console.log("Inner can access global:", global);
        }
        inner();
    }
    middle();
}
outer();

/* Explanation:
   Scope Chain: engine look variable in order:
   1. Local scope (current function/block)
   2. Outer function scope (parent function)
   3. Outer outer scope (grandparent)
   4. ... continue up to global scope
   5. If not found anywhere → ReferenceError
   
   This called SCOPE CHAIN.
*/

// EXAMPLE 15: Lexical Scope (Static Scope)
const dynamic = "change me";

function lexicalDemo() {
    const lexicalVar = "lexical";
    
    function showVar() {
        console.log("In showVar, access:", lexicalVar);
        // Lexical scope = scope determine at WRITE time
        // Not at CALL time. So even if call showVar
        // from somewhere else, still see lexicalVar here.
    }
    return showVar;
}

const func = lexicalDemo();
func(); // Still see lexicalVar (lexical/static scope)

/* Explanation:
   Lexical Scope (Static Scope):
   Scope determine WHERE function written, not WHERE called.
   
   Not Dynamic Scope (where called matter).
   
   JavaScript use Lexical Scope. Function "remember"
   where it written and access parent scope from there.
*/

// ===================================================
// 6. CLOSURE — Key Concept
// ===================================================

console.log("\n=== CLOSURES ===");

// EXAMPLE 16: Closure — Function remember parent scope
function makeCounter() {
    let count = 0; // This variable "captured" in closure
    
    return function increment() {
        count++;
        console.log("Count:", count);
        return count;
    };
}

const counter = makeCounter();
counter(); // Count: 1
counter(); // Count: 2
counter(); // Count: 3

/* Explanation:
   increment() have access to count variable
   from makeCounter scope even after makeCounter finished!
   
   This CLOSURE. Function "close over" (capture)
   variables from parent scope.
   
   Perfect for data privacy and function factories.
*/

// EXAMPLE 17: Closure Practical Example — Private Variable
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable
    
    return {
        deposit: function(amount) {
            balance += amount;
            console.log(`Deposited ${amount}. New balance: ${balance}`);
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                console.log(`Withdrew ${amount}. New balance: ${balance}`);
            } else {
                console.log("Insufficient funds!");
            }
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log("Final balance:", account.getBalance());

// No way access balance directly — it private!
// console.log(account.balance); // undefined

// ===================================================
// 7. VAR VS LET VS CONST — COMPARISON TABLE
// ===================================================

console.log("\n=== VAR vs LET vs CONST COMPARISON ===");

const comparisonTable = `
┌─────────────────────────────────────────────────────────────────┐
│           VAR          │          LET           │        CONST      │
├─────────────────────────────────────────────────────────────────┤
│ Scope: Function        │ Scope: Block           │ Scope: Block      │
│ Hoisted: Yes           │ Hoisted: Yes (TDZ)     │ Hoisted: Yes (TDZ)│
│ Initialized: undefined │ Initialized: Not (TDZ) │ Init: Not (TDZ)   │
│ Redeclare: Yes         │ Redeclare: No          │ Redeclare: No     │
│ Reassign: Yes          │ Reassign: Yes          │ Reassign: No      │
│ TDZ: No                │ TDZ: Yes               │ TDZ: Yes          │
│ Use: Avoid (legacy)    │ Use: Most cases        │ Use: Prefer       │
└─────────────────────────────────────────────────────────────────┘

Best Practice:
1. Use CONST by default (prevent reassignment)
2. Use LET if reassignment needed (prefer over var)
3. Avoid VAR (legacy, confusing scope rules)
`;
console.log(comparisonTable);

// ===================================================
// 8. HOISTING DEEP DIVE
// ===================================================

console.log("\n=== HOISTING DEEP DIVE ===");

// EXAMPLE 18: Hoisting comparison
console.log("\n--- Before Hoisting (code as written) ---");
function hoistingDemo() {
    console.log("a (var):", a); // undefined (hoisted)
    // console.log("b (let):", b); // ReferenceError (TDZ)
    // console.log("c (const):", c); // ReferenceError (TDZ)
    
    var a = 1;
    let b = 2;
    const c = 3;
    
    console.log("a, b, c after declaration:", a, b, c);
}
hoistingDemo();

/* Explanation — Hoisting Process:

Step 1: Compilation Phase
  var a;        // declared, initialized undefined
  let b;        // declared, NOT initialized (TDZ start)
  const c;      // declared, NOT initialized (TDZ start)

Step 2: Execution Phase
  function call
  console.log("a (var):", a);     // undefined (declared, not init)
  // console.log("b (let):", b);  // ReferenceError (TDZ active)
  // console.log("c (const):", c); // ReferenceError (TDZ active)
  
  a = 1;        // initialize a
  let b = 2;    // exit TDZ for b, initialize
  const c = 3;  // exit TDZ for c, initialize
*/

// ===================================================
// 9. PRACTICAL SCENARIOS
// ===================================================

console.log("\n=== PRACTICAL SCENARIOS ===");

// SCENARIO 1: Loop variable — why let better than var
console.log("\n--- Loop Variable Problem ---");

// BAD: var version
const varButtons = [1, 2, 3];
const varFuncs = [];

for (var i = 0; i < varButtons.length; i++) {
    varFuncs.push(function() {
        return `Button ${i}`;
    });
}

console.log("Var version (wrong):");
varFuncs.forEach((f, idx) => console.log(`  Function ${idx}:`, f())); // All show 3!

// GOOD: let version
const letButtons = [1, 2, 3];
const letFuncs = [];

for (let j = 0; j < letButtons.length; j++) {
    letFuncs.push(function() {
        return `Button ${j}`;
    });
}

console.log("Let version (correct):");
letFuncs.forEach((f, idx) => console.log(`  Function ${idx}:`, f())); // Show 0, 1, 2!

// SCENARIO 2: try-catch scope
console.log("\n--- Try-Catch Scope ---");

try {
    throw new Error("Something wrong!");
} catch (err) {
    console.log("Catch block — error message:", err.message);
}
// console.log("err outside catch:", err); // ReferenceError (let scope!)

/* Explanation:
   Error object in catch block block-scoped (like let).
   Not accessible outside catch block.
*/

// ===================================================
// 10. DEFENSE QUESTIONS & ANSWERS
// ===================================================

const defenseQA = `
╔═══════════════════════════════════════════════════════════════╗
║             DEFENSE QUESTIONS & ANSWERS                       ║
╚═══════════════════════════════════════════════════════════════╝

Q1: "Hoisting bhanne ke ho? var, let, const ko 
    hoisting behavior ko difference ke ho?"

A1: Hoisting JavaScript ma variable declarations move
    to top function/scope. Teen type:
    
    var: Hoisted, initialized as undefined
         console.log(x); // undefined (not error!)
         var x = 5;
    
    let/const: Hoisted, NOT initialized (TDZ active)
         console.log(x); // ReferenceError!
         let x = 5;
    
    TDZ (Temporal Dead Zone) = Zone between scope enter
    and declaration. In TDZ, variable exist but not
    initialized — can't access!

─────────────────────────────────────────────────────────────────

Q2: "var, let, const ka scope ko difference explain gara?"

A2: Three different scope types:
    
    var:   Function-scoped. Block not create scope.
           if (true) { var x = 1; }
           console.log(x); // 1 (accessible!)
    
    let:   Block-scoped. Any block create scope.
           if (true) { let y = 2; }
           console.log(y); // ReferenceError!
    
    const: Block-scoped (same like let). Plus,
           can't reassign.
    
    Function scope apply all three. But var leak
    outside block — this problem!

─────────────────────────────────────────────────────────────────

Q3: "Scope chain ka matlab ke ho? Kina important?"

A3: Scope chain = order engine look variable when
    need access.
    
    Order:
    1. Local scope (current function)
    2. Parent function scope
    3. Grandparent function scope
    ... continue up
    4. Global scope
    5. Not found → ReferenceError
    
    Important because understand kiya variable
    access garchau, kya niskine, data privacy,
    closure understand bina difficult.

─────────────────────────────────────────────────────────────────

Q4: "Closure bhanne ke ho? Real example dinus?"

A4: Closure = Function retain parent scope access
    after parent function finish. Useful data privacy.
    
    Example:
    function makeCounter() {
        let count = 0; // This private variable
        return () => ++count;
    }
    
    const counter = makeCounter();
    counter(); // 1
    counter(); // 2
    
    'count' variable trapped in closure. No way
    access from outside. Perfect private variable!
    
    Banking system: deposit/withdraw on private
    balance. Shopping cart: private total amount.

─────────────────────────────────────────────────────────────────

Q5: "Kina let ra const prefer garchau var ko
    jagha?"

A5: Three reason:
    
    1. Scope clear: Block scope, not leak
       if (true) { let x = 1; }
       console.log(x); // Error clear!
    
    2. TDZ safety: ReferenceError instead undefined
       console.log(y); // ReferenceError (clear bug)
       let y = 2;
    
    3. Const prevent reassignment by default
       const pi = 3.14; // Can't change accidentally
       
    var create confusing bug. let/const modern
    JavaScript best practice.

╚═══════════════════════════════════════════════════════════════╝
`;

console.log(defenseQA);

// ===================================================
// SUMMARY
// ===================================================

console.log(`
✓ var: Function-scoped, hoisted, initialized undefined
✓ let: Block-scoped, hoisted, TDZ, prefer for reassignment
✓ const: Block-scoped, hoisted, TDZ, no reassignment (prefer!)
✓ Hoisting: Variable declaration move to top
✓ TDZ: Temporal Dead Zone (can't access let/const before declare)
✓ Scope Chain: Order variable look when access
✓ Closure: Function retain parent scope access
✓ Best Practice: const by default, let if reassign, avoid var
`);

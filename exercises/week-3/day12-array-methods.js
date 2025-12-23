/*
===================================================
WEEK 3 — DAY 12: JavaScript Array Methods
===================================================

Topics:
- filter, map, find, findIndex
- every, some, reduce
- sort, flat, flatMap
- Comparing methods vs for loops
- Real data practice

Dataset: 10 intern objects with name, age, score,
department, passed status. Practice every array
method on real data to understand deeply.

Date: December 23, 2025
===================================================
*/

// ===================================================
// DATASET — 10 Interns (Real Data)
// ===================================================

const interns = [
    { name: "Yogendra", age: 20, score: 85, department: "Frontend", passed: true },
    { name: "Priya", age: 21, score: 72, department: "Backend", passed: true },
    { name: "Rajesh", age: 22, score: 55, department: "DevOps", passed: false },
    { name: "Aisha", age: 20, score: 92, department: "Frontend", passed: true },
    { name: "Kumar", age: 23, score: 78, department: "Backend", passed: true },
    { name: "Shreya", age: 21, score: 68, department: "Design", passed: false },
    { name: "Arjun", age: 22, score: 88, department: "Frontend", passed: true },
    { name: "Neha", age: 20, score: 95, department: "Backend", passed: true },
    { name: "Vikram", age: 21, score: 60, department: "Frontend", passed: false },
    { name: "Divya", age: 22, score: 82, department: "Design", passed: true }
];

console.log("=== DATASET: 10 Interns ===");
console.table(interns);

// ===================================================
// 1. FILTER — Get items matching condition
// ===================================================

console.log("\n===== 1. FILTER METHOD =====");

// TASK: Get all interns PASSED (passed: true)

// METHOD 1: Using filter()
const passedInterns = interns.filter(intern => intern.passed);
console.log("METHOD 1 — Using filter():");
console.table(passedInterns);

// METHOD 2: Using for loop (equivalent)
const passedInternsLoop = [];
for (let i = 0; i < interns.length; i++) {
    if (interns[i].passed === true) {
        passedInternsLoop.push(interns[i]);
    }
}
console.log("METHOD 2 — Using for loop:");
console.table(passedInternsLoop);

/* Explanation:
   filter() return NEW array with elements PASS condition.
   Original array NOT modified.
   
   Syntax: array.filter((element, index, array) => condition)
   
   For each element, run callback:
   - If callback return true → include element
   - If callback return false → skip element
   
   For loop equivalent:
   - Loop through all element
   - Check condition
   - If true, push to new array
*/

// ===================================================
// 2. MAP — Transform each element
// ===================================================

console.log("\n===== 2. MAP METHOD =====");

// TASK: Get only names of interns

// METHOD 1: Using map()
const internNames = interns.map(intern => intern.name);
console.log("METHOD 1 — Using map():");
console.log(internNames);

// METHOD 2: Using for loop
const internNamesLoop = [];
for (let i = 0; i < interns.length; i++) {
    internNamesLoop.push(interns[i].name);
}
console.log("METHOD 2 — Using for loop:");
console.log(internNamesLoop);

/* Explanation:
   map() return NEW array with TRANSFORMED elements.
   Each element passed to callback, return value
   become new element in result array.
   
   Syntax: array.map((element, index, array) => newValue)
   
   IMPORTANT: map() always return same LENGTH array,
   but elements may transformed completely different.
   
   For loop equivalent:
   - Loop through all element
   - Transform each
   - Push transformed value to new array
*/

// ADVANCED MAP: Transform to new object
console.log("\n--- Map with object transformation ---");

const internReport = interns.map(intern => ({
    name: intern.name,
    status: intern.passed ? "PASS" : "FAIL",
    score: `${intern.score}%`
}));
console.log("Transformed to report format:");
console.table(internReport);

// ===================================================
// 3. FIND — Get first element matching condition
// ===================================================

console.log("\n===== 3. FIND METHOD =====");

// TASK: Find first intern with score > 90

// METHOD 1: Using find()
const topScorer = interns.find(intern => intern.score > 90);
console.log("METHOD 1 — Using find():");
console.log(topScorer);

// METHOD 2: Using for loop
let topScorerLoop = undefined;
for (let i = 0; i < interns.length; i++) {
    if (interns[i].score > 90) {
        topScorerLoop = interns[i];
        break; // Stop after finding first
    }
}
console.log("METHOD 2 — Using for loop:");
console.log(topScorerLoop);

/* Explanation:
   find() return FIRST element matching condition.
   If no element match, return undefined.
   
   Syntax: array.find((element, index, array) => condition)
   
   IMPORTANT: find() stop after finding first match!
   Not like filter() which find all match.
   
   For loop equivalent:
   - Loop through element
   - Check condition
   - If match, get that element and break
   - Return element or undefined
*/

// Find intern by name
const findYogendra = interns.find(i => i.name === "Yogendra");
console.log("Find by name 'Yogendra':", findYogendra);

// ===================================================
// 4. FINDINDEX — Get index of first matching element
// ===================================================

console.log("\n===== 4. FINDINDEX METHOD =====");

// TASK: Find INDEX of intern with name "Neha"

// METHOD 1: Using findIndex()
const nehaIndex = interns.findIndex(intern => intern.name === "Neha");
console.log("METHOD 1 — Using findIndex():");
console.log("Neha at index:", nehaIndex);
console.log("Element at that index:", interns[nehaIndex]);

// METHOD 2: Using for loop
let nehaIndexLoop = -1;
for (let i = 0; i < interns.length; i++) {
    if (interns[i].name === "Neha") {
        nehaIndexLoop = i;
        break;
    }
}
console.log("METHOD 2 — Using for loop:");
console.log("Neha at index:", nehaIndexLoop);

/* Explanation:
   findIndex() return INDEX (position) of first
   element matching condition.
   If no match, return -1 (not 0!).
   
   Syntax: array.findIndex((element, index, array) => condition)
   
   For loop equivalent:
   - Loop through element with index
   - Check condition
   - If match, return that index
   - If no match after loop, return -1
*/

// ===================================================
// 5. FILTER + MAP COMBINATION
// ===================================================

console.log("\n===== 5. FILTER + MAP COMBINATION =====");

// TASK: Get names of PASSED interns

// METHOD 1: Using filter().map()
const passedNames = interns
    .filter(intern => intern.passed)
    .map(intern => intern.name);
console.log("METHOD 1 — filter().map():");
console.log(passedNames);

// METHOD 2: Using for loop
const passedNamesLoop = [];
for (let i = 0; i < interns.length; i++) {
    if (interns[i].passed) {
        passedNamesLoop.push(interns[i].name);
    }
}
console.log("METHOD 2 — Using for loop:");
console.log(passedNamesLoop);

/* Explanation:
   Chaining methods: .filter().map()
   First filter get passed interns.
   Then map transform to only names.
   
   This common pattern — filter then transform.
*/

// ===================================================
// 6. EVERY — Do ALL elements match condition?
// ===================================================

console.log("\n===== 6. EVERY METHOD =====");

// TASK: Did all interns pass?

// METHOD 1: Using every()
const allPassed = interns.every(intern => intern.passed);
console.log("METHOD 1 — Using every():");
console.log("All interns passed?:", allPassed); // false (some failed)

// METHOD 2: Using for loop
let allPassedLoop = true;
for (let i = 0; i < interns.length; i++) {
    if (!interns[i].passed) {
        allPassedLoop = false;
        break; // Stop if find one false
    }
}
console.log("METHOD 2 — Using for loop:");
console.log("All interns passed?:", allPassedLoop);

/* Explanation:
   every() return true if ALL elements match condition.
   Return false if ANY element NOT match.
   
   Syntax: array.every((element, index, array) => condition)
   
   Key: STOP checking after first false!
   (Short-circuit evaluation)
   
   For loop equivalent:
   - Set flag to true initially
   - Loop through element
   - If any element NOT pass condition, set flag false
   - Break immediately
   - Return flag
*/

// Check if all score >= 50
const allAbove50 = interns.every(intern => intern.score >= 50);
console.log("All scored >= 50?:", allAbove50); // false (one 55)

// ===================================================
// 7. SOME — Do ANY elements match condition?
// ===================================================

console.log("\n===== 7. SOME METHOD =====");

// TASK: Is there any intern from Frontend department?

// METHOD 1: Using some()
const hasFrontend = interns.some(intern => intern.department === "Frontend");
console.log("METHOD 1 — Using some():");
console.log("Is any Frontend intern?:", hasFrontend); // true

// METHOD 2: Using for loop
let hasFrontendLoop = false;
for (let i = 0; i < interns.length; i++) {
    if (interns[i].department === "Frontend") {
        hasFrontendLoop = true;
        break; // Stop if find one match
    }
}
console.log("METHOD 2 — Using for loop:");
console.log("Is any Frontend intern?:", hasFrontendLoop);

/* Explanation:
   some() return true if ANY element match condition.
   Return false if NO element match (or array empty).
   
   Syntax: array.some((element, index, array) => condition)
   
   Key: STOP checking after first true!
   (Short-circuit evaluation)
   
   Opposite of every():
   - every() = all must be true to get true
   - some() = any one true to get true
   
   For loop equivalent:
   - Set flag to false initially
   - Loop through element
   - If any element pass condition, set flag true
   - Break immediately
   - Return flag
*/

// Check if anyone failed
const anyoneFailed = interns.some(intern => !intern.passed);
console.log("Anyone failed?:", anyoneFailed); // true

// ===================================================
// 8. REDUCE — Accumulate value from array
// ===================================================

console.log("\n===== 8. REDUCE METHOD =====");

// TASK 1: Calculate average score

// METHOD 1: Using reduce()
const totalScore = interns.reduce((sum, intern) => sum + intern.score, 0);
const averageScore = totalScore / interns.length;
console.log("METHOD 1 — Using reduce():");
console.log("Total score:", totalScore);
console.log("Average score:", averageScore.toFixed(2)); // 77.50

// METHOD 2: Using for loop
let totalScoreLoop = 0;
for (let i = 0; i < interns.length; i++) {
    totalScoreLoop += interns[i].score;
}
const averageScoreLoop = totalScoreLoop / interns.length;
console.log("METHOD 2 — Using for loop:");
console.log("Total score:", totalScoreLoop);
console.log("Average score:", averageScoreLoop.toFixed(2));

/* Explanation:
   reduce() accumulate single value from array.
   Callback called on each element with:
   - accumulator (previous result)
   - current element
   
   Syntax: array.reduce((accumulator, element) => newAccum, initialValue)
   
   Step by step for above:
   Iteration 1: sum=0, score=85        → 0+85=85
   Iteration 2: sum=85, score=72       → 85+72=157
   Iteration 3: sum=157, score=55      → 157+55=212
   ... continue ...
   Final: sum=775
   
   For loop equivalent:
   - Start with initial value (0)
   - Loop through element
   - Add current element to accumulator
   - Return accumulator
*/

// TASK 2: Count passed vs failed
console.log("\n--- Reduce for counting ---");

// Using reduce() to count
const passFail = interns.reduce((counts, intern) => {
    if (intern.passed) {
        counts.passed++;
    } else {
        counts.failed++;
    }
    return counts;
}, { passed: 0, failed: 0 });

console.log("METHOD 1 — Using reduce():");
console.log("Pass/Fail count:", passFail);

// Using for loop
const passfailLoop = { passed: 0, failed: 0 };
for (let i = 0; i < interns.length; i++) {
    if (interns[i].passed) {
        passfailLoop.passed++;
    } else {
        passfailLoop.failed++;
    }
}
console.log("METHOD 2 — Using for loop:");
console.log("Pass/Fail count:", passfailLoop);

/* Explanation:
   Powerful use reduce() for counting/grouping!
   Accumulator can be object (not just number).
   Build complex result from array data.
*/

// ===================================================
// 9. SORT — Arrange array elements
// ===================================================

console.log("\n===== 9. SORT METHOD =====");

// IMPORTANT: sort() modify original array!

// TASK 1: Sort interns by score (high to low)

// METHOD 1: Using sort()
const sortedByScore = [...interns].sort((a, b) => b.score - a.score);
console.log("METHOD 1 — Using sort():");
console.log("Top 3 by score:");
console.table(sortedByScore.slice(0, 3));

// METHOD 2: Using for loop (bubble sort for simplicity)
const sortedByScoreLoop = [...interns]; // Copy to avoid modifying original
for (let i = 0; i < sortedByScoreLoop.length - 1; i++) {
    for (let j = i + 1; j < sortedByScoreLoop.length; j++) {
        if (sortedByScoreLoop[i].score < sortedByScoreLoop[j].score) {
            // Swap
            [sortedByScoreLoop[i], sortedByScoreLoop[j]] =
                [sortedByScoreLoop[j], sortedByScoreLoop[i]];
        }
    }
}
console.log("METHOD 2 — Using for loop (bubble sort):");
console.log("Top 3 by score:");
console.table(sortedByScoreLoop.slice(0, 3));

/* Explanation:
   sort() arrange array based on comparator function.
   Return negative, 0, or positive:
   - Negative: first argument come before second
   - Zero: no change
   - Positive: second argument come before first
   
   Example: (a, b) => b.score - a.score
   - If b.score > a.score → positive → b come first
   - Result: HIGH to LOW (descending)
   
   WARNING: sort() modify original array!
   Use [...array].sort() to avoid this.
*/

// TASK 2: Sort by name (alphabetical)
const sortedByName = [...interns].sort((a, b) => 
    a.name.localeCompare(b.name)
);
console.log("\nSort by name alphabetical:");
console.log(sortedByName.map(i => i.name));

// ===================================================
// 10. FLAT & FLATMAP — Flatten nested arrays
// ===================================================

console.log("\n===== 10. FLAT & FLATMAP METHODS =====");

// Sample nested data
const nestedInterns = [
    [
        { name: "Group1-Person1", score: 80 },
        { name: "Group1-Person2", score: 85 }
    ],
    [
        { name: "Group2-Person1", score: 75 },
        { name: "Group2-Person2", score: 90 }
    ],
    [
        { name: "Group3-Person1", score: 88 }
    ]
];

console.log("Nested array structure:");
console.log(JSON.stringify(nestedInterns, null, 2));

// METHOD 1: Using flat()
const flatInterns = nestedInterns.flat();
console.log("\nMETHOD 1 — Using flat():");
console.log("Flattened interns:");
console.table(flatInterns);

/* Explanation:
   flat() flatten nested array by specified depth.
   Default depth is 1.
   
   Syntax: array.flat(depth)
   
   Example:
   [[1, 2], [3, 4]].flat() → [1, 2, 3, 4]
   [[[1]], [[2]]].flat(2) → [1, 2] (2 levels deep)
   
   Useful unpack API response (often nested).
*/

// METHOD 2: Using flatMap()
const flatMapNames = nestedInterns.flatMap(group => 
    group.map(person => person.name)
);
console.log("\nMETHOD 2 — Using flatMap():");
console.log("All names from nested groups:");
console.log(flatMapNames);

/* Explanation:
   flatMap() = map() then flat().
   More efficient than chaining map().flat().
   
   Syntax: array.flatMap((element) => mappedValue)
   
   Each element transformed, then results flattened.
*/

// ===================================================
// REAL WORLD EXAMPLE — Combine Multiple Methods
// ===================================================

console.log("\n===== REAL WORLD EXAMPLE =====");

console.log("\nTask: Get average score of PASSED Frontend interns\n");

// Using method chaining
const frontendPassedAvg = interns
    .filter(i => i.department === "Frontend" && i.passed) // Filter
    .map(i => i.score)                                      // Extract scores
    .reduce((sum, score) => sum + score, 0) /               // Sum
    interns.filter(i => i.department === "Frontend" && i.passed).length; // Count

console.log("METHOD 1 — Method chaining:");
console.log("Average score:", frontendPassedAvg.toFixed(2));

// Using for loop (more verbose)
let frontendPassedSum = 0;
let frontendPassedCount = 0;

for (let i = 0; i < interns.length; i++) {
    if (interns[i].department === "Frontend" && interns[i].passed) {
        frontendPassedSum += interns[i].score;
        frontendPassedCount++;
    }
}

const frontendPassedAvgLoop = frontendPassedSum / frontendPassedCount;

console.log("METHOD 2 — Using for loop:");
console.log("Average score:", frontendPassedAvgLoop.toFixed(2));

// ===================================================
// ARRAY METHODS COMPARISON TABLE
// ===================================================

console.log(`
╔════════════════════════════════════════════════════════════╗
║         ARRAY METHODS COMPARISON TABLE                     ║
╠════════════════════════════════════════════════════════════╣
║ METHOD      │ PURPOSE             │ RETURNS                 ║
├─────────────┼─────────────────────┼─────────────────────────┤
║ filter()    │ Keep matching items │ New array (subset)      ║
║ map()       │ Transform items     │ New array (same length) ║
║ find()      │ Get first match     │ Single element/undefined║
║ findIndex() │ Get index of match  │ Number (-1 if not found)║
║ every()     │ All match?          │ Boolean                 ║
║ some()      │ Any match?          │ Boolean                 ║
║ reduce()    │ Accumulate value    │ Single value (any type) ║
║ sort()      │ Arrange items       │ Array (modified!)       ║
║ flat()      │ Flatten nested      │ New array (flattened)   ║
║ flatMap()   │ Map then flatten    │ New array (flattened)   ║
╚════════════════════════════════════════════════════════════╝

Key Takeaways:
✓ filter() + map() = get specific data from array
✓ find()/findIndex() = locate single item
✓ every()/some() = check conditions (boolean result)
✓ reduce() = powerful for accumulation/counting
✓ sort() = be careful, modify original!
✓ flat()/flatMap() = handle nested data
`);

// ===================================================
// DEFENSE QUESTIONS & ANSWERS
// ===================================================

const defenseQA = `
╔════════════════════════════════════════════════════════════╗
║             DEFENSE QUESTIONS & ANSWERS                   ║
╚════════════════════════════════════════════════════════════╝

Q1: "reduce kasari kaam garchha? Real example dinus."

A1: reduce() accumulate single value from array.
    Two parameter: accumulator (previous result),
    current element. Each iteration, return new
    accumulator value.
    
    Example: Calculate total score
    const interns = [
        {name: "A", score: 85},
        {name: "B", score: 72}
    ];
    
    const total = interns.reduce((sum, intern) => {
        return sum + intern.score;
    }, 0);
    // 0 + 85 = 85
    // 85 + 72 = 157
    // Result: 157
    
    Accumulator start 0 (initial value).
    Each step: previous sum + current score.
    Final result single number!

─────────────────────────────────────────────────────────────

Q2: "filter() ra map() ko difference ke ho?"

A2: filter() keep items matching condition.
    map() transform all items.
    
    filter(item => item.passed)
    → return array with only passed items
    → LENGTH may REDUCE
    
    map(item => item.name)
    → return array with names
    → LENGTH SAME (10 items → 10 names)
    
    Different purpose:
    - filter() = SUBSET of original (selection)
    - map() = TRANSFORM original (change each)
    
    Often combine: array.filter().map()

─────────────────────────────────────────────────────────────

Q3: "find() ra filter() ko difference explain gara?"

A3: find() return FIRST element passing test.
    filter() return ALL elements passing test.
    
    find() return single value (or undefined).
    filter() return array.
    
    find():
    const passed = interns.find(i => i.score > 90);
    // Neha { name: "Neha", score: 95 }
    
    filter():
    const passed = interns.filter(i => i.score > 90);
    // [{ name: "Neha", score: 95 }, ...]
    
    Use find() when need ONE match.
    Use filter() when need ALL matches.

─────────────────────────────────────────────────────────────

Q4: "every() ra some() ko difference?"

A4: every() check all elements pass condition.
    some() check any element pass condition.
    
    every(): true if ALL true
    const allPassed = interns.every(i => i.passed);
    // false (some failed)
    
    some(): true if ANY true
    const anyPassed = interns.some(i => i.passed);
    // true (many passed)
    
    Opposite logic:
    - every() = AND logic (all must true)
    - some() = OR logic (any true enough)
    
    Usage:
    - every() = validation (all fields valid?)
    - some() = searching (finding one item?)

─────────────────────────────────────────────────────────────

Q5: "sort() use garera kina careful hunuparyo?"

A5: sort() modify ORIGINAL array!
    Not return new array. Modify exist array.
    
    Original array ni change hunchha:
    const arr = [3, 1, 2];
    arr.sort();
    arr now [1, 2, 3] — original lost!
    
    Solution: Copy first then sort
    const arr = [3, 1, 2];
    const sorted = [...arr].sort();
    // Original arr still [3, 1, 2]
    // sorted is [1, 2, 3]
    
    Use spread operator [...arr] or arr.slice()
    to copy before sorting. Always safe practice!

╚════════════════════════════════════════════════════════════╝
`;

console.log(defenseQA);

console.log(`
✓ Practiced 10+ array methods on real intern data
✓ Showed method vs for loop equivalent
✓ Combined methods for real-world scenarios
✓ Understand accumulation, filtering, mapping, sorting
✓ Ready to use array methods in React projects!
`);

/*
===================================================
WEEK 3 — DAY 14: Asynchronous JavaScript & Promises
===================================================

Topics:
- Promises (resolved, rejected, pending)
- Callback approach (and callback hell)
- Promise chaining (.then pattern)
- async/await modern approach
- Promise.all (parallel execution)
- Promise.allSettled (handle partial failures)
- Error handling with try/catch
- Real API simulation

Date: December 25, 2025
===================================================
*/

// ===================================================
// FAKE API FUNCTIONS (Simulate Network Delay)
// ===================================================

console.log("===== FAKE API SIMULATION =====\n");

// Simulate fetching user data (1 second delay)
const fetchUser = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Yogendra",
                    email: "yogendra@tech.com",
                    profileComplete: false
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
};

// Simulate fetching user posts (1.5 second delay)
const fetchPosts = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "First Post", likes: 10 },
                    { id: 2, title: "Second Post", likes: 25 },
                    { id: 3, title: "Third Post", likes: 42 }
                ]);
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1500);
    });
};

// Simulate fetching comments (0.8 second delay)
const fetchComments = (postId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Nice post!", author: "User1" },
                    { id: 2, text: "Thanks for sharing!", author: "User2" }
                ]);
            } else {
                reject(new Error("Invalid post ID"));
            }
        }, 800);
    });
};

// ===================================================
// 1. CALLBACK APPROACH (CALLBACK HELL)
// ===================================================

console.log("===== 1. CALLBACK APPROACH (CALLBACK HELL) =====\n");

console.log("Fetching data using callbacks...");

/* Explanation:
   Callback = function pass as argument.
   When async operation finish, callback called.
   
   Problem: Multiple nested callbacks create CALLBACK HELL.
   Code hard read, maintain, debug.
   This called "Pyramid of Doom".
*/

function callbackApproach() {
    console.log("START: Fetching user with callbacks");
    
    fetchUser(1)
        .then(user => {
            console.log("User fetched:", user);
            
            fetchPosts(user.id)
                .then(posts => {
                    console.log("Posts fetched:", posts.length, "posts");
                    
                    // Get comments for first post
                    fetchComments(posts[0].id)
                        .then(comments => {
                            console.log("Comments fetched:", comments.length, "comments");
                            console.log("END: Callback approach done\n");
                        })
                        .catch(err => console.log("Error in comments:", err.message));
                })
                .catch(err => console.log("Error in posts:", err.message));
        })
        .catch(err => console.log("Error in user:", err.message));
}

callbackApproach();

// Wait for callbacks to complete (1000 + 1500 + 800 = 3300ms)
setTimeout(() => {
    
    // ===================================================
    // 2. PROMISE CHAINING (.then Pattern)
    // ===================================================

    console.log("===== 2. PROMISE CHAINING (.then Pattern) =====\n");

    /* Explanation:
       Promise chaining flatten nested callbacks.
       Each .then() return new Promise.
       Chain them sequentially with .then().
       Much cleaner than callback!
    */

    console.log("Fetching data using Promise chaining...");

    fetchUser(1)
        .then(user => {
            console.log("User fetched:", user.name);
            return fetchPosts(user.id); // Return Promise to chain
        })
        .then(posts => {
            console.log("Posts fetched:", posts.length, "posts");
            return fetchComments(posts[0].id); // Chain again
        })
        .then(comments => {
            console.log("Comments fetched:", comments.length, "comments");
            console.log("END: Promise chaining done\n");
        })
        .catch(err => console.log("Error in chain:", err.message));

}, 3500);

// Wait for promise chaining to complete
setTimeout(() => {

    // ===================================================
    // 3. ASYNC/AWAIT (Modern Approach)
    // ===================================================

    console.log("===== 3. ASYNC/AWAIT (Modern Approach) =====\n");

    /* Explanation:
       async/await on top of Promise (syntactic sugar).
       async keyword make function return Promise.
       await pause execution until Promise resolve.
       Code look synchronous, easy read!
       Must use inside async function.
    */

    const asyncAwaitApproach = async () => {
        try {
            console.log("Fetching data using async/await...");
            
            const user = await fetchUser(1);
            console.log("User fetched:", user.name);
            
            const posts = await fetchPosts(user.id);
            console.log("Posts fetched:", posts.length, "posts");
            
            const comments = await fetchComments(posts[0].id);
            console.log("Comments fetched:", comments.length, "comments");
            
            console.log("END: Async/await done\n");
        } catch (error) {
            console.log("Error in async/await:", error.message);
        }
    };

    asyncAwaitApproach();

}, 7000);

// ===================================================
// 4. PROMISE.ALL (Parallel Execution)
// ===================================================

setTimeout(() => {

    console.log("===== 4. PROMISE.ALL (Parallel Execution) =====\n");

    /* Explanation:
       Promise.all() run multiple Promises PARALLEL.
       Return single Promise resolving array of result.
       If ANY Promise reject, entire Promise.all reject!
       
       Useful when need ALL result together.
       Faster than sequential (parallel execution).
    */

    console.log("Fetching multiple users in parallel...");

    const promiseAllExample = async () => {
        try {
            // Run all three API calls PARALLEL (at same time)
            // Execution time: max of three (1.5s), not sum (3.3s)
            const [user, posts, comments] = await Promise.all([
                fetchUser(1),
                fetchPosts(1),
                fetchComments(1)
            ]);
            
            console.log("User:", user.name);
            console.log("Posts:", posts.length, "posts");
            console.log("Comments:", comments.length, "comments");
            console.log("END: Promise.all done (parallel execution)\n");
        } catch (error) {
            console.log("Error in Promise.all:", error.message);
        }
    };

    promiseAllExample();

}, 11000);

// ===================================================
// 5. PROMISE.ALLSETTLED (Handle Partial Failures)
// ===================================================

setTimeout(() => {

    console.log("===== 5. PROMISE.ALLSETTLED (Handle Partial Failures) =====\n");

    /* Explanation:
       Promise.allSettled() run multiple Promises PARALLEL.
       NOT reject if some fail. Wait all settle.
       Return array with { status, value/reason }.
       
       Useful when need results even if some fail.
       Better than Promise.all for resilience.
    */

    console.log("Fetching with partial failures...");

    // Mix valid and invalid requests
    const validUser = fetchUser(1); // Valid
    const invalidUser = fetchUser(-1); // Will reject
    const posts = fetchPosts(1); // Valid

    Promise.allSettled([validUser, invalidUser, posts])
        .then(results => {
            console.log("All promises settled:");
            console.log("Result 1 (User):", results[0]); // { status: "fulfilled", value: {...} }
            console.log("Result 2 (Invalid User):", results[1]); // { status: "rejected", reason: Error }
            console.log("Result 3 (Posts):", results[2]); // { status: "fulfilled", value: [...] }
            
            // Process successfully settled only
            const successful = results
                .filter(r => r.status === "fulfilled")
                .map(r => r.value);
            
            console.log("Successfully fetched:", successful.length, "items");
            console.log("END: Promise.allSettled done (partial failures handled)\n");
        })
        .catch(err => console.log("Unexpected error:", err.message));

}, 15500);

// ===================================================
// 6. ERROR HANDLING PATTERNS
// ===================================================

setTimeout(() => {

    console.log("===== 6. ERROR HANDLING PATTERNS =====\n");

    /* Pattern 1: try-catch with async/await */
    const errorHandling1 = async () => {
        try {
            const user = await fetchUser(1);
            console.log("Pattern 1 (try-catch): User fetched");
        } catch (error) {
            console.log("Error caught:", error.message);
        } finally {
            console.log("Pattern 1 complete (always run)");
        }
    };

    /* Pattern 2: .catch() chain */
    const errorHandling2 = () => {
        fetchUser(-1) // Will fail
            .then(user => console.log("User fetched"))
            .catch(error => console.log("Error caught:", error.message))
            .finally(() => console.log("Pattern 2 complete (always run)"));
    };

    /* Pattern 3: Error in chain */
    const errorHandling3 = async () => {
        try {
            const user = await fetchUser(1);
            const posts = await fetchPosts(user.id);
            const comments = await fetchComments(-1); // Fail here
            console.log("Should not reach here");
        } catch (error) {
            console.log("Caught error in chain:", error.message);
        }
    };

    console.log("Testing error handling patterns...");
    errorHandling1();
    errorHandling2();
    errorHandling3();

}, 19000);

// ===================================================
// 7. ADVANCED PATTERNS
// ===================================================

setTimeout(() => {

    console.log("\n===== 7. ADVANCED PATTERNS =====\n");

    /* Pattern: Retry logic */
    const retryPromise = async (promiseFn, maxRetries = 3, delay = 1000) => {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await promiseFn();
            } catch (error) {
                console.log(`Attempt ${i + 1} failed:`, error.message);
                if (i < maxRetries - 1) {
                    await new Promise(r => setTimeout(r, delay));
                    console.log("Retrying...");
                }
            }
        }
        throw new Error("All retries failed");
    };

    /* Pattern: Timeout */
    const timeout = (promise, ms) => {
        return Promise.race([
            promise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), ms)
            )
        ]);
    };

    /* Pattern: Sequential execution (async map) */
    const sequentialMap = async (arr, asyncFn) => {
        const results = [];
        for (const item of arr) {
            results.push(await asyncFn(item));
        }
        return results;
    };

    console.log("Advanced patterns available:");
    console.log("✓ Retry logic for fault tolerance");
    console.log("✓ Timeout for preventing hangs");
    console.log("✓ Sequential execution for ordered operations");

}, 24000);

// ===================================================
// 8. REAL WORLD SCENARIO
// ===================================================

setTimeout(() => {

    console.log("\n===== 8. REAL WORLD SCENARIO =====\n");

    /* Scenario: Dashboard loading
       1. Fetch user data
       2. Fetch user's posts and profile updates in parallel
       3. Fetch comments for featured post
       4. Aggregate and display
    */

    const loadDashboard = async () => {
        try {
            console.log("Loading dashboard...");
            console.log("Step 1: Fetch user");
            
            const user = await fetchUser(1);
            console.log("✓ User loaded:", user.name);
            
            console.log("Step 2: Fetch posts and comments in parallel");
            const [posts, comments] = await Promise.all([
                fetchPosts(user.id),
                fetchComments(1)
            ]);
            
            console.log("✓ Posts loaded:", posts.length);
            console.log("✓ Comments loaded:", comments.length);
            
            console.log("\nDashboard data ready:");
            console.log("- User:", user.name);
            console.log("- Posts:", posts.map(p => p.title));
            console.log("- Comments:", comments.map(c => c.text));
            console.log("\nEND: Dashboard loaded successfully!\n");
            
        } catch (error) {
            console.log("Error loading dashboard:", error.message);
        }
    };

    loadDashboard();

}, 28000);

// ===================================================
// PROMISES VS CALLBACKS VS ASYNC/AWAIT COMPARISON
// ===================================================

setTimeout(() => {

    console.log("===== COMPARISON TABLE =====\n");

    const comparison = `
┌──────────────────────────────────────────────────────────────────┐
│     CALLBACKS vs PROMISES vs ASYNC/AWAIT COMPARISON             │
├──────────────────────────────────────────────────────────────────┤
│ CALLBACKS                                                        │
│ - Nest functions as arguments                                   │
│ - Problem: Callback Hell (hard read, maintain)                  │
│ - Hard error handling                                           │
│ - Limited control flow                                          │
│                                                                  │
│ PROMISES                                                         │
│ - Represent future value                                        │
│ - .then() chaining flatten nested code                          │
│ - .catch() for error handling                                   │
│ - Cleaner than callbacks                                        │
│ - Still complex for multiple operations                         │
│                                                                  │
│ ASYNC/AWAIT (Modern Best!)                                      │
│ - Syntactic sugar on Promise                                    │
│ - Code look synchronous                                         │
│ - try/catch for error handling                                  │
│ - Easiest to read and maintain                                  │
│ - Best for most scenarios                                       │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ BEST PRACTICES                                                   │
│ ✓ Use async/await for most code                                 │
│ ✓ Use Promise.all() for parallel requests                       │
│ ✓ Use Promise.allSettled() for resilience                       │
│ ✓ Always handle errors (try/catch or .catch)                    │
│ ✓ Avoid callback nesting (callback hell)                        │
└──────────────────────────────────────────────────────────────────┘
    `;

    console.log(comparison);

}, 32000);

// ===================================================
// DEFENSE QUESTIONS & ANSWERS
// ===================================================

setTimeout(() => {

    console.log("===== DEFENSE QUESTIONS & ANSWERS =====\n");

    const defenseQA = `
╔═════════════════════════════════════════════════════════════╗
║           DEFENSE QUESTIONS & ANSWERS                      ║
╚═════════════════════════════════════════════════════════════╝

Q1: "Promise bhanne ke ho? Promise kasari kaam garchha?"

A1: Promise represent future value (data from API).
    Three state:
    1. Pending: Still waiting (initial state)
    2. Fulfilled: Success, data received
    3. Rejected: Error happened
    
    Constructor: new Promise((resolve, reject) => {})
    resolve() call → Fulfilled state + pass data
    reject() call → Rejected state + pass error
    
    Promise make async code cleaner than callback.

─────────────────────────────────────────────────────────────

Q2: "Promise.all ra Promise.allSettled ko difference?"

A2: Both run multiple Promise PARALLEL (same time).
    
    Promise.all():
    - Return result only if ALL succeed
    - If ANY fail → entire reject
    - Use when need ALL result
    - Faster but less resilient
    
    Promise.allSettled():
    - Return result ALWAYS (all settle)
    - Even if some fail, continue
    - Result array with { status, value/reason }
    - Better for fault tolerance
    
    Example difference:
    Promise.all: Fail if 1 out of 3 request fail
    Promise.allSettled: Get 2 success + 1 fail result

─────────────────────────────────────────────────────────────

Q3: "Callback hell bhanne ke ho? Kasari avoid garchau?"

A3: Callback Hell = deeply nested callback functions.
    So hard read understand, maintain garna mushkil.
    
    Example (pyramid of doom):
    fetch1(() => {
        fetch2(() => {
            fetch3(() => {
                // deeply nested!
            });
        });
    });
    
    Avoid strategies:
    1. Use Promise chaining (.then())
    2. Use async/await (best!)
    3. Separate function extraction
    4. Error handling with .catch()
    
    Modern code use async/await — callback hell rare.

─────────────────────────────────────────────────────────────

Q4: "async/await ka benefit kya ho?"

A4: async/await make async code look synchronous.
    
    Benefit:
    1. Easy read: code sequential like normal code
    2. Error handling: plain try/catch
    3. Debug: stack trace clear
    4. Flow control: if/loop work naturally
    5. Cleaner code: less callback nesting
    
    Example (async/await readable):
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    // Look like normal code, but actually async!
    
    Without async/await harder understand.

─────────────────────────────────────────────────────────────

Q5: "async function return key kya?"

A5: async function ALWAYS return Promise.
    
    - If return normal value → Promise resolve value
    - If return Promise → return that Promise
    - If throw error → Promise reject error
    
    Example:
    async function getValue() {
        return 42; // Actually return Promise.resolve(42)
    }
    
    getValue() is Promise! So must await or .then()
    const result = await getValue(); // 42
    
    async/await syntactic sugar on Promise!

╚═════════════════════════════════════════════════════════════╝
    `;

    console.log(defenseQA);

}, 36000);

// ===================================================
// SUMMARY
// ===================================================

setTimeout(() => {

    console.log(`
✓ Promises = future value, cleaner than callbacks
✓ Callback hell = avoid with Promise or async/await
✓ Promise chaining = .then() flatten nesting
✓ async/await = modern best way to write async code
✓ Promise.all() = parallel execution, all succeed
✓ Promise.allSettled() = parallel, partial failure OK
✓ Error handling = try/catch or .catch()
✓ async function = always return Promise
✓ await pause = until Promise resolve/reject
✓ Real production = use async/await + error handling!
    `);

}, 40000);

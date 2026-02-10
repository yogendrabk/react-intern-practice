# Day 47: Comprehensive Utility Library Reference

**Date:** February 10, 2026  
**Week:** Week 10, Day 47  
**Topic:** Complete utility library implementation with formatters, validators, and helpers  
**Location:** `yogendra-react-app/src/utils/index.js`

---

## 📚 Overview

This document is the complete API reference for the centralized utility library used throughout the React application. All utility functions are pure functions with no side effects—same input always produces same output.

## 🎯 Core Principles

1. **Pure Functions** — No mutations, no side effects
2. **Single Responsibility** — Each function does ONE thing well
3. **Stateless** — No dependencies on application state or context
4. **Well Documented** — JSDoc comments with examples
5. **Organized by Category** — Easy to find and understand
6. **Barrel Export** — Import from single location: `import { formatDate, validateEmail } from '../utils'`

---

## 📁 Categories

### 1. FORMATTERS — Transform data into readable formats

These functions convert data into human-readable display formats. Perfect for showing dates, numbers, and text in consistent ways.

#### `formatDate(date, format)`

Convert Date to readable string.

**Parameters:**
- `date` {Date|string} — JavaScript Date object or date string
- `format` {string} — 'short' | 'long' | 'time' (default: 'short')

**Returns:** {string}

**Examples:**
```javascript
import { formatDate } from '../utils';

formatDate(new Date(), 'short')  // "Jan 24, 2026"
formatDate(new Date(), 'long')   // "Wednesday, January 24, 2026"
formatDate(new Date(), 'time')   // "2:30:45 PM"
```

**Use Cases:**
- Display date headers in components
- Format post/comment timestamps
- Show schedule/calendar events

---

#### `formatRelativeTime(date)`

Convert timestamp to relative format ("X hours ago").

**Parameters:**
- `date` {Date|string} — Date to format

**Returns:** {string}

**Examples:**
```javascript
import { formatRelativeTime } from '../utils';

const oneHourAgo = new Date(Date.now() - 60*60*1000);
formatRelativeTime(oneHourAgo)  // "1 hour ago"

const twoDaysAgo = new Date(Date.now() - 2*24*60*60*1000);
formatRelativeTime(twoDaysAgo)  // "2 days ago"
```

**Use Cases:**
- Activity feed timestamps
- Comment/post age
- "Last updated" messages

---

#### `formatNumber(num, decimals)`

Format number with thousands separator.

**Parameters:**
- `num` {number} — Number to format
- `decimals` {number} — Decimal places (default: 0)

**Returns:** {string}

**Examples:**
```javascript
import { formatNumber } from '../utils';

formatNumber(1000)           // "1,000"
formatNumber(1234567.89, 2)  // "1,234,567.89"
formatNumber(42.5, 1)        // "42.5"
```

**Use Cases:**
- Display stats/counts
- Show prices without currency symbol
- Format large numbers

---

#### `formatCurrency(amount, currency)`

Format number as currency.

**Parameters:**
- `amount` {number} — Amount to format
- `currency` {string} — Currency code, e.g., 'USD', 'EUR', 'NPR' (default: 'USD')

**Returns:** {string}

**Examples:**
```javascript
import { formatCurrency } from '../utils';

formatCurrency(1234.56)           // "$1,234.56"
formatCurrency(5000, 'EUR')       // "€5,000.00"
formatCurrency(10000, 'NPR')      // "रु10,000.00"
```

**Use Cases:**
- Display prices in e-commerce
- Show financial data
- Payment amounts

---

#### `truncateText(text, length)`

Truncate text and add ellipsis.

**Parameters:**
- `text` {string} — Text to truncate
- `length` {number} — Max characters before truncation (default: 50)

**Returns:** {string}

**Examples:**
```javascript
import { truncateText } from '../utils';

truncateText("Hello World", 8)          // "Hello W..."
truncateText("Short", 20)               // "Short"
truncateText("The quick brown fox", 12) // "The quick..."
```

**Use Cases:**
- Preview text in list views
- Show post excerpt
- Limit description length

---

#### `generateInitials(name)`

Create user initials from name.

**Parameters:**
- `name` {string} — Full name

**Returns:** {string}

**Examples:**
```javascript
import { generateInitials } from '../utils';

generateInitials("Yogendra Kumar")  // "YK"
generateInitials("Alice")           // "A"
generateInitials("ABC DEF GHI")     // "AG"
generateInitials("")                // "?"
```

**Use Cases:**
- Avatar placeholders
- User profile icons
- Display name abbreviations

---

#### `formatBytes(bytes)`

Convert bytes to human-readable size.

**Parameters:**
- `bytes` {number} — Size in bytes

**Returns:** {string}

**Examples:**
```javascript
import { formatBytes } from '../utils';

formatBytes(1024)       // "1.00 KB"
formatBytes(1048576)    // "1.00 MB"
formatBytes(1073741824) // "1.00 GB"
```

**Use Cases:**
- File size display
- Storage usage
- Download/upload progress

---

#### `formatPercentage(value, normalize)`

Format number as percentage.

**Parameters:**
- `value` {number} — Value (0-1 if normalize=true, 0-100 if normalize=false)
- `normalize` {boolean} — Multiply by 100? (default: true)

**Returns:** {string}

**Examples:**
```javascript
import { formatPercentage } from '../utils';

formatPercentage(0.85)       // "85%"
formatPercentage(85, false)  // "85%"
formatPercentage(0.333)      // "33.3%"
```

**Use Cases:**
- Progress bars
- Skill level display
- Statistics

---

### 2. VALIDATORS — Check if data meets requirements

These functions validate user input and data format. Return boolean or object with validation result.

#### `validateEmail(email)`

Check if email format is valid.

**Parameters:**
- `email` {string} — Email to validate

**Returns:** {boolean}

**Examples:**
```javascript
import { validateEmail } from '../utils';

validateEmail("user@example.com")   // true
validateEmail("invalid-email")      // false
validateEmail("")                   // false
```

**Use Cases:**
- Form input validation
- User registration
- Newsletter signup

---

#### `validatePhone(phone)`

Check if phone number has minimum valid length.

**Parameters:**
- `phone` {string} — Phone number (accepts digits, spaces, +, -)

**Returns:** {boolean}

**Examples:**
```javascript
import { validatePhone } from '../utils';

validatePhone("9841234567")         // true
validatePhone("+977 9841234567")    // true
validatePhone("123")                // false
validatePhone("")                   // false
```

**Use Cases:**
- Contact form validation
- User profile updates
- Appointment booking

---

#### `validateURL(url)`

Check if URL format is valid.

**Parameters:**
- `url` {string} — URL to validate

**Returns:** {boolean}

**Examples:**
```javascript
import { validateURL } from '../utils';

validateURL("https://example.com")  // true
validateURL("http://google.com")    // true
validateURL("invalid-url")          // false
```

**Use Cases:**
- Link validation
- Website field in profile
- Social media links

---

#### `validatePassword(password)`

Validate password strength.

**Parameters:**
- `password` {string} — Password to validate

**Returns:** {object}
```javascript
{
  isValid: boolean,  // true if meets minimum requirements
  strength: 'weak' | 'fair' | 'strong'
}
```

**Requirements:**
- Minimum 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character for "strong"

**Examples:**
```javascript
import { validatePassword } from '../utils';

validatePassword("Pass123!")
// { isValid: true, strength: 'strong' }

validatePassword("Pass123")
// { isValid: true, strength: 'fair' }

validatePassword("password")
// { isValid: false, strength: 'weak' }
```

**Use Cases:**
- Password field validation
- Show password strength indicator
- User registration

---

### 3. ARRAY HELPERS — Common array operations

These functions provide convenience methods for working with arrays.

#### `groupBy(arr, keyOrFn)`

Group array items by property or function.

**Parameters:**
- `arr` {array} — Array to group
- `keyOrFn` {string|function} — Property key or function that returns group key

**Returns:** {object} — Object with grouped items

**Examples:**
```javascript
import { groupBy } from '../utils';

// Group by property
const users = [
  {id: 1, role: 'admin'},
  {id: 2, role: 'user'},
  {id: 3, role: 'admin'}
];
groupBy(users, 'role')
// {
//   admin: [{id:1,...}, {id:3,...}],
//   user: [{id:2,...}]
// }

// Group by function
const numbers = [1, 2, 3, 4, 5, 6];
groupBy(numbers, n => n % 2 === 0 ? 'even' : 'odd')
// {
//   even: [2, 4, 6],
//   odd: [1, 3, 5]
// }
```

**Use Cases:**
- Organize users by role
- Filter by status
- Group posts by category

---

#### `sortBy(arr, key, order)`

Sort array by property.

**Parameters:**
- `arr` {array} — Array to sort
- `key` {string} — Property to sort by
- `order` {string} — 'asc' | 'desc' (default: 'asc')

**Returns:** {array} — New sorted array (non-mutating)

**Examples:**
```javascript
import { sortBy } from '../utils';

const users = [
  {name: 'Charlie'},
  {name: 'Alice'},
  {name: 'Bob'}
];

sortBy(users, 'name')
// [{name:'Alice'}, {name:'Bob'}, {name:'Charlie'}]

sortBy(users, 'name', 'desc')
// [{name:'Charlie'}, {name:'Bob'}, {name:'Alice'}]
```

**Use Cases:**
- Sort products by price
- Order users alphabetically
- Sort dates chronologically

---

#### `uniqueBy(arr, key)`

Get unique items from array.

**Parameters:**
- `arr` {array} — Array to filter
- `key` {string} — Property to check (optional, for primitives omit)

**Returns:** {array} — Array with unique items

**Examples:**
```javascript
import { uniqueBy } from '../utils';

// Unique primitives
uniqueBy([1, 2, 2, 3, 1])  // [1, 2, 3]

// Unique by property
const posts = [
  {id: 1, title: 'Post A'},
  {id: 2, title: 'Post B'},
  {id: 1, title: 'Post A Duplicate'}
];
uniqueBy(posts, 'id')
// [{id:1, title:'Post A'}, {id:2, title:'Post B'}]
```

**Use Cases:**
- Remove duplicate entries
- Unique tag suggestions
- Filter repeated items

---

#### `chunk(arr, size)`

Split array into chunks of size.

**Parameters:**
- `arr` {array} — Array to split
- `size` {number} — Chunk size

**Returns:** {array} — Array of chunks

**Examples:**
```javascript
import { chunk } from '../utils';

chunk([1, 2, 3, 4, 5, 6, 7], 3)
// [[1, 2, 3], [4, 5, 6], [7]]

chunk(['a', 'b', 'c'], 2)
// [['a', 'b'], ['c']]
```

**Use Cases:**
- Paginate large lists
- Display grid layouts
- Process data in batches

---

#### `flatten(arr, depth)`

Flatten nested array.

**Parameters:**
- `arr` {array} — Array to flatten
- `depth` {number} — Levels to flatten (default: Infinity)

**Returns:** {array} — Flattened array

**Examples:**
```javascript
import { flatten } from '../utils';

flatten([1, [2, 3], [4, [5, 6]]])
// [1, 2, 3, 4, 5, 6]

flatten([1, [2, [3, [4]]]], 1)
// [1, 2, [3, [4]]]

flatten([1, [2, 3]], 0)
// [1, [2, 3]]
```

**Use Cases:**
- Combine nested lists
- Flatten tree structures
- Normalize API responses

---

### 4. OBJECT HELPERS — Common object operations

These functions help work with object data.

#### `deepMerge(target, source)`

Deep merge objects (non-mutating).

**Parameters:**
- `target` {object} — Base object
- `source` {object} — Object to merge in

**Returns:** {object} — Merged object

**Examples:**
```javascript
import { deepMerge } from '../utils';

const config = {a: 1, b: {c: 2}};
const overrides = {b: {d: 3}};

deepMerge(config, overrides)
// {a: 1, b: {c: 2, d: 3}}
```

**Use Cases:**
- Merge configuration objects
- Combine theme overrides
- Settings merge

---

#### `pick(obj, keys)`

Select specific properties from object.

**Parameters:**
- `obj` {object} — Object to pick from
- `keys` {array} — Property keys to pick

**Returns:** {object} — New object with selected properties

**Examples:**
```javascript
import { pick } from '../utils';

const user = {id: 1, name: 'Alice', email: 'alice@example.com', password: 'secret'};
pick(user, ['id', 'name', 'email'])
// {id: 1, name: 'Alice', email: 'alice@example.com'}
```

**Use Cases:**
- Create API request payload
- Extract safe fields
- Filter sensitive data

---

#### `omit(obj, keys)`

Remove specific properties from object.

**Parameters:**
- `obj` {object} — Object to filter
- `keys` {array} — Properties to remove

**Returns:** {object} — New object without specified properties

**Examples:**
```javascript
import { omit } from '../utils';

const user = {id: 1, name: 'Alice', password: 'secret'};
omit(user, ['password'])
// {id: 1, name: 'Alice'}
```

**Use Cases:**
- Remove password before sending
- Hide sensitive fields
- API response transformation

---

#### `flattenObject(obj, prefix)`

Flatten nested object to dot-notation keys.

**Parameters:**
- `obj` {object} — Object to flatten
- `prefix` {string} — Key prefix (default: '')

**Returns:** {object}

**Examples:**
```javascript
import { flattenObject } from '../utils';

const nested = {
  user: {
    profile: {
      name: 'Alice',
      contact: {email: 'alice@example.com'}
    }
  }
};

flattenObject(nested)
// {
//   'user.profile.name': 'Alice',
//   'user.profile.contact.email': 'alice@example.com'
// }
```

**Use Cases:**
- Convert nested form data
- API query parameters
- Flatten nested metadata

---

### 5. STRING HELPERS — Common string operations

These functions manipulate and transform strings.

#### `capitalize(str)`

Capitalize first letter.

**Parameters:**
- `str` {string} — String to capitalize

**Returns:** {string}

**Examples:**
```javascript
import { capitalize } from '../utils';

capitalize("hello world")        // "Hello world"
capitalize("JAVASCRIPT")          // "JAVASCRIPT"
capitalize("")                    // ""
```

**Use Cases:**
- Display user names
- Format section titles
- Proper case for labels

---

#### `slugify(str)`

Convert string to URL-safe slug.

**Parameters:**
- `str` {string} — String to slugify

**Returns:** {string}

**Examples:**
```javascript
import { slugify } from '../utils';

slugify("Hello World!")           // "hello-world"
slugify("React JS Tutorial")      // "react-js-tutorial"
slugify("  Multiple   Spaces  ")  // "multiple-spaces"
```

**Use Cases:**
- Generate URL paths
- Create file names
- Format blog post titles

---

#### `highlight(text, highlightText)`

Add highlight tags around matching text.

**Parameters:**
- `text` {string} — Text to highlight in
- `highlightText` {string} — Text to find and highlight

**Returns:** {string} — Text with `<mark>` tags

**Examples:**
```javascript
import { highlight } from '../utils';

highlight("Hello World", "World")
// "Hello <mark>World</mark>"

highlight("The quick brown fox", "quick")
// "The <mark>quick</mark> brown fox"
```

**Use Cases:**
- Search result highlighting
- Text marker in editor
- Display keyword matches

---

#### `repeat(str, count)`

Repeat string N times.

**Parameters:**
- `str` {string} — String to repeat
- `count` {number} — Repetitions

**Returns:** {string}

**Examples:**
```javascript
import { repeat } from '../utils';

repeat("ab", 3)   // "ababab"
repeat("*", 5)    // "*****"
repeat("-", 10)   // "----------"
```

**Use Cases:**
- Create visual separators
- Generate padding
- Repeat pattern

---

#### `padString(str, length, char)`

Pad string to target length.

**Parameters:**
- `str` {string} — String to pad
- `length` {number} — Target length
- `char` {string} — Padding character (default: ' ')

**Returns:** {string}

**Examples:**
```javascript
import { padString } from '../utils';

padString("5", 3, "0")           // "005"
padString("hello", 10, ".")      // "hello....."
padString("test", 8, " ")        // "test    "
```

**Use Cases:**
- Format numbers with leading zeros
- Align text
- Visual alignment

---

## 🔗 Usage Examples in Components

### Example 1: Users List Component

```javascript
import { formatDate, truncateText, generateInitials } from '../utils';

export function UsersList({ users }) {
  return (
    <div className="users-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <div className="avatar">{generateInitials(user.name)}</div>
          <h3>{user.name}</h3>
          <p>{truncateText(user.bio, 50)}</p>
          <span>{formatDate(user.joinedAt, 'short')}</span>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Posts Feed Component

```javascript
import { formatRelativeTime, truncateText } from '../utils';

export function PostsFeed({ posts }) {
  return (
    <div className="posts-feed">
      {posts.map(post => (
        <article key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>{truncateText(post.content, 150)}</p>
          <time>{formatRelativeTime(post.createdAt)}</time>
        </article>
      ))}
    </div>
  );
}
```

### Example 3: Form Validation

```javascript
import { validateEmail, validatePassword, validatePhone } from '../utils';

export function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const emailValid = validateEmail(email);
  const phoneValid = validatePhone(phone);
  const { isValid: passwordValid, strength } = validatePassword(password);

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={emailValid ? 'valid' : 'invalid'}
      />
      <input value={phone} onChange={e => setPhone(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p>Password strength: {strength}</p>
      <button disabled={!emailValid || !phoneValid || !passwordValid}>
        Register
      </button>
    </form>
  );
}
```

---

## ✅ Best Practices

1. **Always use utilities for formatting** — Never hardcode date.toLocaleDateString() etc.
2. **Validate input early** — Use validators before processing
3. **Use appropriate function** — Pick most specific function for your use case
4. **Combine utilities** — `sortBy(groupBy(items, 'type'), 'date')`
5. **Import specific functions** — Better tree-shaking: `import { formatDate } from '../utils'`
6. **Cache immutable results** — Formatters useful for useMemo

---

## 🎓 Defense Questions & Answers

**Q: "Utility library design garda ke ke consider garchau?"**

**A:** Key principles for utility library design:

1. **Pure Functions** — No side effects. Same input = same output. Easier to test and debug.

2. **Single Responsibility** — Each function does ONE thing. Easier to compose and reuse.

3. **No State** — Functions don't depend on external state, making them predictable.

4. **Well Documented** — JSDoc comments with examples for each function. Reduces onboarding time.

5. **Organized by Category** — Related functions grouped together (formatters, validators, helpers).

6. **Barrel Export** — Single import location (index.js) for convenience.

7. **Immutable Operations** — Functions don't mutate input. Safe to use in React components.

8. **Composable** — Functions can be combined: `sortBy(uniqueBy(items, 'id'), 'name')`

Example of good design:
```javascript
// Good - Pure function, single responsibility
function formatDate(date, format) {
  // ... logic
  return formattedString;
}

// Problem - Not pure (depends on other code)
let dateFormat = 'short';
function formatDate(date) {
  // uses global dateFormat - unpredictable!
}
```

---

**Last Updated:** February 10, 2026  
**Used throughout:** PostsPage, UsersPage, DataTable, Dashboard, Portfolio, About pages

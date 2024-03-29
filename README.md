# SimpleSet

A proof-of-concept implementation of a set for Node.js.

## Installation
```
npm install https://github.com/andygarfield/simple-set
```

## Usage

```javascript
import { SimpleSet } from "simple-set";

const s = new SimpleSet([1, 3, 4]);
s.length; // 3
s.add(6); // SimpleSet { 1, 3, 4, 6 }
s.remove(6); // SimpleSet { 1, 3, 4 }
s.toArray(); // [ 1, 3, 4 ]
s.has(3); // true
s.has(5); // false
s.equals(new SimpleSet([1, 3, 4])); // true

const s1 = new SimpleSet([1, "foo", 2, 4, 3]);
const s2 = new SimpleSet([2, 3, 6]);
s1.union(s2); // SimpleSet { 1, foo, 2, 4, 3, 6 }
s1.intersect(s2); // SimpleSet { 2, 3 }
s1.minus(s2); // SimpleSet { 1, foo, 4 }

// and it's also an iterator
for (let item of s1) {
    console.log(item);
}
```

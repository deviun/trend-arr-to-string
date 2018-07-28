# trend-arr-to-string v0.0.2

Async replacer array of numbers to string.

**Install**

```bash
npm i trend-arr-to-string
```

**Test**

```bash
npm test
```

**Replace array to string**

```javascript
const Replacer = require('trend-arr-to-string');

const yourArr = [1, 2, 3, 4];
const string = await Replacer.replace(arr);

console.log(string); // 1,2,3,4
```

### Arguments

| Name 	| Type 	| Description 	| Default 	|
|-----------	|--------	|--------------------------------	|---------	|
| array | Array 	| Array of numbers. 	| [ ] 	|
| stepLimit 	| Number 	| Limit the numbers for one step. 	| 256 	|

**Replace array to ranges**

```javascript
const Replacer = require('trend-arr-to-string');

const yourArr = [1, 3, 4, 5, 6, 7, 8, 12, 13, 15];
const ranges = await Replacer.getRanges(arr);

console.log(ranges); // [[1], [3, 8], [12, 13], [15]]
```

**Replace array to string ranges**

```javascript
const Replacer = require('trend-arr-to-string');

const yourArr = [1, 3, 4, 5, 6, 7, 8, 12, 13, 15];
const ranges = await Replacer.getStringRanges(arr);

console.log(ranges); // 1,3-8,12-13,15
```
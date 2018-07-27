# trend-arr-to-string v0.0.1

Async replacer array of numbers to string.

**Install**

```bash
npm i trend-arr-to-string
```

**Test**

```bash
npm test
```

**Use**

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
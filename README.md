# mahdi.js
Originally created to address personal common programming needs, this small library offers a number of randomization options, some String and Array enhancements, as well as some statistical tools and an asynchronous loop.

## Issues
Please post bugs and other issues in this [repository](https://github.com/mahdiASC/mahdi_js/issues).

# Documentation
## Construction

```javascript
M === mahdi; // true
const m = new M; 
```

The constructor can accept an object to set seed for randomizing

```javascript
const m = new M({seed:123});
const p = new M({seed:123});

m.random(); // 0.9650931040878277
p.random(); // 0.9650931040878277
```

The constructor can accept an object to dictate if String and Array enhancements should occur (true by default)

```javascript
const m = new M({enhance:false});
"blah".capFirst(); // ERROR: capFirst is not a function

const n = new M;
"blah".capFirst(); // "Blah"
```

## Randomization

### .random()  
Responsible for main pseudo-randomization functionality.
* With no arguments, returns decimal between 0 (inclusive) and 1 (exclusive).
```javascript
m.random(); // 0.16526106787346073
```
* If given 1 array argument, returns a random element from the array.
```javascript
const arr = ["one","two","three"];
m.random(arr); // "two" 
```
* If given 1 number argument, returns a random integer between 0 (inclusive) and the given number (exclusive).
```javascript
m.random(200); // 101
```
* If given 2 number arguments, returns a random integer between min (inclusive) and the max number (exclusive).
```javascript
m.random(30,60); // 49
```

### .normRand()
Generates a pseudo-random number based on a normal distrubution.
* If given no argument, will return a decimal with a std of 1 and a mean of 0.
```javascript
m.normRand(); // -1
```
* If given 1 number argument, will return an integer with a std of the given number and a mean of 0.
```javascript
m.normRand(10); // 7
```

* If given 2 number arguments, will return a decimal with a std of the frst given number and a mean of second given number.
```javascript
m.normRand(10,100); // 112
```

### .randName()
Generates a random name-like string.

```javascript
m.randName();// "Umudo"
```

Takes a number argument as the number of 'words' to return.
A second string argument can be provided as the delimiter (" " by default).
```javascript
m.randName(3);// "Lodu Ukatubo Bu"

m.randName(3,", ");// "Luro, Kemiwu, Isufuo"
```

### .randProb()
Returns a key from input object based on that key's number value (counts or probabilities).

*As counts*
```javascript
let probabilities = {
    "a":10,
    "b":5,
    "c":5
}
m.randProb(probabilities); // "a"
m.randProb(probabilities); // "a"
m.randProb(probabilities); // "c"
m.randProb(probabilities); // "a"
m.randProb(probabilities); // "b"
```
*As probabilities*
```javascript
let probabilities = {
    "a":0.5,
    "b":0.25,
    "c":0.25
}
m.randProb(probabilities); // "c"
m.randProb(probabilities); // "a"
m.randProb(probabilities); // "b"
m.randProb(probabilities); // "a"
m.randProb(probabilities); // "a"
```

## Enhanced String methods
### .capFirst
Capitalizes first letter of a string or each element of an array.

```javascript
m.capFirst("blah"); // "Blah"
// With enhancement
"haha".capFirst(); // "Haha"
```
Can be given an additional boolean argument to capitalize each word. The delimiter can be provided as an additional argument (" " by default);
```javascript
const phrase = "look out radioactive man!";
m.capFirst(phrase, true); // "Look Out Radioactive Man!"
// With enhancement
phrase.capFirst(true); // "Look Out Radioactive Man!"

m.capFirst(phrase, true, "a"); // "Look out raDioaCtive maN!
phrase.capFirst(true, "a"); // "Look out raDioaCtive maN!
```
Can be given an array of strings and returns a new array with each string capitalized.  
*Note: additional arguments behave as expected*
```javascript
const arr = ["this rocks","don't you","think?"];
m.capFirst(arr); // ["This rocks", "Don't you", "Think?"]
//With enhancement
arr.capFirst(); // ["This rocks", "Don't you", "Think?"]
arr.capFirst(true); // ["This Rocks", "Don't You", "Think?"]
arr.capFirst(true, "o"); // ["This roCks", "DoN't yoU", "Think?"]
```

### filterASCII

```javascript
```
## Enhanced Array methods
sum  
avg  
sd  
remove  
findDups  

## Statistical Tools
zScore  
calcPercentile

## Asyncronous Loop
asyncLoop


# Future Development
* Fix constructor to accept arguments more intuitively
* Library Website
* Allow seeding with string argument
* chi-square testing function
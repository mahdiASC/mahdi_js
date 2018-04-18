<p align="center"><img width="200px" src="https://raw.githubusercontent.com/mahdiASC/mahdi_js/master/assets/M.png"></p>

# Mahdi.js

![GitHub release](https://img.shields.io/github/release/mahdiASC/mahdi_js.svg)
[![GitHub license](https://img.shields.io/github/license/mahdiASC/mahdi_js.svg)](https://github.com/mahdiASC/mahdi_js/blob/master/license)
[![GitHub issues](https://img.shields.io/github/issues/mahdiASC/mahdi_js.svg)](https://github.com/mahdiASC/mahdi_js/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-blue.svg)

Originally created to address personal common programming needs, this small library offers a number of randomization options, some String and Array enhancements, as well as some statistical tools and an asynchronous loop.

# Issues
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
arr.random(); // "three"
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
m.normRand(); // -0.7409607351958362
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

m.randName(3, ", ");// "Luro, Kemiwu, Isufuo"
```

### .randProb()
Returns a key from input object based on that key's number value as counts or probabilities.

*As counts*
```javascript
const counts = {
    "a":10,
    "b":5,
    "c":5
}
m.randProb(counts); // "a"
m.randProb(counts); // "a"
m.randProb(counts); // "c"
m.randProb(counts); // "a"
m.randProb(counts); // "b"
```
*As probabilities*
```javascript
const probabilities = {
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
### .capFirst()
Capitalizes first letter of a string or each element of an array.

```javascript
m.capFirst("blah"); // "Blah"
"haha".capFirst(); // "Haha"
```
Can be given an additional boolean argument to capitalize each word. The delimiter can be provided as an additional argument (" " by default).
```javascript
const phrase = "look out radioactive man!";
m.capFirst(phrase, true); // "Look Out Radioactive Man!"
phrase.capFirst(true); // "Look Out Radioactive Man!"

m.capFirst(phrase, true, "a"); // "Look out raDioaCtive maN!
phrase.capFirst(true, "a"); // "Look out raDioaCtive maN!
```
Can be given an array of strings and returns a new array with each string capitalized.  
*Note: additional arguments behave as expected*
```javascript
const arr = ["this rocks","don't you","think?"];
m.capFirst(arr); // ["This rocks", "Don't you", "Think?"]
arr.capFirst(); // ["This rocks", "Don't you", "Think?"]
arr.capFirst(true); // ["This Rocks", "Don't You", "Think?"]
arr.capFirst(true, "o"); // ["This roCks", "DoN't yoU", "Think?"]
```

### .filterASCII()
Removes non-ASCII characters from string or array elements.

```javascript
const word = "t¢e¥s®t±";
m.filterASCII(word); // "test"
word.filterASCII(); // "test"

const arr = ["t¢","e¥","s®","t±"];
m.filterASCII(arr); // ["t", "e", "s", "t"]
arr.filterASCII(); // ["t", "e", "s", "t"]
```

## Enhanced Array methods

### .sum()
Sums array of numbers.
```javascript
const arr = [1,2,3,4];
m.sum(arr); // 10
arr.sum(); // 10
```
### .avg()
Returns average of array of numbers.
```javascript
const arr = [1,2,3,4];
m.avg(arr); // 2.5
arr.avg(); // 2.5
```
### .sd()
Returns standard deviation of array of numbers.
```javascript
const arr = [1,2,3,4,5,6,7,8,9,10];
m.sd(arr); // 2.8722813232690143
arr.sd(); // 2.8722813232690143
```
### .remove()
Removes given item from array (modifying it) and returns the item.  

remove(arr, item, flag = false)
```javascript
const someItem = {"key":"value"};
const arr = [9,false, someItem, 9];

m.remove(arr, someItem); // {"key":"value"}
arr; // [9, false, 9]

arr.remove(9); // 9
arr; // [false, 9]
```

If flag is true, all occurances will be removed and an array of each item removed will be returned.

```javascript
const arr = [9,false, "yo", 9, 5, "yo"];

m.remove(arr, "yo", true); // ["yo", "yo"]
arr; // [9, false, 9, 5]

arr.remove(9, true); // [9, 9]
arr; // [false, 5]
```
### .findDups()
Returns array of duplicate items.

If given an additional boolean argument of false, will return a new array with dupicates removed from array given.
```javascript
const arr = ["a","b","c","b","a","a"];
m.findDups(arr); // ["b","a"]
m.findDups(arr, false); // ["c"]

arr.findDups(); // ["b","a"]
arr.findDups(false); // ["c"]
```

## Statistical Tools
### .zScore()
Returns a number (+/-) representing how many standard deviations the value is from the mean.  

.zScore(val, mean, stdv)

```javascript
const valInQuestion = 5;
const meanOfPopulation = 20;
const standardDev = 7;
m.zScore(valInQuestion,meanOfPopulation,standardDev); // -2.142857142857143
```
### .calcPercentile()
Returns statistical percentile for a given z-score for a one-sided tail.
```javascript
const z_score = -2.142857142857143;
m.calcPercentile(z_score); // 0.016199999999999992
```

## Asyncronous Loop
### .asyncLoop()
Loops an asyncronous function a number of iterations and returns a Promise.  

.asyncLoop(iterations, func)  

*NOTE: func will be supplied 2 arguments: the current loop iteration and a callback function ("resolve" from a Promise) which must be called when the func has completed its asyncronous task*
```javascript
const myFunction = (iteration, resolve) => {
    // Some asyncronous task
    setTimeout(function(){
        console.log(iteration);
        resolve(); // must call this when done
    }, 1000);
}

m.asyncLoop(10,myFunction);
```

# License

This library is and related files in this repository are held to the standard [MIT License](https://github.com/mahdiASC/mahdi_js/blob/master/license).

# Future Development
* Fix constructor to accept arguments more intuitively
* Creation of library website
* Allow seeding with string argument
* chi-square testing function
* Add CONTRIBUTING.md
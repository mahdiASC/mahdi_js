describe("M", function () {
    // constructor
    it("should be defined", function () {
        expect(M).toBeDefined();
    });

    describe("constructor", function () {
        it("should run without arguments without error", function () {
            expect(() => new M).not.toThrow();
        });

        // seed
        it("should accept a number argument as the first argument and set the .seed property to that value", function () {
            let x = new M(123);
            expect(x.seed).toBe(123);
        });

        it("should accept an object with a 'seed' key and a number value and set the .seed property to that value", function () {
            let x = new M({ seed: 5 });
            expect(x.seed).toBe(5);
        });

        //enhanceFlag
        it("should accept an object with a 'enhance' key and a boolean value and set the .enhanceFlag property to that value", function () {
            let x = new M({ enhance: false });
            expect(x.enhanceFlag).toBeFalsy();

            let y = new M({ enhance: true });
            expect(y.enhanceFlag).toBeTruthy();
        });

        it("should accept a boolean argument as the second argument and set the .enhanceFlag property to that value", function () {
            let x = new M(123, true);
            expect(x.enhanceFlag).toBeTruthy();

            let y = new M(123, false);
            expect(y.enhanceFlag).toBeFalsy();
        });

        it("should set .enhanceFlag property to 'true' by default", function () {
            let y = new M;
            expect(y.enhanceFlag).toBeTruthy();

        });
    });

    //////////
    //CONFIG//
    //////////
    // setConfigs
    describe("._setConfigs", function () {
        it("should properly set the .randFunc based on whether 'seed' provided during construction", function () {
            let m1 = new M(123);
            let m2 = new M(123);
            expect(m1.randFunc(1)).toBe(m2.randFunc(1));

            let m5 = new M({ seed: 321 });
            let m6 = new M({ seed: 321 });
            expect(m5.randFunc(1)).toBe(m6.randFunc(1));

            let m3 = new M;
            let m4 = new M;
            expect(m3.randFunc(1)).not.toBe(m4.randFunc(1)); // unlikely, but possible for equality
        });

        it("should properly call .enhance by default", function () {
            let m = new M;
            spyOn(m, "enhance");
            m._setConfigs();
            expect(m.enhance).toHaveBeenCalled();
        });

        it("should not call .enhance when provided 'false' parameter to constructor using object with 'enhance' key", function () {
            let m = new M({ enhance: false });
            spyOn(m, "enhance");
            m._setConfigs();
            expect(m.enhance).not.toHaveBeenCalled();
        });
    });

    // enhance
    describe(".enhance", function () {
        describe("adds String and Array methods by default and not add them when {enhance:false} passed to constructor", function () {
            let checkStringMethod = function (method_name) {
                delete String.prototype[method_name];
                let s = "";
                new M({ enhance: false });
                expect(s.__proto__.hasOwnProperty(method_name)).toBeFalsy();

                new M;
                expect(s.__proto__.hasOwnProperty(method_name)).toBeTruthy();
            }

            let checkArrayMethod = function (method_name) {
                delete Array.prototype[method_name];
                let a = [];

                new M({ enhance: false });
                expect(a.__proto__.hasOwnProperty(method_name)).toBeFalsy();

                new M;
                expect(a.__proto__.hasOwnProperty(method_name)).toBeTruthy();
            }

            let checkBoth = function (method_name) {
                checkStringMethod(method_name);
                checkArrayMethod(method_name);
            }
            //capFirst
            it("should add String and Array .capFirst method", function () {
                checkBoth("capFirst");
            });

            // filterASCII
            it("should add String and Array .filterASCII method", function () {
                checkBoth("filterASCII");
            });

            // sum
            it("should add Array .sum method", function () {
                checkArrayMethod("sum");
            });
            // sd
            it("should add Array .sd method", function () {
                checkArrayMethod("sd");
            });
            // remove
            it("should add Array .remove method", function () {
                checkArrayMethod("remove");
            });
            // findDups
            it("should add Array .findDups method", function () {
                checkArrayMethod("findDups");
            });
            // random
            it("should add Array .random method", function () {
                checkArrayMethod("random");
            });
        });

        describe("should not enhance when methods are already defined", function () {
            let checkStringMethod = function (method_name) {
                let temp = String.prototype[method_name];
                delete String.prototype[method_name];
                let my_func = () => { };
                Object.defineProperty(String.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: my_func
                })
                new M;
                expect(""[method_name] === my_func).toBeTruthy();
                Object.defineProperty(String.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: temp
                })
            }

            let checkArrayMethod = function (method_name) {
                let temp = Array.prototype[method_name];
                delete Array.prototype[method_name];
                let my_func = () => { };
                Object.defineProperty(Array.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: my_func
                })
                new M;
                expect([][method_name] === my_func).toBeTruthy();
                Object.defineProperty(Array.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: temp
                })
            }

            let checkBoth = function (method_name) {
                checkStringMethod(method_name);
                checkArrayMethod(method_name);
            }

            //capFirst
            it(".capFirst ", function () {
                checkBoth("capFirst");
            });

            // filterASCII
            it(".filterASCII ", function () {
                checkBoth("filterASCII");
            });

            // sum
            it(".sum", function () {
                checkArrayMethod("sum");
            });
            // sd
            it(".sd", function () {
                checkArrayMethod("sd");
            });
            // remove
            it(".remove", function () {
                checkArrayMethod("remove");
            });
            // findDups
            it(".findDups", function () {
                checkArrayMethod("findDups");
            });
        });
    });

    //////////
    //RANDOM//
    //////////
    // creating chi-square testng function (pulled from http://www.fourmilab.ch/rpkp/experiments/analysis/chiCalc.html )
    /*  POCHISQ  --  probability of chi-square value

              Adapted from:
                      Hill, I. D. and Pike, M. C.  Algorithm 299
                      Collected Algorithms for the CACM 1967 p. 243
              Updated for rounding errors based on remark in
                      ACM TOMS June 1985, page 185
    */
    function pochisq(x, df) {
        var a, y, s;
        var e, c, z;
        var even;                     /* True if df is an even number */
        var BIGX = 20.0;                  /* max value to represent exp(x) */

        function ex(x) {
            return (x < -BIGX) ? 0.0 : Math.exp(x);
        }

        /*  POZ  --  probability of normal z value

            Adapted from a polynomial approximation in:
                    Ibbetson D, Algorithm 209
                    Collected Algorithms of the CACM 1963 p. 616
            Note:
                    This routine has six digit accuracy, so it is only useful for absolute
                    z values < 6.  For z values >= to 6.0, poz() returns 0.0.
        */

        function poz(z) {
            var y, x, w;
            var Z_MAX = 6.0;              /* Maximum meaningful z value */

            if (z == 0.0) {
                x = 0.0;
            } else {
                y = 0.5 * Math.abs(z);
                if (y >= (Z_MAX * 0.5)) {
                    x = 1.0;
                } else if (y < 1.0) {
                    w = y * y;
                    x = ((((((((0.000124818987 * w
                        - 0.001075204047) * w + 0.005198775019) * w
                        - 0.019198292004) * w + 0.059054035642) * w
                        - 0.151968751364) * w + 0.319152932694) * w
                        - 0.531923007300) * w + 0.797884560593) * y * 2.0;
                } else {
                    y -= 2.0;
                    x = (((((((((((((-0.000045255659 * y
                        + 0.000152529290) * y - 0.000019538132) * y
                        - 0.000676904986) * y + 0.001390604284) * y
                        - 0.000794620820) * y - 0.002034254874) * y
                        + 0.006549791214) * y - 0.010557625006) * y
                        + 0.011630447319) * y - 0.009279453341) * y
                        + 0.005353579108) * y - 0.002141268741) * y
                        + 0.000535310849) * y + 0.999936657524;
                }
            }
            return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5);
        }

        var LOG_SQRT_PI = 0.5723649429247000870717135; /* log(sqrt(pi)) */
        var I_SQRT_PI = 0.5641895835477562869480795;   /* 1 / sqrt(pi) */

        if (x <= 0.0 || df < 1) {
            return 1.0;
        }

        a = 0.5 * x;
        even = !(df & 1);
        if (df > 1) {
            y = ex(-a);
        }
        s = (even ? y : (2.0 * poz(-Math.sqrt(x))));
        if (df > 2) {
            x = 0.5 * (df - 1.0);
            z = (even ? 1.0 : 0.5);
            if (a > BIGX) {
                e = (even ? 0.0 : LOG_SQRT_PI);
                c = Math.log(a);
                while (z <= x) {
                    e = Math.log(z) + e;
                    s += ex(c * z - a - e);
                    z += 1.0;
                }
                return s;
            } else {
                e = (even ? 1.0 : (I_SQRT_PI / Math.sqrt(a)));
                c = 0.0;
                while (z <= x) {
                    e = e * (a / z);
                    c = c + e;
                    z += 1.0;
                }
                return c * y + s;
            }
        } else {
            return s;
        }
    }
    /**
     * Counts number of item in array.
     * @param {Array} array array of items
     * @param {*} item item from array
     * @return count of number of time item occurs in array
     */
    function countOfOccurance(array, item) {
        let count = 0;
        for (let _item of array) if (item === _item) count++;
        return count;
    }
    // random
    describe(".random", function () {
        let trials = 1000;
        let pValThresh = 0.029; // will randomly fail sometimes!
        let m;

        it("should work properly as an Array method when enhancement is active ",function(){
            new M({enhance:true});
            let arr = [1,3,4,5];
            expect(()=>arr.random()).not.toThrow();
            let arr2 = [];
            for(let i = 0; i<trials; i++){
                arr2.push(arr.random());
            }
            expect(arr2.every(x=>arr.includes(x))).toBeTruthy();
        });

        beforeEach(function () {
            m = new M;
        });

        it("(take with grain of salt) should return pseudorandom numbers by default", function () {
            expect(typeof m.random()).toBe("number");

            // testing pseudorandomness using chi-square testing
            let arr = new Array(10).fill(0); // holding bins
            for (let i = 0; i < trials; i++) {
                let bin = Math.floor(m.random() * 10);
                arr[bin]++;
            }
            let expectedVal = trials / arr.length;
            let qSum = 0;
            for (let count of arr) {
                qSum += Math.pow(count - expectedVal, 2) / expectedVal;
            }

            let degOfFreedom = arr.length - 1;
            expect(pochisq(qSum, degOfFreedom) > pValThresh).toBeTruthy();

        });

        it("should return the same numbers when seed is set", function () {
            let o = new M({ seed: 123 });
            let n = new M({ seed: 123 });
            let arr1 = [];
            let arr2 = [];

            for (let i = 0; i < 100; i++) {
                arr1.push(o.random());
                arr2.push(n.random());
            }
            expect(arr1.every(x => typeof x === "number")).toBeTruthy();
            expect(arr1).toEqual(arr2);
        });

        it("should return different numbers when seed is set", function () {
            let o = new M({ seed: 123 });
            let n = new M({ seed: 321 });
            let arr1 = [];
            let arr2 = [];

            for (let i = 0; i < 100; i++) {
                arr1.push(o.random());
                arr2.push(n.random());
            }
            expect(arr1).not.toEqual(arr2);
        });

        it("should throw error if first argument is not a number or an array", function () {
            expect(() => m.random("blah")).toThrow();
            expect(() => m.random(1)).not.toThrow();
            expect(() => m.random([4, 5, 3])).not.toThrow();
        });

        it("should throw error if second argument is not a number", function () {
            expect(() => m.random(1, "blah")).toThrow();
            expect(() => m.random(1, 1)).not.toThrow();
        });

        it("(take with grain of salt) should return random decimal between 0 (inclusive) and 1 (exclusive) when no arguments given", function () {
            let maxVal = 10;
            let arr1 = [];
            let arr2 = new Array(maxVal).fill(0); // holding bins

            for (let i = 0; i < trials; i++) {
                let randNum = m.random();
                arr1.push(randNum);
                let bin = Math.floor(randNum * 10);
                arr2[bin]++;
            }
            expect(arr1.every(x => x < 1 && x >= 0)).toBeTruthy();

            // testing pseudorandomness using chi-square testing
            let expectedVal = trials / arr2.length;
            let qSum = 0;
            let degOfFreedom = arr2.length - 1;

            for (let count of arr2) {
                qSum += Math.pow(count - expectedVal, 2) / expectedVal;
            }
            expect(pochisq(qSum, degOfFreedom) > pValThresh).toBeTruthy();
        });

        it("(take with grain of salt) when given one number argument, should return random integer between 0 (inclusive) and that number (exclusive)", function () {
            let maxVal = 5;
            let arr1 = [];
            let arr2 = new Array(maxVal).fill(0); // holding bins

            for (let i = 0; i < trials; i++) {
                let randNum = m.random(maxVal);
                arr1.push(randNum);
                let bin = Math.floor(randNum);
                arr2[bin]++;
            }
            expect(arr1.every(x => x < maxVal && x >= 0)).toBeTruthy();

            // testing pseudorandomness using chi-square testing
            let expectedVal = trials / arr2.length;
            let qSum = 0;
            let degOfFreedom = arr2.length - 1;

            for (let count of arr2) {
                qSum += Math.pow(count - expectedVal, 2) / expectedVal;
            }
            expect(pochisq(qSum, degOfFreedom) > pValThresh).toBeTruthy();
        });

        it("(take with grain of salt) when given two number arguments, should return a random integer between first and second argument (exclusive)", function () {
            let maxVal = 8;
            let minVal = 2;
            let arr1 = [];
            let arr2 = new Array(maxVal - minVal).fill(0); // holding bins

            for (let i = 0; i < trials; i++) {
                let randNum = m.random(minVal, maxVal);
                arr1.push(randNum);
                let bin = Math.floor(randNum) - minVal;
                arr2[bin]++;
            }
            expect(arr1.every(x => x < maxVal && x >= minVal)).toBeTruthy();

            // testing pseudorandomness using chi-square testing
            let expectedVal = trials / arr2.length;
            let qSum = 0;
            let degOfFreedom = arr2.length - 1;

            for (let count of arr2) {
                qSum += Math.pow(count - expectedVal, 2) / expectedVal;
            }
            expect(pochisq(qSum, degOfFreedom) > pValThresh).toBeTruthy();
        });

        it("(take with grain of salt) when given an Array as an argument, should return a random item in the array", function () {
            let obj = {};
            let inputArr = ["this", obj, 1, "this", true, "this", "this"];
            let arr = [];

            for (let i = 0; i < trials; i++) {
                let randItem = m.random(inputArr);
                arr.push(randItem);
            }
            expect(arr.every(x => inputArr.includes(x))).toBeTruthy();

            // testing pseudorandomness using chi-square testing
            let qSum = 0;
            let degOfFreedom = inputArr.length - 1;
            for (let item of ["this", obj, 1, true]) {
                let expectedVal = trials / inputArr.length;
                if (item === "this") {
                    expectedVal *= 4;
                }
                qSum += Math.pow(countOfOccurance(arr, item) - expectedVal, 2) / expectedVal;
            }
            expect(pochisq(qSum, degOfFreedom) > pValThresh).toBeTruthy();
        });

    });
    
    describe(".normRand",function(){
        let m;
        let trials = 1000;
        beforeEach(function(){
            m = new M;
        });

        it("should throw error if first argument given is not a number",function(){
            expect(()=>m.normRand()).not.toThrow();
            expect(()=>m.normRand(1)).not.toThrow();
            expect(()=>m.normRand("ha")).toThrowError(TypeError);
        });
        it("should throw error if second argument given is not a number",function(){
            expect(()=>m.normRand(1,3)).not.toThrow();
            expect(()=>m.normRand(1,"ha")).toThrowError(TypeError);
        });

        it("(take with grain of salt) should returns random number with mean of 0 and standard deviation of 1, by default", function(){
            let arr = [];
            let total = 0;
            for(let i = 0;i<trials; i++){
                let num = m.normRand();
                total += num;
                arr.push(num);
            }
            
            let mean = total / trials;
            expect(mean).toBeCloseTo(0,0);
            let std_sum = arr.map(x=>Math.pow(x-mean,2)).reduce((acc,val)=>acc+val);
            let std = Math.sqrt(std_sum/trials);
            expect(std).toBeCloseTo(1,0);
        });
        it("(take with grain of salt) should return a number with a mean of 0 and a standard deviation of the input number", function(){
            let arr = [];
            let total = 0;
            let inputStd = 5;
            for(let i = 0;i<trials; i++){
                let num = m.normRand(inputStd);
                total += num;
                arr.push(num);
            }
            
            let mean = total / trials;
            expect(mean).toBeCloseTo(0,0);
            let std_sum = arr.map(x=>Math.pow(x-mean,2)).reduce((acc,val)=>acc+val);
            let std = Math.sqrt(std_sum/trials);
            expect(std).toBeCloseTo(inputStd,0);
        });
        it("(take with grain of salt) should return a number with the standard deviation of the first number argument and a mean of the second number argument", function(){
            let arr = [];
            let total = 0;
            let inputStd = 5;
            let inputMean = 10;
            for(let i = 0;i<trials; i++){
                let num = m.normRand(inputStd,inputMean);
                total += num;
                arr.push(num);
            }
            
            let mean = total / trials;
            expect(mean).toBeCloseTo(inputMean,0);
            let std_sum = arr.map(x=>Math.pow(x-mean,2)).reduce((acc,val)=>acc+val);
            let std = Math.sqrt(std_sum/trials);
            expect(std).toBeCloseTo(inputStd,0);
        });

        it("should return the same numbers when seed is set", function(){
            let arr1 = [];
            let arr2 = [];
            let o = new M({seed:123});
            let n = new M({seed:123});
            for(let i = 0;i<trials; i++){
                arr1.push(o.normRand());
                arr2.push(n.normRand());
            }
            expect(arr1).toEqual(arr2);
        });
    });

    // randName
    describe(".randName", function () {
        let m;
        const trials = 1000;        
        beforeEach(function(){
            m = new M;
        });

        it("(take with grain of salt) should return pseudorandom strings (names) by default", function () {
            const arr = [];
            let flag = false;
            for(let i = 0; i < 10; i++){
                const name = m.randName();
                if(arr.includes(name)) flag = true;
                arr.push(name);
            }
            expect(flag).toBeFalsy();
        });
        
        it("should accept a number argument and return a string with the same number of words separated by a space, by default", function(){
            const name = m.randName(5);
            expect(name.split(" ").length).toBe(5);
        });

        it("should take a second string argument as the delimiter for the words",function(){
            const name = m.randName(5,"+");
            expect(name.split("+").length).toBe(5);
        });

        it("should throw an error if a non-number argument is given for first argument or nonstring given for second",function(){
            expect(()=>m.randName("yo")).toThrowError(TypeError);
        });
        it("should return the same names when seed is set", function () {
            let m = new M({seed:123});
            let n = new M({seed:123});
            let arr1 = [];
            let arr2 = [];

            for(let i = 0; i<trials; i++){
                arr1.push(m.randName());
                arr2.push(n.randName());
            }

            expect(arr1).toEqual(arr2);
        });
    });

    ///////////////////////
    //STRING MANIPULATION//
    ///////////////////////

    //capFirst
    describe(".capFirst", function () {
        let m;
        beforeEach(function () {
            m = new M;
        });

        it("should capitalize the first letter of a string argument", function () {
            expect(m.capFirst("blah")).toBe("Blah");
        });

        it("should capitalize the first letter of every word of a string argument when 2nd argument passed is 'true'", function () {
            expect(m.capFirst("blah blah", true)).toBe("Blah Blah");
        });

        it("should use 3rd argument as split for every word to be capitalized", function () {
            expect(m.capFirst("blahxblah", true)).toBe("Blahxblah");
            expect(m.capFirst("blahxblah", true, "x")).toBe("BlahxBlah");
        });

        it("should accept an array as an argument and capitalize each string argument, returning a new array", function () {
            expect(m.capFirst(["blah", "blah"])).toEqual(["Blah", "Blah"]);
        });

        it("should throw an error if a non-string is given, or if any item in the array is a non-string", function () {
            expect(() => m.capFirst(123)).toThrowError(TypeError);
        });

        it("should work properly as String method when string enhancement is active", function () {
            // includes all above tests
            let new_m = new M({ "enhance": true });
            expect("blah".capFirst()).toBe("Blah");
            expect("blah jxy".capFirst(true)).toBe("Blah Jxy");
            expect("blahxjxy".capFirst(true)).toBe("Blahxjxy");
            expect("blahxjxy".capFirst(true, "x")).toBe("BlahxJxY");
            expect(["blah", "yxy"].capFirst()).toEqual(["Blah", "Yxy"]);
            expect(["blah blah", "xyz xyz"].capFirst(true)).toEqual(["Blah Blah", "Xyz Xyz"]);
            expect(["blahxblah", "nicenice"].capFirst(true, "x")).toEqual(["BlahxBlah", "Nicenice"]);
        });
    });

    //filterASCII
    describe(".filterASCII", function () {
        it("should properly filter out only ASCII character from an input string", function () {
            let m = new M;
            expect(m.filterASCII("abcdEFG")).toBe("abcdEFG");
            expect(m.filterASCII("ab#$%^cdEFG")).toBe("ab^cdEFG");
        });

        it("should work properly as String method when string enhancement is active", function () {
            let m = new M;
            expect("abcdEFG".filterASCII()).toBe("abcdEFG");
            expect("ab#$%^cdEFG".filterASCII()).toBe("ab^cdEFG");
        });
    });

    //////////
    //ARRAYS//
    //////////

    //sum
    describe(".sum", function () {
        let m;
        beforeEach(function () {
            m = new M;
        });

        it("should properly return the sum of the array", function () {
            let arr = [1, 2, 3];
            expect(m.sum(arr)).toBe(6);
        });
        it("should throw error if any element is not a number", function () {
            let arr = [1, 2, "3"];
            expect(() => m.sum(arr)).toThrowError(TypeError);
        });
        it("should throw error if input is not an array", function () {
            expect(() => m.sum(3)).toThrowError(TypeError);
        });
        it("should return 0 on an empty array", function () {
            let arr = [];
            expect(m.sum(arr)).toBe(0);
        });
        it("should work properly as Array method when enhancement is active", function () {
            new M({ enhance: true });
            let arr = [1, 2, 3];
            expect(arr.sum()).toBe(6);
        });
    });
    //avg
    describe(".avg", function () {
        let m;
        beforeEach(function () {
            m = new M;
        });

        it("should throw error if input is not an array or if any item is not a number", function () {
            let arr = [1, 3, 4, 5, "g"];
            expect(() => m.avg(arr)).toThrowError(TypeError);
        });
        it("should return the average value from the array", function () {
            let arr = [1, 2, 3];
            expect(m.avg(arr)).toBe(2);
        });

        it("should return null on an empty array", function () {
            expect(m.avg([])).toBeNull();
        });

        it("should work properly as Array method when enhancement is active", function () {
            new M({ enhance: true });
            let arr1 = [1, 3, 4, 5, "g"];
            expect(arr1.avg).toThrow();

            let arr2 = [1, 2, 3];
            expect(arr2.avg()).toBe(2);
            expect([].avg()).toBeNull();
        });
    })
    //sd
    describe(".sd", function () {
        let m;
        beforeEach(function () {
            m = new M;
        });
        it("should throw error if any element is not a number of if input is not an array", function () {
            let arr = [1, 3, 4, 5, "g"];
            expect(() => m.sd(arr)).toThrow();
        });

        it("should return the standard deviation of the array of numbers", function () {
            let arr = [2, 4, 4, 4, 5, 5, 7, 9];
            expect(m.sd(arr)).toBe(2);
        });
        it("should return 0 on an empty array", function () {
            expect(m.sd([])).toBe(0);
        });
        it("should work properly as Array method when enhancement is active", function () {
            new M({ enhance: true });
            let arr1 = [1, 3, 4, 5, "g"];
            expect(arr1.sd).toThrow();

            let arr2 = [2, 4, 4, 4, 5, 5, 7, 9];
            expect(arr2.sd()).toBe(2);
            expect([].sd()).toBe(0);
        });
    });
    //remove
    describe(".remove", function () {
        let m;
        beforeEach(function () {
            m = new M;
        });
        it("should throw error if input is not an array", function () {
            expect(() => m.remove("abc", "a")).toThrow();
        });

        it("should remove the second argument given from the array by default and return that element", function () {
            let arr = [1, 2, 3, 4, 5];
            expect(m.remove(arr, 2)).toBe(2);

            let obj = {};
            let arr2 = [1, 2, obj];
            expect(m.remove(arr2, obj)).toBe(obj);
            expect(arr2).toEqual([1, 2]);
        });

        it("should return null if element is not found in the array by default", function () {
            let arr = [1, 2, 3, 4, 5];
            expect(m.remove(arr, 6)).toBeNull();
        });

        it("should remove all instances of the given element if 3nd argument is true and return all elements removed as a new array", function () {
            let arr = ["a", "b", "c", "a", "a", "b"];
            expect(m.remove(arr, "a", true)).toEqual(["a", "a", "a"]);
            expect(arr).toEqual(["b", "c", "b"]);
        });

        it("should return empty array if element is not found and 2nd flag argument is true", function () {
            let arr = [1, 2, 3, 4, 5];
            expect(m.remove(arr, 6, true)).toEqual([]);
        });

        it("should work properly as Array method when enhancement is active", function () {
            let arr = ["a", "b", "c", "a", "a", "b"];
            expect(arr.remove("a")).toBe("a");
            expect(arr).toEqual(["b", "c", "a", "a", "b"]);
            expect(arr.remove("a", true)).toEqual(["a", "a"]);
            expect(arr).toEqual(["b", "c", "b"]);
            expect([].remove("b")).toBeNull();
            expect([].remove("b", true)).toEqual([]);
        });
    });
    //findDups
    describe(".findDups", function () {
        let m;
        beforeEach(function () {
            m = new M;
        });

        it("should throw an error if the first input argument is not an array", function () {
            expect(() => m.findDups(123)).toThrow();
        });

        it("should return an array of duplicate items (individual items that are duplicates in the original array)", function () {
            let obj = {};
            let arr = [1, 1, 1, 2, 4, 1, 5, 5, 6, obj, obj];
            let result = m.findDups(arr);
            expect(result.includes(1)).toBeTruthy();
            expect(result.includes(5)).toBeTruthy();
            expect(result.includes(obj)).toBeTruthy();
        });
        it("should return an empty array if there are no duplicates", function () {
            let arr = [1, 2, 3];
            expect(m.findDups(arr)).toEqual([]);
        });
        it("should return a new array of the non-duplicate items from the array if second argument is false", function () {
            let arr = ["a", "b", "c", "a", "a", "b"];
            let result = m.findDups(arr, false);
            expect(result).toEqual(["c"]);
        });
        it("should work properly as Array method when enhancement is active", function () {
            new M({ enhance: true });
            let obj = {};
            let arr = [1, 1, 1, 2, 1, 5, 5, obj, obj];
            let result = arr.findDups();
            expect(result.includes(1)).toBeTruthy();
            expect(result.includes(5)).toBeTruthy();
            expect(result.includes(obj)).toBeTruthy();
            let result2 = m.findDups(arr, false);
            expect(result2).toEqual([2]);
        });
    });

    /////////
    //STATS//
    /////////
    //randProb
    xdescribe(".randProb", function () {
        it("should throw an error if an object is not given", function () {

        });
        it("should throw an error if any value in the object is not a number", function () {

        });

        it("should use the proper random function given by configs", function () {

        });

        it("should return a key from the given object as a string value", function () {

        });

        it("should return values in proportion to input values given: as percentage totalling 1", function () {

        });

        it("should return values in proportion to input values given: as counts", function () {

        });
    });
    //zScore
    xdescribe(".zScore", function () {
        it("", function () {

        });

        it("should throw error if argument is not a number", function () {

        });
    });
    //calcPercentile
    xdescribe(".calcPercentile", function () {
        it("", function () {

        });
        it("should throw error if argument is not a number", function () {

        });
    });
    //asyncLoop
    xdescribe(".asyncLoop", function () {
        it("should throw an error if a function is not provided as the 3rd argument", function () {

        });

        it("", function () {

        });
        it("", function () {

        });
        it("", function () {

        });
    });
})
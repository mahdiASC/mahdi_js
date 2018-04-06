describe("M",function(){
    // constructor
    describe("constructor",function(){
        it("should run without arguments without error",function(){
            expect(M).toBeDefined();
            expect(()=>new M).not.toThrow();
        });

        // seed
        it("should accept a number argument as the first argument and set the .seed property to that value", function(){
            let x = new M(123);
            expect(x.seed).toBe(123);
        });

        it("should accept an object with a 'seed' key and a number value and set the .seed property to that value", function(){
            let x = new M({seed:5});
            expect(x.seed).toBe(5);
        });

        //enhanceFlag
        it("should accept an object with a 'enhance' key and a boolean value and set the .enhanceFlag property to that value", function(){
            let x = new M({enhance:false});
            expect(x.enhanceFlag).toBeFalsy();
            
            let y = new M({enhance:true});
            expect(y.enhanceFlag).toBeTruthy();
        });

        it("should accept a boolean argument as the second argument and set the .enhanceFlag property to that value", function(){
            let x = new M(123,true);
            expect(x.enhanceFlag).toBeTruthy();

            let y = new M(123,false);
            expect(y.enhanceFlag).toBeFalsy();
        });
        
        it("should set .enhanceFlag property to 'true' by default", function(){
            let y = new M;
            expect(y.enhanceFlag).toBeTruthy();

        });
    });

    //////////
    //CONFIG//
    //////////
    // setConfigs
    describe("._setConfigs",function(){
        it("should properly set the .randFunc based on whether 'seed' provided during construction", function(){
            let m1 = new M(123);
            let m2 = new M(123);
            expect(m1.randFunc(1)).toBe(m2.randFunc(1));
            
            let m5 = new M({seed:321});
            let m6 = new M({seed:321});
            expect(m5.randFunc(1)).toBe(m6.randFunc(1));
            
            let m3 = new M;
            let m4 = new M;
            expect(m3.randFunc(1)).not.toBe(m4.randFunc(1)); // unlikely, but possible for equality
        });

        it("should properly call .enhance by default", function(){
            let m = new M;
            spyOn(m, "enhance");
            m._setConfigs();
            expect(m.enhance).toHaveBeenCalled();
        });
        
        it("should not call .enhance when provided 'false' parameter to constructor using object with 'enhance' key", function(){
            let m = new M({enhance:false});
            spyOn(m, "enhance");
            m._setConfigs();
            expect(m.enhance).not.toHaveBeenCalled();
        });
    });

    // enhance
    describe(".enhance", function(){
        describe("adds String and Array methods by default and not add them when {enhance:false} passed to constructor", function(){
            let checkStringMethod = function (method_name){
                delete String.prototype[method_name];
                let s = "";
                new M({enhance:false});
                expect(s.__proto__.hasOwnProperty(method_name)).toBeFalsy();
                
                new M;
                expect(s.__proto__.hasOwnProperty(method_name)).toBeTruthy();
            }
    
            let checkArrayMethod = function (method_name){
                delete Array.prototype[method_name];
                let a = [];
    
                new M({enhance:false});
                expect(a.__proto__.hasOwnProperty(method_name)).toBeFalsy();
                
                new M;
                expect(a.__proto__.hasOwnProperty(method_name)).toBeTruthy();
            }
    
            let checkBoth = function(method_name){
                checkStringMethod(method_name);
                checkArrayMethod(method_name);
            }
            //capFirst
            it("should add String and Array .capFirst method", function(){
                checkBoth("capFirst");
            });
    
            // filterASCII
            it("should add String and Array .filterASCII method", function(){
                checkBoth("filterASCII");
            });
    
            // quickSort
            it("should add Array .quickSort method", function(){
                checkArrayMethod("quickSort");
            });
            // sum
            it("should add Array .sum method", function(){
                checkArrayMethod("sum");
            });
            // sd
            it("should add Array .sd method", function(){
                checkArrayMethod("sd");
            });
            // remove
            it("should add String and Array .remove method", function(){
                checkArrayMethod("remove");
            });
            // findDups
            it("should add String and Array .findDups method", function(){
                checkArrayMethod("findDups");
            });
        });

        describe("should not enhance when methods are already defined", function(){
            let checkStringMethod = function (method_name){
                let temp = String.prototype[method_name];
                delete String.prototype[method_name];
                let my_func = ()=>{};
                Object.defineProperty(String.prototype, method_name,{
                    enumerable:false,
                    configurable:true,
                    value: my_func
                })
                new M;
                expect(""[method_name]=== my_func).toBeTruthy();
                Object.defineProperty(String.prototype, method_name,{
                    enumerable:false,
                    configurable:true,
                    value: temp
                })
            }
    
            let checkArrayMethod = function (method_name){
                let temp = Array.prototype[method_name];
                delete Array.prototype[method_name];
                let my_func = ()=>{};
                Object.defineProperty(Array.prototype, method_name,{
                    enumerable:false,
                    configurable:true,
                    value: my_func
                })
                new M;
                expect([][method_name] === my_func).toBeTruthy();
                Object.defineProperty(Array.prototype, method_name,{
                    enumerable:false,
                    configurable:true,
                    value: temp
                })
            }
    
            let checkBoth = function(method_name){
                checkStringMethod(method_name);
                checkArrayMethod(method_name);
            }
            
            //capFirst
            it(".capFirst ", function(){
                checkBoth("capFirst");
            });

            // filterASCII
            it(".filterASCII ", function(){
                checkBoth("filterASCII");
            });

            // quickSort
            it(".quickSort", function(){
                checkArrayMethod("quickSort");
            });
            // sum
            it(".sum", function(){
                checkArrayMethod("sum");
            });
            // sd
            it(".sd", function(){
                checkArrayMethod("sd");
            });
            // remove
            it(".remove", function(){
                checkArrayMethod("remove");
            });
            // findDups
            it(".findDups", function(){
                checkArrayMethod("findDups");
            });
        });
    });
    
    //////////
    //RANDOM//
    //////////
    // random
    xdescribe(".random", function(){
        it("should return pseudorandom numbers by default", function(){

        });

        it("should return the same numbers when seed is set", function(){

        });
    });
    // randName
    xdescribe(".randName", function(){
        it("should return pseudorandom names by default", function(){

        });

        it("should return the same names when seed is set", function(){

        });
    });

    ///////////////////////
    //STRING MANIPULATION//
    ///////////////////////

    //capFirst
    describe(".capFirst",function(){
        let m;
        beforeEach(function(){
            m = new M;
        });

        it("should capitalize the first letter of a string argument", function(){
            expect(m.capFirst("blah")).toBe("Blah");
        });
        
        it("should capitalize the first letter of every word of a string argument when 2nd argument passed is 'true'",function(){
            expect(m.capFirst("blah blah", true)).toBe("Blah Blah");
        });

        it("should use 3rd argument as split for every word to be capitalized", function(){
            expect(m.capFirst("blahxblah", true)).toBe("Blahxblah");
            expect(m.capFirst("blahxblah", true, "x")).toBe("BlahxBlah");
        });

        it("should accept an array as an argument and capitalize each string argument, returning a new array", function(){
            expect(m.capFirst(["blah","blah"])).toEqual(["Blah","Blah"]);
        });

        it("should throw an error if a non-string is given, or if any item in the array is a non-string", function(){
            expect(()=>m.capFirst(123)).toThrow();
        });

        it("should work properly as String method when string enhancement is active", function(){
            // includes all above tests
            let new_m = new M({"enhance":true});
            expect("blah".capFirst()).toBe("Blah");
            expect("blah jxy".capFirst(true)).toBe("Blah Jxy");
            expect("blahxjxy".capFirst(true)).toBe("Blahxjxy");
            expect("blahxjxy".capFirst(true, "x")).toBe("BlahxJxY");
            expect(["blah","yxy"].capFirst()).toEqual(["Blah","Yxy"]);
            expect(["blah blah","xyz xyz"].capFirst(true)).toEqual(["Blah Blah","Xyz Xyz"]);
            expect(["blahxblah","nicenice"].capFirst(true, "x")).toEqual(["BlahxBlah","Nicenice"]);
        });
    });

    //filterASCII
    describe(".filterASCII", function(){
        it("should properly filter out only ASCII character from an input string", function(){
            let m = new M;
            expect(m.filterASCII("abcdEFG")).toBe("abcdEFG");
            expect(m.filterASCII("ab#$%^cdEFG")).toBe("ab^cdEFG");
        });

        it("should work properly as String method when string enhancement is active", function(){
            let m = new M;
            expect("abcdEFG".filterASCII()).toBe("abcdEFG");
            expect("ab#$%^cdEFG".filterASCII()).toBe("ab^cdEFG");
        });
    });

    //////////
    //ARRAYS//
    //////////

    //quickSort
    xdescribe(".quickSort",function(){
        let m;
        beforeEach(function(){
            m = new M;
        })

        it("should throw error if first two arguments are not both string or both number or if third argument is not a boolean", function(){
            expect(()=>{m.sort(true, false)}).toThrow();
            expect(()=>{m.sort(1, "a")}).toThrow();
            expect(()=>{m.sort("a", 2)}).toThrow();
            expect(()=>{m.sort(1, 2, 2)}).toThrow();
        })
        it("should not throw error when all parameters are valid",function(){
            expect(()=>{m.sort(1, 2)}).not.toThrow();
            expect(()=>{m.sort(1, 2, true)}).not.toThrow();
        })
        
        it("properly returns values negative number, 0, or positive number when sorting numbers and strings",function(){
            expect(m.quickSort(2,1)>0).toBeTruthy();
            expect(m.quickSort(1,1)===0).toBeTruthy();
            expect(m.quickSort(1,2)<0).toBeTruthy();            
        });

        it("properly returns values -1, 0, or 1 when sorting strings in alphabetical order",function(){
            expect(m.quickSort("b","a")).toBe(1);
            expect(m.quickSort("a","a")).toBe(0);
            expect(m.quickSort("a","b")).toBe(-1);
        });

        it("should have a 3rd optional boolean parameter, which, when true, will sort in descending order",function(){
            expect(m.quickSort(2,1)<0).toBeTruthy();
            expect(m.quickSort(1,1)===0).toBeTruthy();
            expect(m.quickSort(1,2)>0).toBeTruthy();
            expect(m.quickSort("b","a")).toBe(-1);
            expect(m.quickSort("a","a")).toBe(0);
            expect(m.quickSort("a","b")).toBe(1);
        });

        it("should work properly in the Array.sort() method",function(){
            let arr1 = [4,3,2,1];
            expect(arr1.sort(m.quickSort)).toEqual([1,2,3,4]);
            let arr2 = ["d","c","b","a"];
            expect(arr2.sort(m.quickSort)).toEqual(["a","b","c","d"]);
        });

        it("should work properly as an Array method when enhancement is active and can accept boolean value to return descending values",function(){
            let new_m = new M({enhance:true});

            let arr1 = [1,2,3,4];
            expect(arr1.quicksort()).toEqual([1,2,3,4]);
            expect(arr1.quicksort(true)).toEqual([4,3,2,1]);
            
            let arr2 = ["a","b","c","d"];
            expect(arr2.quicksort()).toEqual(["a","b","c","d"]);
            expect(arr2.quicksort(true)).toEqual(["d","c","b","a"]);
        });
    });
    
    //sum
    describe(".sum",function(){
        let m;
        beforeEach(function(){
            m = new M;
        });

        it("should properly return the sum of the array",function(){
            let arr = [1,2,3];
            expect(m.sum(arr)).toBe(6);
        });
        it("should throw error if any element is not a number",function(){
            let arr = [1,2,"3"];
            expect(()=>m.sum(arr)).toThrow();
        });
        it("should throw error if input is not an array",function(){
            expect(()=>m.sum(3)).toThrow();
        });
        it("should return 0 on an empty array",function(){
            let arr = [];
            expect(m.sum(arr)).toBe(0);
        });
        it("should work properly as Array method when enhancement is active",function(){
            new M({enhance: true});
            let arr = [1,2,3];            
            expect(arr.sum()).toBe(6);
        });
    });
    //avg
    describe(".avg",function(){
        let m;
        beforeEach(function(){
            m = new M;
        });

        it("should throw error if input is not an array or if any item is not a number",function(){
            let arr = [1,3,4,5,"g"];
            expect(()=>m.avg(arr)).toThrow();
        });
        it("should return the average value from the array",function(){
            let arr = [1,2,3];
            expect(m.avg(arr)).toBe(2);
        });

        it("should return null on an empty array",function(){
            expect(m.avg([])).toBe(null);
        });

        it("should work properly as Array method when enhancement is active",function(){
            new M({enhance:true});
            let arr1 = [1,3,4,5,"g"];
            expect(arr1.avg).toThrow();

            let arr2 = [1,2,3];
            expect(arr2.avg()).toBe(2);
            expect([].avg()).toBe(null);
        });
    })
    //sd
    describe(".sd",function(){
        let m;
        beforeEach(function(){
            m = new M;
        });
        it("should throw error if any element is not a number of if input is not an array",function(){
            let arr = [1,3,4,5,"g"];
            expect(()=>m.sd(arr)).toThrow();
        });

        it("should return the standard deviation of the array of numbers",function(){
            let arr = [2, 4, 4, 4, 5, 5, 7, 9];
            expect(m.sd(arr)).toBe(2);
        });
        it("should return 0 on an empty array",function(){
            expect(m.sd([])).toBe(0);
        });
        it("should work properly as Array method when enhancement is active",function(){
            new M({enhance:true});
            let arr1 = [1,3,4,5,"g"];
            expect(arr1.sd).toThrow();

            let arr2 = [2, 4, 4, 4, 5, 5, 7, 9];
            expect(arr2.sd()).toBe(2);
            expect([].sd()).toBe(0);
        });
    });
    //remove
    describe(".remove",function(){
        let m;
        beforeEach(function(){
            m = new M;
        });
        it("should throw error if input is not an array",function(){
            expect(()=>m.remove("abc","a")).toThrow();
        });

        it("should remove the second argument given from the array by default and return that element",function(){
            let arr = [1,2,3,4,5];
            expect(m.remove(arr,2)).toBe(2);

            let obj = {};
            let arr2 = [1,2,obj];
            expect(m.remove(arr2,obj)).toBe(obj);
            expect(arr2).toEqual([1,2]);
        });

        it("should return null if element is not found in the array by default",function(){
            let arr = [1,2,3,4,5];            
            expect(m.remove(arr, 6)).toBe(null);
        });
        
        it("should remove all instances of the given element if 3nd argument is true and return all elements removed as a new array",function(){
            let arr = ["a","b","c","a","a","b"];
            expect(m.remove(arr,"a", true)).toEqual(["a","a","a"]);
            expect(arr).toEqual(["b","c","b"]);
        });
        
        it("should return empty array if element is not found and 2nd flag argument is true",function(){
            let arr = [1,2,3,4,5];                        
            expect(m.remove(arr, 6,true)).toEqual([]);
        });

        it("should work properly as Array method when enhancement is active",function(){
            let arr = ["a","b","c","a","a","b"];
            expect(arr.remove("a")).toBe("a");
            expect(arr).toEqual(["b","c","a","a","b"]);
            expect(arr.remove("a",true)).toEqual(["a","a"]);
            expect(arr).toEqual(["b","c","b"]);
            expect([].remove("b")).toBe(null);
            expect([].remove("b",true)).toEqual([]);
        });
    });
    //findDups
    describe(".findDups",function(){
        let m;
        beforeEach(function(){
            m = new M;
        });

        it("should throw an error if the first input argument is not an array",function(){
            expect(()=>m.findDups(123)).toThrow();
        });

        it("should return an array of duplicate items (individual items that are duplicates in the original array)",function(){
            let obj = {};
            let arr = [1,1,1,2,4,1,5,5,6,obj,obj];
            let result = m.findDups(arr);
            expect(result.includes(1)).toBeTruthy();
            expect(result.includes(5)).toBeTruthy();
            expect(result.includes(obj)).toBeTruthy();
        });
        it("should return an empty array if there are no duplicates",function(){
            let arr = [1,2,3];
            expect(m.findDups(arr)).toEqual([]);
        });
        it("should return a new array of the non-duplicate items from the array if second argument is false",function(){
            let arr = ["a","b","c","a","a","b"];
            let result = m.findDups(arr,false);
            expect(result).toEqual(["c"]);
        });
        it("should work properly as Array method when enhancement is active",function(){
            new M({enhance: true});
            let obj = {};            
            let arr = [1,1,1,2,1,5,5,obj,obj];
            let result = arr.findDups();
            expect(result.includes(1)).toBeTruthy();
            expect(result.includes(5)).toBeTruthy();
            expect(result.includes(obj)).toBeTruthy();
            let result2 = m.findDups(arr,false);
            expect(result2).toEqual([2]);
        });
    });

    /////////
    //STATS//
    /////////
    //randProb
    xdescribe(".randProb",function(){
        it("should throw an error if an object is not given",function(){

        });
        it("should throw an error if any value in the object is not a number",function(){

        });

        it("should use the proper random function given by configs",function(){

        });
        
        it("should return a key from the given object as a string value",function(){

        });
        
        it("should return values in proportion to input values given: as percentage totalling 1",function(){

        });

        it("should return values in proportion to input values given: as counts",function(){

        });
    });
    //zScore
    xdescribe(".zScore",function(){
        it("",function(){

        });
        
        it("should throw error if argument is not a number",function(){

        });
    });
    //calcPerc
    xdescribe(".calcPerc",function(){
        it("",function(){

        });
        it("should throw error if argument is not a number",function(){

        });
    });
    //asyncLoop
    xdescribe(".asyncLoop",function(){
        it("should throw an error if a function is not provided as the 3rd argument",function(){

        });

        it("",function(){

        });
        it("",function(){

        });
        it("",function(){

        });
    });
})
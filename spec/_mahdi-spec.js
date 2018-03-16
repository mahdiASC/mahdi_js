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
                delete String.prototype[method_name];
                let my_func = ()=>{};
                new M;
                expect(""[method_name]=== my_func).toBeTruthy();
            }
    
            let checkArrayMethod = function (method_name){
                delete Array.prototype[method_name];
                let my_func = ()=>{};
                new M;
                expect([][method_name]=== my_func).toBeTruthy();
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
            it(".quickSort ", function(){
                checkArrayMethod("quickSort");
            });
            // sum
            it(".sum ", function(){
                checkArrayMethod("sum");
            });
            // sd
            it(".sd ", function(){
                checkArrayMethod("sd");
            });
            // remove
            it(".remove ", function(){
                checkArrayMethod("remove");
            });
            // findDups
            it(".findDups ", function(){
                checkArrayMethod("findDups");
            });
        });
    });
    
    //////////
    //RANDOM//
    //////////
    // random
    xdescribe(".randName", function(){
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

        it("should work properly String method when string enhancement is active", function(){
            // includes all above tests
            let new_m = new M({enhance:true});
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
    xdescribe(".filterASCII", function(){
        it("should properly filter out only ASCII character from an input string", function(){

        });

        it("",function(){

        });
    });

    //////////
    //ARRAYS//
    //////////

    //quickSort
    xdescribe(".quickSort",function(){
        it("properly returns values -1, 0, and 1 when sorting numbers and strings",function(){

        });

        it("should work properly without error in the Array.sort() method",function(){

        });
    });
    
    //sum
    xdescribe(".sum",function(){
        it("should properly return the sum of the array",function(){

        });
        it("should throw error if any element is not a number",function(){

        });
        it("should return 0 on an empty array",function(){

        });
    });
    //sd
    xdescribe(".sd",function(){
        it("should return the standard deviation of the array",function(){

        });
        it("should throw error if any element is not a number",function(){

        });
        it("should return 0 on an empty array",function(){

        });
    });
    //remove
    xdescribe(".remove",function(){
        it("should remove the first given element from the array by default and return it",function(){

        });
        it("should remove all instances of the given element if 2nd flag argument is true and return all elements removed as a new array",function(){

        });
        it("should return null if element is not found in the array by default",function(){

        });
        it("should return empty array if element is not found and 2nd flag argument is true",function(){

        });
    });
    //findDups
    xdescribe(".findDups",function(){
        it("should return an array of duplicate items if no argument given",function(){

        });
        it("should return an empty array if there are no duplicates",function(){

        });
        it("should remove duplicate items if argument is true",function(){

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
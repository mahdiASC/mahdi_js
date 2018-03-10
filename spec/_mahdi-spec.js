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
        it("should accept an object with a 'enhanceFlag' key and a boolean value and set the .enhanceFlag property to that value", function(){
            let x = new M({enhanceFlag:false});
            expect(x.enhanceFlag).toBeFalsy();
            
            let y = new M({enhanceFlag:true});
            expect(y.enhanceFlag).toBeTruthy();
        });

        it("should accept a boolean argument as the second argument and set the .enhanceFlag property to that value", function(){
            let x = new M(123,true);
            expect(x.enhanceFlag).toBeTruthy();

            let y = new M(123,false);
            expect(y.enhanceFlag).toBeFalsy();
        });
    });

    // config
    // setConfigs
    // enhanceArrays
    // enhanceString

    // random

    // randName

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
            let new_m = new M({enhanceFlag:true});
            expect("blah".capFirst()).toBe("Blah");
            expect("blah jxy".capFirst(true)).toBe("Blah Jxy");
            expect("blahxjxy".capFirst(true)).toBe("BlahxJxY");
            expect("blahxjxy".capFirst(true)).toBe("blahxjxy");
            expect(["blah","yxy"].capFirst()).toEqual(["Blah","Yxy"]); //technically and array method!
        });
    });
    //filterASCII
    
    //_enhanceArrays
    
    //_qsFunc

    //quickSort
    
    //sum

    //sd

    //remove

    //findDups

    /////////
    //STATS//
    /////////

    //randProb

    //z_score

    //calc_percentile

    //async_loop


})
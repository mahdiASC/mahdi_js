describe("M",function(){
    // constructor
    describe("constructor",function(){
        it("should run without arguments without error",function(){
            expect(M).toBeDefined();
            expect(()=>new M).not.toThrow();
        });

        it("should accept an object with a 'seed' key and a number value and set the .seed property to that value", function(){
            let x = new M({seed:5});
            expect(x.seed).toBe(5);
        });

        it("should accept a number argument as the first argument and set the .seed property to that value", function(){
            let x = new M(123);
            expect(x.seed).toBe(123);
        });
    });

    // random

    // randName

    ///////////////////////
    //STRING MANIPULATION//
    ///////////////////////

    //capFirst
    de
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
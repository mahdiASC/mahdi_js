describe("M",function(){
    // constructor
    describe("constructor",function(){
        it("should run without arguments without error",function(){
            expect(M).toBeDefined();
            expect(()=>new M).not.toThrow();
        });

        // seed
        it("should accept an object with a 'seed' key and a number value and set the .seed property to that value", function(){
            let x = new M({seed:5});
            expect(x.seed).toBe(5);
        });

        it("should accept a number argument as the first argument and set the .seed property to that value", function(){
            let x = new M(123);
            expect(x.seed).toBe(123);
        });

        //strFlag
        it("should accept an object with a 'strFlag' key and a boolean value and set the .strFlag property to that value", function(){
            let x = new M({strFlag:false});
            expect(x.strFlag).toBeFalsy();
            
            let y = new M({strFlag:true});
            expect(y.strFlag).toBeTruthy();
        });

        it("should accept a boolean argument as the second argument and set the .strFlag property to that value", function(){
            let x = new M(123,true);
            expect(x.strFlag).toBeTruthy();

            let y = new M(123,false);
            expect(y.strFlag).toBeFalsy();
        });
        
        //arrFlag
        it("should accept an object with a 'arrFlag' key and a boolean value and set the .arrFlag property to that value", function(){
            let x = new M({arrFlag:false});
            expect(x.arrFlag).toBeFalsy();
            
            let y = new M({arrFlag:true});
            expect(y.arrFlag).toBeTruthy();
        });
        
        it("should accept a boolean argument as the third argument and set the .arrFlag property to that value", function(){
            let x = new M(123,true,false);
            expect(x.arrFlag).toBeFalsy();
    
            let y = new M(123,false, true);
            expect(y.arrFlag).toBeTruthy();
        });
    });

    // random

    // randName

    ///////////////////////
    //STRING MANIPULATION//
    ///////////////////////

    //capFirst
    describe(".capFirst",function(){

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
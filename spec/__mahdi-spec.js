// functions involving randomly generated output are not included

describe("mahdi.js", function () {
    describe("capFirst", function () {
        it("should take a string argument and throw an error for wrong data type", function () {
            expect(()=>capFirst("test")).not.toThrow();
            expect(()=>capFirst(5)).toThrow();
        });
        it("should return the input string with the first letter capitalized", function () {
            expect(capFirst("abc")).toBe("Abc");
            expect(capFirst("abc abc")).toBe("Abc abc");
        });
        
        it("should have a 2nd boolean parameter that, when true, will capitalize first letter of each letter with a default split of ' '", function () {
            expect(capFirst("abc abc",true)).toBe("Abc Abc");
            expect(()=>capFirst("abc abc",4)).toThrow();
        });
        it("should have a 3rd string option that serves as the split for the 2nd boolean parameter that is ' ' by default", function () {
            expect(capFirst("abc abc", true)).toBe("Abc Abc");
            expect(capFirst("abc abc", true, 'w')).toBe("Abc abc");
            expect(()=>capFirst("abc abc", true, 4)).toThrow();
        });
    });

    describe("sortNumber", function () {
        it("should throw error if either of 2 parameters are not numbers", function () {
            expect(()=>sortNumber(1,"s")).toThrow();
        });
        it("should properly return difference of two number inputs", function () {
            expect(sortNumber(1,3)).toBe(-2);
        });

    });
    
    describe("sunArray", function () {
        it("should throw error if input is not an array or if any element in the array is not a number", function () {
            expect(()=>sumArray(1)).toThrow();
            expect(()=>sumArray([1,3,4,"a"])).toThrow();
        });
        
        it("should return a number value of the sum of each number element in the array", function () {
            expect(sumArray([1,2,3])).toBe(6);
        });
        
    });
    describe("avgArray", function () {
        it("should throw error if input is not an array or if any element is not a number", function () {
            expect(()=>avgArray(1)).toThrow();
            expect(()=>avgArray([1,3,4,"a"])).toThrow();
        });

        it("should return a number value of the average of the array", function () {
            expect(avgArray([1,2,3])).toBe(2);
        });
    });
    describe("stdDev", function () {
        it("should throw error if input is not an array or if any element is not a number", function () {
            expect(()=>stdDev(1)).toThrow();
            expect(()=>stdDev([1,3,4,"a"])).toThrow();
        });
        
        it("should return the standard deviation of an array of numbers", function () {
            expect(stdDev([2,4,4,4,5,5,7, 9])).toBe(2);
        });
    });
    describe("onlyLettersNums", function () {
        it("should throw error if input is not a string", function () {
            expect(()=>onlyLettersNums(3)).toThrow();
        });
        it("should return string of only a-z and number characters from input string", function () {
            expect(onlyLettersNums("abc123")).toBe("abc123");
            expect(onlyLettersNums("abc@%^123")).toBe("abc123");
        });
    });
    describe("removeArrayItem", function () {
        it("should throw an error if input is not an array", function () {
            expect(()=>removeArrayItem(3,4)).toThrow();
        });
        it("should throw an error if the item supplied is not in the array", function () {
            expect(()=>removeArrayItem([3],4)).toThrow();
        });
        it("should modify the array and return the array with the item removed", function () {
            let myArray = ["this","that"];
            let output = removeArrayItem(myArray,"this");
            // console.log(output);
            expect(output).toEqual(["that"]);
            expect(myArray).toEqual(["that"]);
        });
    });
    describe("z_score", function () {
        it("should throw an error if any of the 3 parameters are undefined", function () {
            expect(()=>z_score(3,5,undefined)).toThrow();
            expect(()=>z_score(3,undefined,2)).toThrow();
            expect(()=>z_score(undefined,3,5)).toThrow();
        });
        it("should throw an error if any of the 3 parameters are not a number", function () {
            expect(()=>z_score(3,5,"blah")).toThrow();
            expect(()=>z_score(3,"blah",2)).toThrow();
            expect(()=>z_score("blah",3,5)).toThrow();
        });
        it("should return the proper z-score with the 3 parameters, in order, being the (a) value of interest, (b) the mean, and (c) the standard deviation", function () {
            expect(z_score(190,150,25)).toBe(1.6);
        });
    });
    
    describe("calc_percentile", function () {
        it("should throw an error in the input is not a number", function () {
            expect(()=>calc_percentile("blah")).toThrow();
        });
        it("should properly return the approximate percentile given a z-score", function () {
            expect(calc_percentile(.5)).toBeCloseTo(.69,2);
        });

    });
    describe("asyncLoop", function () {
        //incomplete spec 
        it("should throw an error if the 3 parameters, in order, are not a number then a function then another function", function () {
            expect(()=>asyncLoop(1, ()=>{}, 4)).toThrow();
            expect(()=>asyncLoop(1, 4, ()=>{})).toThrow();
            expect(()=>asyncLoop("blah", ()=>{}, ()=>{} )).toThrow();
        });
    });
    describe("findDuplicates", function () {
        it("should throw an error if the input parameter is not an array", function () {
            expect(()=>findDuplicates("blah")).toThrow();
        });
        it("should return an empty array when there are no duplicates", function () {
            let myArray = [1,3,5,6,82,346];
            expect(findDuplicates(myArray)).toEqual([]);
        });
        it("should return an array of the duplicate elements when there are duplicates", function () {
            let myArray = [1,3,4,45,45,6,6,82,346];
            let result = findDuplicates(myArray);
            expect(result).toEqual([45,6]);
            expect(result).toContain(45);
            expect(result).toContain(6);
            expect(result.length).toBe(2);
        });

    });
});
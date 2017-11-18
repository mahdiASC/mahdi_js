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
            expect(output).toEqual(["that"]);
            expect(myArray).toEqual(["that"]);
        });
    });
    xdescribe("z-score", function () {
        it("", function () {

        });
        it("", function () {

        });

    });
    xdescribe("calc_percentile", function () {
        it("", function () {

        });
        it("", function () {

        });

    });
    xdescribe("asyncLoop", function () {
        it("", function () {

        });
        it("", function () {

        });

    });
    xdescribe("findDuplicates", function () {
        it("", function () {

        });
        it("", function () {

        });

    });
});
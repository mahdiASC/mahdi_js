// https://www.sitepoint.com/design-and-build-your-own-javascript-library/

/*
* M JavaScript Library v1.0.0
* "library website"
*
* Copyright 2018 Mahdi Shadkamfarrokhi
* Released under the MIT license
*
* Date: 2018-03-09
* 
* @namespace M
*/
(function () {
    "use strict";
    class M {
        constructor() {
            // when object provided
            if (typeof arguments[0] === "object") {
                var { seed , enhanceFlag, ...extra} = arguments[0];

                let keys = Object.keys(extra);
                // unused keys
                if(keys.length>0){
                    for( let key of keys){
                        console.log(`Unused key(s) during construction: ${key} with val: ${extra[key]}`);
                    }
                }
            } else {
                var [seed, enhanceFlag, ...extra] = arguments;
                // unused values
                if(extra.length>0){
                    let l = arguments.length-extra.length;
                    for( let i_str in extra){
                        let _l =  Number(i_str) + l;
                        console.log(`Unused value(s) during construction: i'th argument: ${_l} with val: ${extra[i_str]}`);
                    }
                }
            }

            // assigning seed
            if(seed){
                if (typeof seed === "number") this.seed = seed;
                else throw new TypeError(`seed was not a number: ${typeof seed}`);
            }

            // assigning enhancement flag
            if(enhanceFlag){
                if(typeof enhanceFlag === "boolean") this.enhanceFlag = enhanceFlag;
                else throw new TypeError(`enhanceFlag was not a boolean: ${typeof enhanceFlag}`);
            }
            
            this.setConfigs();
            return this;
        }

    }

    M.prototype.setConfigs = function(){
        this.setRandFunc();

        if(this.enhanceFlag){
            this.enhance();
        }
        
    }

    M.prototype.setRandFunc = function(){
        if(this.seed){
            // take from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
            this.randFunc = function () {
                var x = Math.sin(this.seed++) * 10000;
                return x - Math.floor(x);
            }
        }else{
            this.randFunc = Math.random;
        }
    }

    /*
    * Adds more intuitive functionality to String and Array objects
    */  
    M.prototype.enhance = function(){
        
        let self = this;
        /*
        * Adds .cap method to String Objects
        * @params flag boolean (false by default) if true each Word will be capped 
        * @params split string (" " by default) determines how words are split
        */
       Object.defineProperty(String.prototype, "cap", {
        enumerable: false, // issue with for...in loop and prototype methods being included with enumeration
        value: function (flag, split = " "){
            return self.__proto__.capFirst(this,flag, split);
        }
      });

      Object.defineProperty(Array.prototype, "cap", {
        enumerable: false, // issue with for...in loop and prototype methods being included with enumeration
        value: function (num, flag) {
          return sampleArray(this, num, flag);
        }
      });
      
      
    }


    /////////////////
    //END OF CONFIG//
    /////////////////

    /*
    *
    * 
    */
    
    M.prototype.capFirst = function(str, flag, split = " "){
        // error handling
        if ( (typeof str != "string" && !Array.isArray(str) ) || (typeof flag != "boolean" && typeof flag !== "undefined" ) || typeof split != "string") {
            throw new TypeError;
        }

        if(Array.isArray(str)){
            let _type;
            let arr_check = str.every(x=>{
                if(typeof x !== "string"){
                    _type = typeof x;
                    return false;
                }
                return true;
            });

            if(arr_check){
                return str.map(x=>this.capFirst(x, flag, split));
            }else{
                throw new TypeError(`All array elements need to be a string. Found type: ${_type}`);
            }
        }else if (flag) {
            let temp = str.split(split);
            let output = [];
            for (let i = 0; i < temp.length; i++) {
            output.push(this.capFirst(temp[i]));
            }
            return output.join(split);
        } else {
            return str[0].toUpperCase() + str.slice(1);
        }
    }

    // Works in node or browser
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = M;
    } else {
        window.M = M;
    }
})();
// https://www.sitepoint.com/design-and-build-your-own-javascript-library/

/**
* M JavaScript Library v1.0.0
* "library website"
*
* Copyright 2018 Mahdi Shadkamfarrokhi
* Released under the MIT license
*
* @since 2018-03-09
* @version 1.0
* @author Mahdi Shadkamfarrokhi
* @namespace M
*/
(function () {
    "use strict";
    class M {
        constructor() {
            if (typeof arguments[0] === "object") {
                var { seed, enhance = true, ...extra } = arguments[0];

                let keys = Object.keys(extra);
                if (keys.length > 0) {
                    for (let key of keys) {
                        console.log(`Unused key(s) during construction: ${key} with val: ${extra[key]}`);
                    }
                }
            } else {
                var [seed, enhance = true, ...extra] = arguments;
                if (extra.length > 0) {
                    let l = arguments.length - extra.length;
                    for (let i_str in extra) {
                        let _l = Number(i_str) + l;
                        console.log(`Unused value(s) during construction: i'th argument: ${_l} with val: ${extra[i_str]}`);
                    }
                }
            }

            if (seed) {
                if (typeof seed === "number") this.seed = seed;
                else throw new TypeError(`seed was not a number: ${typeof seed}`);
            }

            if (typeof enhance === "boolean") this.enhanceFlag = enhance;
            else throw new TypeError(`enhanceFlag was not a boolean: ${typeof enhance}`);

            this._setConfigs();
            return this;
        }

    }
    ////////////////
    //CONFIG START//
    ////////////////
    M.prototype._setConfigs = function () {
        this.setRandFunc();

        if (this.enhanceFlag) {
            this.enhance();
        }

    }

    M.prototype.setRandFunc = function () {
        if (this.seed) {
            // take from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
            this.randFunc = function () {
                var x = Math.sin(this.seed++) * 10000;
                return x - Math.floor(x);
            }
        } else {
            this.randFunc = Math.random;
        }
    }

    /*
    * Adds more intuitive functionality to String and Array objects
    */
    M.prototype.enhance = function () {

        let self = this;

        let _stringAddMethod = function (method_name, func) {
            if (!String.prototype.hasOwnProperty(method_name)) {
                Object.defineProperty(String.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: func
                });
            }
        };

        let _arrayAddMethod = function (method_name, func) {
            if (!Array.prototype.hasOwnProperty(method_name)) {
                Object.defineProperty(Array.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: func
                });
            }
        }

        let _bothAddMethod = function (method_name, func) {
            _stringAddMethod(method_name, func);
            _arrayAddMethod(method_name, func);
        }

        _bothAddMethod("capFirst", function (flag, split) {
            return self.__proto__.capFirst(this, flag, split);
        });

        _bothAddMethod("filterASCII", function () {
            return self.__proto__.filterASCII(this);
        })

        _arrayAddMethod("quickSort", function () {
            return self.__proto__.quickSort(this);
        })

        _arrayAddMethod("sum", function () {
            return self.__proto__.sum(this);
        })

        _arrayAddMethod("sd", function () {
            return self.__proto__.sd(this);
        })

        _arrayAddMethod("remove", function () {
            return self.__proto__.remove(this);
        })

        _arrayAddMethod("findDups", function () {
            return self.__proto__.findDups(this);
        })
    }

    /////////////////
    //END OF CONFIG//
    /////////////////

    M.prototype.capFirst = function (str, flag, _split) {
        // error handling
        if ((typeof str != "string" && !Array.isArray(str)) || (typeof flag != "boolean" && typeof flag !== "undefined") || (typeof _split != "string" && typeof _split !== "undefined")) {
            throw new TypeError;
        }

        let split = _split || " ";

        if (Array.isArray(str)) {
            let _type;
            let arr_check = !str.every(x => {
                if (typeof x !== "string") {
                    _type = typeof x;
                    return false;
                }
                return true;
            });

            if (arr_check) throw new TypeError(`All array elements need to be a string. Found type: ${_type}`);
            return str.map(x => this.capFirst(x, flag, split));
        } else if (flag) {
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

    M.prototype.filterASCII = function (str) {
        // error handling
        if ((typeof str != "string" && !Array.isArray(str)) || (typeof flag != "boolean" && typeof flag !== "undefined") || (typeof _split != "string" && typeof _split !== "undefined")) {
            throw new TypeError;
        }

        if (Array.isArray(str)) {
            let _type;
            let arr_check = !str.every(x => {
                if (typeof x !== "string") {
                    _type = typeof x;
                    return false;
                }
                return true;
            });

            if (arr_check) throw new TypeError(`All array elements need to be a string. Found type: ${_type}`);
            return str.map(x => this.filterASCII(x));
        } else {
            return str.replace(/[^A-z,0-9,-]/g, "");
        }
    }

    M.prototype.quickSort = function (a, b, flag) {

        flag = flag || false;

    }

    M.prototype.sum = function (arr) {
        if (!Array.isArray(arr) || arr.some(x => typeof x != "number")) {
            throw new TypeError;
        }

        return arr.reduce(function (sum, value) {
            return sum + value;
        }, 0);
    }
    M.prototype.sd = function (arr) {

    }
    M.prototype.remove = function (arr, item, flag) {
        if(!Array.isArray(arr)) throw new TypeError(`Input should be an array, was ${typeof arr}`);
        
        let index = arr.findIndex(x=>x===item);
        if(index > 0){
            if(flag){
                
            }
            return arr.splice(index,1)[0];
        }else{
            return null;
        }
    }

    M.prototype.findDups = function (arr) {

    }


    // Works in node or browser
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = M;
    } else {
        window.M = M;
    }
})();
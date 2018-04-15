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
        /**
         * Responsible for creating M objects.
         * 
         * @param {Number} seed If seed number provided, all randomization will be created from predictable source
         * @param {boolean} enhance If true, Array and String objects will include M's convenience methods by default
         * @param {Object} arguments A single object with the relevant keys and values can also be passed instead
         * @constructor
         */
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
    /**
     * Set's the internal configuration.
     * Handles the randomization function.
     * Handles enhancement if active.
     */
    M.prototype._setConfigs = function () {
        this._setRandFunc();

        if (this.enhanceFlag) {
            this.enhance();
        }

    }

    /**
     * Set's the randomization function if seed provided.
     */
    M.prototype._setRandFunc = function () {
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

    /**
    * Adds more intuitive functionality to String and Array objects.
    * 
    */
    M.prototype.enhance = function () {

        let self = this;

        /**
         * Adds method to String class.
         * 
         * @param {String} method_name 
         * @param {Function} func 
         */
        let _stringAddMethod = function (method_name, func) {
            if (!String.prototype.hasOwnProperty(method_name)) {
                Object.defineProperty(String.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: func
                });
            }
        };

        /**
         * Adds method to Array class.
         * 
         * @param {String} method_name 
         * @param {Function} func 
         */
        let _arrayAddMethod = function (method_name, func) {
            if (!Array.prototype.hasOwnProperty(method_name)) {
                Object.defineProperty(Array.prototype, method_name, {
                    enumerable: false,
                    configurable: true,
                    value: func
                });
            }
        }

        /**
         * Adds method to String and Array class.
         * 
         * @param {String} method_name 
         * @param {Function} func 
         */
        let _bothAddMethod = function (method_name, func) {
            _stringAddMethod(method_name, func);
            _arrayAddMethod(method_name, func);
        }

        _bothAddMethod("capFirst", function (flag, split) {
            return self.__proto__.capFirst.call(self, this, flag, split);
        });

        _bothAddMethod("filterASCII", function () {
            return self.__proto__.filterASCII.call(self, this);
        })

        _arrayAddMethod("quickSort", function () {
            return self.__proto__.quickSort.call(self, this);
        })

        _arrayAddMethod("sum", function () {
            return self.__proto__.sum.call(self, this);
        })

        _arrayAddMethod("sd", function () {
            return self.__proto__.sd.call(self, this);
        })

        _arrayAddMethod("avg", function () {
            return self.__proto__.avg.call(self, this);
        })

        _arrayAddMethod("remove", function (item, flag) {
            return self.__proto__.remove.call(self, this, item, flag);
        })

        _arrayAddMethod("findDups", function (flag) {
            return self.__proto__.findDups.call(self, this);
        })

        _arrayAddMethod("random", function (flag) {
            return self.__proto__.random.call(self, this);
        })
    }

    /////////////////
    //END OF CONFIG//
    /////////////////
    
    ////////////////
    //MAIN METHODS//
    ////////////////

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

    //population sd
    M.prototype.sd = function (arr) {
        if (!Array.isArray(arr) || arr.some(x => typeof x != "number")) {
            throw new TypeError;
        }
        if (arr.length === 0) return 0;
        let avg = this.avg(arr);
        let diffs = arr.map(x => Math.pow(x - avg, 2));
        let variance = this.sum(diffs) / arr.length;
        return Math.sqrt(variance);
    }

    M.prototype.avg = function (arr) {
        if (!Array.isArray(arr) || arr.some(x => typeof x != "number")) {
            throw new TypeError;
        }
        if (arr.length === 0) return null;
        return this.sum(arr) / arr.length;
    }

    M.prototype.remove = function (arr, item, flag) {
        if (!Array.isArray(arr)) throw new TypeError(`Input should be an array, was ${typeof arr}`);

        let index = arr.findIndex(x => x === item);
        if (index >= 0) {
            if (flag) {
                let temp = [];
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (arr[i] === item) temp.push(arr.splice(i, 1)[0])
                }
                return temp;
            }
            return arr.splice(index, 1)[0];
        } else {
            if (flag) return [];
            return null;
        }
    }

    M.prototype.findDups = function (arr, flag = true) {
        if (!Array.isArray(arr)) throw new TypeError(`Input should be an array, was ${typeof arr}`);

        let dups = [];
        let temp_uniques = [];
        for (let item of arr) {
            if (temp_uniques.includes(item)) {
                if (!dups.includes(item)) {
                    dups.push(item);
                }
            }
            temp_uniques.push(item);
        }

        if (flag) {
            return dups;
        }
        return temp_uniques.filter(x => !dups.includes(x));
    }

    M.prototype.random = function (min, max) {
        if (min) if (typeof min != "number" && !Array.isArray(min)) throw new TypeError;
        if (max) if (typeof max != "number") throw new TypeError;

        if (Array.isArray(min)) {
            return min[Math.floor(this.randFunc() * min.length)];
        } else if (max) {
            return Math.floor(this.randFunc() * (max - min)) + min;
        } else if (min) {
            return Math.floor(this.randFunc() * min);
        } else {
            return this.randFunc();
        }
    }

    M.prototype.randName = function () {
        let output = [];
        let count = num;
        let cons = "bcdfghjklmnpqrstvwxyz";
        let vowels = "aeiou";
        let temp, counter;
        while (count > 0) {
            temp = "";
            if (this.random() > .5) {
                temp = temp + this.random(vowels.split(""));
            }
            if (count != 1 || num == 1) {
                counter = this.random() > .75 ? 2 : 1;
            } else {
                counter = normRand(2, 1);
            }
            while (counter > 0) {
                temp = temp + myRandom(cons.split(""));
                temp = temp + myRandom(vowels.split(""));
                counter--;
            }
            if (temp.length < 3) {
                temp = temp + myRandom(cons.split(""));
            } else {
                if (myRandom() > .5) {
                    temp = temp + myRandom(cons.split(""));
                }
            }
            count--;
            output.push(capFirst(temp));
        }
        output = output.join(" ");
        let temp = ""
        for (let i in output) {
            if (output[i].toLowerCase() == "q" && output[Number(i) + 1] != "u") {
                temp = temp + output[i] + "u";
            } else {
                temp = temp + output[i];
            }
        }
        return temp;
    }

    M.prototype.normRand = function (std, mean) {
        if (std !== undefined) {
            if (typeof std !== "number") throw new TypeError;
        }

        if (mean !== undefined) {
            if (typeof mean !== "number") throw new TypeError;
        }

        std = std || 1;
        mean = mean || 0;
        let u,v,val;
        u = 1 - this.randFunc();
        v = 1 - this.randFunc();
        val = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // do {
        // } while (val < -1 || val > 1);
        return Math.round(val * std + mean);
    }
    ////////////////////
    //MAIN METHODS END//
    ////////////////////

    // Works in node or browser
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = M;
    } else {
        window.M = M;
    }
})();
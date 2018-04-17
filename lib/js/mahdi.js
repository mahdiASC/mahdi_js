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
    * Adds more intuitive functionality to Strings and Arrays.
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

    M.prototype.sum = function (arr) {
        if (!Array.isArray(arr) || arr.some(x => typeof x != "number")) {
            throw new TypeError;
        }

        if (arr.length === 0) return 0;
        return arr.reduce((acc, val) => acc + val);
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

    M.prototype.randName = function (num, delim) {
        if ((typeof num !== "number" && num !== undefined) || (typeof delim !== "string" && delim !== undefined)) throw new TypeError;
        let output = [];
        num = num || 1;
        let count = num;
        delim = delim || " ";
        let cons = "bcdfghjklmnpqrstvwxyz";
        let vowels = "aeiou";
        let temp, counter;
        while (count > 0) {
            temp = "";
            if (this.random() > .5) {
                temp += this.random(vowels.split(""));
            }
            if (count != 1 || num == 1) {
                counter = this.random() > .75 ? 2 : 1;
            } else {
                counter = this.normRand(2, 1);
            }
            while (counter > 0) {
                temp += this.random(cons.split(""));
                if (temp[temp.length - 1] === "q") {
                    temp += "u";
                } else {
                    temp += this.random(vowels.split(""));
                }
                counter--;
            }
            if (temp.length < 3) {
                temp += this.random(cons.split(""));
            } else {
                if (this.random() > .5) {
                    temp += this.random(cons.split(""));
                }
            }

            if (temp[temp.length - 1] === "q") {
                temp += "u";
            } else {
                temp += this.random(vowels.split(""));
            }
            count--;
            output.push(this.capFirst(temp));
        }
        return output.join(delim);
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
        let u, v, val;
        u = 1 - this.random();
        v = 1 - this.random();
        val = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return Math.round(val * std + mean);
    }

    /**
     * Returns a key from input object based on that key's value (counts or probabilities).
     * 
     * @param {Object} obj object with categorical keys and values representing counts or probabilities
     */
    M.prototype.randProb = function (obj) {
        if (typeof obj !== "object") throw new TypeError;

        let temp = [];

        let keys = Object.keys(obj);
        for (let key of keys) {
            if (typeof obj[key] != "number") {
                throw new TypeError(`Object value was not a number: ${obj[key]}`);
            }
            temp.push(obj[key]);
        }

        let sum = temp.reduce((acc, val) => acc + val);

        if (sum < 1) {
            throw new RangeError(`Values totalled ${sum}, instead of 1 or more`);
        } else if (sum != 1) {
            temp = temp.map(x => x / sum);
        }

        let pick = this.random();
        let running_total = 0;
        for (let i = 0; i < keys.length; i++) {
            running_total += temp[i];
            if (pick <= running_total) {
                return keys[i];
            }
        }
    }

    /**
     * Returns a number (+/-) representing how many standard deviations the value is from the mean.
     * 
     * @param {Number} val value being assessed
     * @param {Number} mean mean of values in question
     * @param {Number} stdv standard deviation of values in question
     */
    M.prototype.zScore = function (val, mean, stdv) {
        if (typeof val != "number" || typeof mean != "number" || typeof stdv != "number") {
            throw new TypeError;
        }
        return (val - mean) / stdv;
    }

    /**
     * Returns statistical percentile for a given z-score for a one-sided tail.
     * 
     * @param {Number} z z-score 
     * @return {Number} percentile of given z-score as a decimal
     */
    M.prototype.calcPercentile = function (z) {
        if (typeof z !== "number") throw new TypeError;
        let val = String((z).toFixed(2));

        let re_first = new RegExp("([0-9].[0-9])");
        let first = re_first.exec(val)[1];

        let re_second = new RegExp("[0-9].[0-9]([0-9])");
        let second = `0.0${re_second.exec(val)[1]}`;

        const table = {
            "0.0": {
                "0.00": "0.0000",
                "0.01": "0.0040",
                "0.02": "0.0080",
                "0.03": "0.0120",
                "0.04": "0.0160",
                "0.05": "0.0199",
                "0.06": "0.0239",
                "0.07": "0.0279",
                "0.08": "0.0319",
                "0.09": "0.0359"
            },
            "0.1": {
                "0.00": "0.0398",
                "0.01": "0.0438",
                "0.02": "0.0478",
                "0.03": "0.0517",
                "0.04": "0.0557",
                "0.05": "0.0596",
                "0.06": "0.0636",
                "0.07": "0.0675",
                "0.08": "0.0714",
                "0.09": "0.0753"
            },
            "0.2": {
                "0.00": "0.0793",
                "0.01": "0.0832",
                "0.02": "0.0871",
                "0.03": "0.0910",
                "0.04": "0.0948",
                "0.05": "0.0987",
                "0.06": "0.1026",
                "0.07": "0.1064",
                "0.08": "0.1103",
                "0.09": "0.1141"
            },
            "0.3": {
                "0.00": "0.1179",
                "0.01": "0.1217",
                "0.02": "0.1255",
                "0.03": "0.1293",
                "0.04": "0.1331",
                "0.05": "0.1368",
                "0.06": "0.1406",
                "0.07": "0.1443",
                "0.08": "0.1480",
                "0.09": "0.1517"
            },
            "0.4": {
                "0.00": "0.1554",
                "0.01": "0.1591",
                "0.02": "0.1628",
                "0.03": "0.1664",
                "0.04": "0.1700",
                "0.05": "0.1736",
                "0.06": "0.1772",
                "0.07": "0.1808",
                "0.08": "0.1844",
                "0.09": "0.1879"
            },
            "0.5": {
                "0.00": "0.1915",
                "0.01": "0.1950",
                "0.02": "0.1985",
                "0.03": "0.2019",
                "0.04": "0.2054",
                "0.05": "0.2088",
                "0.06": "0.2123",
                "0.07": "0.2157",
                "0.08": "0.2190",
                "0.09": "0.2224"
            },
            "0.6": {
                "0.00": "0.2257",
                "0.01": "0.2291",
                "0.02": "0.2324",
                "0.03": "0.2357",
                "0.04": "0.2389",
                "0.05": "0.2422",
                "0.06": "0.2454",
                "0.07": "0.2486",
                "0.08": "0.2517",
                "0.09": "0.2549"
            },
            "0.7": {
                "0.00": "0.2580",
                "0.01": "0.2611",
                "0.02": "0.2642",
                "0.03": "0.2673",
                "0.04": "0.2704",
                "0.05": "0.2734",
                "0.06": "0.2764",
                "0.07": "0.2794",
                "0.08": "0.2823",
                "0.09": "0.2852"
            },
            "0.8": {
                "0.00": "0.2881",
                "0.01": "0.2910",
                "0.02": "0.2939",
                "0.03": "0.2967",
                "0.04": "0.2995",
                "0.05": "0.3023",
                "0.06": "0.3051",
                "0.07": "0.3078",
                "0.08": "0.3106",
                "0.09": "0.3133"
            },
            "0.9": {
                "0.00": "0.3159",
                "0.01": "0.3186",
                "0.02": "0.3212",
                "0.03": "0.3238",
                "0.04": "0.3264",
                "0.05": "0.3289",
                "0.06": "0.3315",
                "0.07": "0.3340",
                "0.08": "0.3365",
                "0.09": "0.3389"
            },
            "1.0": {
                "0.00": "0.3413",
                "0.01": "0.3438",
                "0.02": "0.3461",
                "0.03": "0.3485",
                "0.04": "0.3508",
                "0.05": "0.3531",
                "0.06": "0.3554",
                "0.07": "0.3577",
                "0.08": "0.3599",
                "0.09": "0.3621"
            },
            "1.1": {
                "0.00": "0.3643",
                "0.01": "0.3665",
                "0.02": "0.3686",
                "0.03": "0.3708",
                "0.04": "0.3729",
                "0.05": "0.3749",
                "0.06": "0.3770",
                "0.07": "0.3790",
                "0.08": "0.3810",
                "0.09": "0.3830"
            },
            "1.2": {
                "0.00": "0.3849",
                "0.01": "0.3869",
                "0.02": "0.3888",
                "0.03": "0.3907",
                "0.04": "0.3925",
                "0.05": "0.3944",
                "0.06": "0.3962",
                "0.07": "0.3980",
                "0.08": "0.3997",
                "0.09": "0.4015"
            },
            "1.3": {
                "0.00": "0.4032",
                "0.01": "0.4049",
                "0.02": "0.4066",
                "0.03": "0.4082",
                "0.04": "0.4099",
                "0.05": "0.4115",
                "0.06": "0.4131",
                "0.07": "0.4147",
                "0.08": "0.4162",
                "0.09": "0.4177"
            },
            "1.4": {
                "0.00": "0.4192",
                "0.01": "0.4207",
                "0.02": "0.4222",
                "0.03": "0.4236",
                "0.04": "0.4251",
                "0.05": "0.4265",
                "0.06": "0.4279",
                "0.07": "0.4292",
                "0.08": "0.4306",
                "0.09": "0.4319"
            },
            "1.5": {
                "0.00": "0.4332",
                "0.01": "0.4345",
                "0.02": "0.4357",
                "0.03": "0.4370",
                "0.04": "0.4382",
                "0.05": "0.4394",
                "0.06": "0.4406",
                "0.07": "0.4418",
                "0.08": "0.4429",
                "0.09": "0.4441"
            },
            "1.6": {
                "0.00": "0.4452",
                "0.01": "0.4463",
                "0.02": "0.4474",
                "0.03": "0.4484",
                "0.04": "0.4495",
                "0.05": "0.4505",
                "0.06": "0.4515",
                "0.07": "0.4525",
                "0.08": "0.4535",
                "0.09": "0.4545"
            },
            "1.7": {
                "0.00": "0.4554",
                "0.01": "0.4564",
                "0.02": "0.4573",
                "0.03": "0.4582",
                "0.04": "0.4591",
                "0.05": "0.4599",
                "0.06": "0.4608",
                "0.07": "0.4616",
                "0.08": "0.4625",
                "0.09": "0.4633"
            },
            "1.8": {
                "0.00": "0.4641",
                "0.01": "0.4649",
                "0.02": "0.4656",
                "0.03": "0.4664",
                "0.04": "0.4671",
                "0.05": "0.4678",
                "0.06": "0.4686",
                "0.07": "0.4693",
                "0.08": "0.4699",
                "0.09": "0.4706"
            },
            "1.9": {
                "0.00": "0.4713",
                "0.01": "0.4719",
                "0.02": "0.4726",
                "0.03": "0.4732",
                "0.04": "0.4738",
                "0.05": "0.4744",
                "0.06": "0.4750",
                "0.07": "0.4756",
                "0.08": "0.4761",
                "0.09": "0.4767"
            },
            "2.0": {
                "0.00": "0.4772",
                "0.01": "0.4778",
                "0.02": "0.4783",
                "0.03": "0.4788",
                "0.04": "0.4793",
                "0.05": "0.4798",
                "0.06": "0.4803",
                "0.07": "0.4808",
                "0.08": "0.4812",
                "0.09": "0.4817"
            },
            "2.1": {
                "0.00": "0.4821",
                "0.01": "0.4826",
                "0.02": "0.4830",
                "0.03": "0.4834",
                "0.04": "0.4838",
                "0.05": "0.4842",
                "0.06": "0.4846",
                "0.07": "0.4850",
                "0.08": "0.4854",
                "0.09": "0.4857"
            },
            "2.2": {
                "0.00": "0.4861",
                "0.01": "0.4864",
                "0.02": "0.4868",
                "0.03": "0.4871",
                "0.04": "0.4875",
                "0.05": "0.4878",
                "0.06": "0.4881",
                "0.07": "0.4884",
                "0.08": "0.4887",
                "0.09": "0.4890"
            },
            "2.3": {
                "0.00": "0.4893",
                "0.01": "0.4896",
                "0.02": "0.4898",
                "0.03": "0.4901",
                "0.04": "0.4904",
                "0.05": "0.4906",
                "0.06": "0.4909",
                "0.07": "0.4911",
                "0.08": "0.4913",
                "0.09": "0.4916"
            },
            "2.4": {
                "0.00": "0.4918",
                "0.01": "0.4920",
                "0.02": "0.4922",
                "0.03": "0.4925",
                "0.04": "0.4927",
                "0.05": "0.4929",
                "0.06": "0.4931",
                "0.07": "0.4932",
                "0.08": "0.4934",
                "0.09": "0.4936"
            },
            "2.5": {
                "0.00": "0.4938",
                "0.01": "0.4940",
                "0.02": "0.4941",
                "0.03": "0.4943",
                "0.04": "0.4945",
                "0.05": "0.4946",
                "0.06": "0.4948",
                "0.07": "0.4949",
                "0.08": "0.4951",
                "0.09": "0.4952"
            },
            "2.6": {
                "0.00": "0.4953",
                "0.01": "0.4955",
                "0.02": "0.4956",
                "0.03": "0.4957",
                "0.04": "0.4959",
                "0.05": "0.4960",
                "0.06": "0.4961",
                "0.07": "0.4962",
                "0.08": "0.4963",
                "0.09": "0.4964"
            },
            "2.7": {
                "0.00": "0.4965",
                "0.01": "0.4966",
                "0.02": "0.4967",
                "0.03": "0.4968",
                "0.04": "0.4969",
                "0.05": "0.4970",
                "0.06": "0.4971",
                "0.07": "0.4972",
                "0.08": "0.4973",
                "0.09": "0.4974"
            },
            "2.8": {
                "0.00": "0.4974",
                "0.01": "0.4975",
                "0.02": "0.4976",
                "0.03": "0.4977",
                "0.04": "0.4977",
                "0.05": "0.4978",
                "0.06": "0.4979",
                "0.07": "0.4979",
                "0.08": "0.4980",
                "0.09": "0.4981"
            },
            "2.9": {
                "0.00": "0.4981",
                "0.01": "0.4982",
                "0.02": "0.4982",
                "0.03": "0.4983",
                "0.04": "0.4984",
                "0.05": "0.4984",
                "0.06": "0.4985",
                "0.07": "0.4985",
                "0.08": "0.4986",
                "0.09": "0.4986"
            },
            "3.0": {
                "0.00": "0.4987",
                "0.01": "0.4987",
                "0.02": "0.4987",
                "0.03": "0.4988",
                "0.04": "0.4988",
                "0.05": "0.4989",
                "0.06": "0.4989",
                "0.07": "0.4989",
                "0.08": "0.4990",
                "0.09": "0.4990"
            }
        };
        let return_val = Number(table[first][second]);
        if (z < 0) {
            return_val = -return_val;
        }
        return return_val + 0.5;
    }

    /**
     * Loops an asyncronous function, only calling the next iteration when last call has completed.
     * 
     * @param {Number} iterations number of times to loop
     * @param {Function} func function to be called repeatedly. MUST accept 2 arguments, an iteration number and a resolve callback. It should also call resolve() when finished with async task
     * @returns {Promise}
     */
    M.prototype.asyncLoop = function (iterations, func) {
        if (typeof iterations != "number" || typeof func != 'function') throw new TypeError;

        return new Promise((resolve, reject) => {
            (async () => {
                for (let i = 0; i < iterations; i++) {
                    await new Promise(res => func(i,res));
                }
                resolve();
            })();
        });
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
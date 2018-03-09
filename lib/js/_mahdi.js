// https://www.sitepoint.com/design-and-build-your-own-javascript-library/

/*
* M JavaScript Library v1.0.0
* "library website"
*
* Copyright ... JS Foundation and other contributors
* Released under the MIT license
* https://jquery.org/license
*
* Date: 2018-01-20T17:24Z
/*
*@namespace M
*/
(function () {
    "use strict";
    class M {
        constructor() {
            // when object provided
            if (typeof arguments[0] === "object") {
                var { seed , strFlag, arrFlag, ...extra} = arguments[0];

                let keys = Object.keys(extra);
                // unused keys
                if(keys.length>0){
                    for( let key of keys){
                        console.log(`Unused key(s) during construction: ${key} with val: ${extra[key]}`);
                    }
                }
            } else {
                var [seed, strFlag, arrFlag, ...extra] = arguments;
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
                if (typeof seed === "number") this.seed = seed
                else throw new TypeError(`seed was not a number: ${typeof seed}`);
            }

            // assigning String enhancement flag
            if(strFlag){
                if(typeof strFlag === "boolean") this.strFlag = strFlag;
                else throw new TypeError(`strFlag was not a boolean: ${typeof strFlag}`);
            }
            
            // assigning Array enhancement flag
            if(arrFlag){
                if(typeof arrFlag === "boolean") this.arrFlag = arrFlag;
                else throw new TypeError(`arrFlag was not a boolean: ${typeof arrFlag}`);
            }

            return this;
        }

    }

    M.prototype.capFirst = function(str, flag = false, split = " "){
        // error handling
        if (typeof str != "string" || typeof flag != "boolean" || typeof split != "string") {
            throw new TypeError;
        }

        if (flag) {
            let temp = str.split(split);
            let output = [];
            for (let i = 0; i < temp.length; i++) {
            output.push(capFirst(temp[i]));
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
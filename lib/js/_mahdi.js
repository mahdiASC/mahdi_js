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

            if (typeof arguments[0] === "object") {
                let { seed } = arguments[0];
                if (!isNaN(seed)) this.seed = seed
                else throw new TypeError("Seed was not a number");
            } else {
                [this.seed] = arguments;
            }
            return this;
        }
    }

    // Works in node or browser
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = M;
    } else {
        window.M = M;
    }
})();
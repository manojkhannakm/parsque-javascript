"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static check(name, condition) {
        let error = "";
        if (name) {
            error = name + " is invalid!";
        }
        if (!condition) {
            throw new Error(error);
        }
    }
}
exports.default = Utils;

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
    static checkType(name, object, type) {
        Utils.check("type", type);
        Utils.check(name, object == null || object instanceof type);
    }
}
exports.default = Utils;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsque_1 = require("./parsque");
class Parser {
    createInput() {
        return new parsque_1.Input();
    }
    inputCreated() {
    }
    createOutput() {
        return new parsque_1.Output();
    }
    outputCreated() {
    }
    createContent() {
        return new parsque_1.Content;
    }
    contentCreated() {
    }
    create(inputFactory, inputCallback, outputFactory, outputCallback, contentFactory, contentCallback) {
        if (inputFactory) {
            this._input = inputFactory(this);
        }
        if (!this._input) {
        }
    }
    //
    get input() {
        return this._input;
    }
    get output() {
        return this._output;
    }
    get content() {
        return this._content;
    }
}
exports.default = Parser;

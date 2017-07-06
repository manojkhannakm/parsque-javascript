"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const output_1 = require("./output");
const content_1 = require("./content");
const utils_1 = require("./utils");
class Parser {
    createInput() {
        return new input_1.default();
    }
    inputCreated() {
    }
    createOutput() {
        return new output_1.default();
    }
    outputCreated() {
    }
    createContent() {
        return new content_1.default;
    }
    contentCreated() {
    }
    create(inputFactory, inputCallback, outputFactory, outputCallback, contentFactory, contentCallback) {
        if (inputFactory) {
            this._input = inputFactory(this);
        }
        if (!this._input) {
            this._input = this.createInput();
        }
        utils_1.default.check("inputFactory", this._input);
        this.inputCreated();
        if (inputCallback) {
            inputCallback();
        }
        if (outputFactory) {
            this._output = outputFactory(this);
        }
        if (!this._output) {
            this._output = this.createOutput();
        }
        utils_1.default.check("outputFactory", this._output);
        this.outputCreated();
        if (outputCallback) {
            outputCallback();
        }
        if (contentFactory) {
            this._content = contentFactory(this);
        }
        if (!this._content) {
            this._content = this.createContent();
        }
        utils_1.default.check("contentFactory", this._content);
        this.contentCreated();
        if (contentCallback) {
            contentCallback();
        }
    }
    parseValue(name, valueParser) {
        utils_1.default.check("name", name);
        utils_1.default.check("valueParser", valueParser);
        this._output[name] = valueParser(this);
    }
    parseValueList(name, valueListParser, ...indexes) {
        utils_1.default.check("name", name);
        utils_1.default.check("valueListParser", valueListParser);
        let indexSet = new Set();
        for (let index of indexes.sort()) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }
        let newValues = [];
        let values = this._output[name];
        if (values && Array.isArray(values)) {
            newValues.push(values);
        }
        for (let index of indexSet) {
            newValues[index] = valueListParser(this, index);
        }
        this._output[name] = newValues;
    }
    parseOutput() {
    }
    parseOutputList() {
    }
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

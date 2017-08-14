"use strict";
// import * as Promise from "bluebird";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const output_1 = require("./output");
const content_1 = require("./content");
class Parser {
    constructor() {
        this.input = new input_1.default();
        this.output = new output_1.default();
        this.content = new content_1.default();
    }
    createInput() {
        return new Promise(resolve => {
            resolve(new input_1.default());
        });
    }
    inputCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    createOutput() {
        return new Promise(resolve => {
            resolve(new output_1.default());
        });
    }
    outputCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    createContent() {
        return new Promise(resolve => {
            resolve(new content_1.default());
        });
    }
    contentCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    create(inputFactory, outputFactory, contentFactory) {
        let promise = new Promise(resolve => {
            resolve();
        });
        if (inputFactory) {
            promise = promise.then(() => inputFactory(this));
        }
        else {
            promise = promise.then(() => this.createInput());
        }
        promise = promise.then(value => {
            this.input = value;
        }).then(() => this.inputCreated());
        if (outputFactory) {
            promise = promise.then(() => outputFactory(this));
        }
        else {
            promise = promise.then(() => this.createOutput());
        }
        promise = promise.then(value => {
            this.output = value;
        }).then(() => this.outputCreated());
        if (contentFactory) {
            promise = promise.then(() => contentFactory(this));
        }
        else {
            promise = promise.then(() => this.createContent());
        }
        promise = promise.then(value => {
            this.content = value;
        }).then(() => this.contentCreated());
        return promise.then(() => this);
    }
    parseValue(valueName, valueParser) {
        return valueParser(this).then(value => {
            this.output[valueName] = value;
        }).then(() => this);
    }
}
exports.default = Parser;

//# sourceMappingURL=parser.js.map

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
    parseValues(name, valuesParser, ...indexes) {
        utils_1.default.check("name", name);
        utils_1.default.check("valuesParser", valuesParser);
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
            newValues[index] = valuesParser(this, index);
        }
        this._output[name] = newValues;
    }
    parseOutput(name, parserFactory, outputParser) {
        utils_1.default.check("name", name);
        utils_1.default.check("parserFactory", parserFactory);
        utils_1.default.check("outputParser", outputParser);
        let parser = parserFactory();
        utils_1.default.check("parserFactory", parser);
        parser.create(parser => this._input[name], null, parser => this._output[name], null, parser => this._content[name], null);
        outputParser(parser);
        this._output[name] = parser._output;
    }
    parseOutputs(name, parserFactory, outputsParser, ...indexes) {
        utils_1.default.check("name", name);
        utils_1.default.check("parserFactory", parserFactory);
        utils_1.default.check("outputsParser", outputsParser);
        let inputs = this._input[name];
        let inputSize = 0;
        if (inputs && Array.isArray(inputs)) {
            inputSize = inputs.length;
        }
        let indexSet = new Set();
        for (let index of indexes.sort()) {
            if (index >= 0 && (inputSize == 0 || index < inputSize)) {
                indexSet.add(index);
            }
        }
        if (indexSet.size == 0) {
            for (let i = 0; i < inputSize; i++) {
                indexSet.add(i);
            }
        }
        let newOutputs = [];
        let outputs = this._output[name];
        if (outputs && Array.isArray(outputs)) {
            newOutputs.push(outputs);
        }
        let contents = this._content[name];
        for (let index of indexSet) {
            let parser = parserFactory();
            utils_1.default.check("parserFactory", parser);
            parser.create(() => {
                if (inputs && Array.isArray(inputs) && index < inputs.length) {
                    return inputs[index];
                }
                return null;
            }, null, () => {
                if (outputs && Array.isArray(outputs) && index < outputs.length) {
                    return outputs[index];
                }
                return null;
            }, null, () => {
                if (contents && Array.isArray(contents) && index < contents.length) {
                    return contents[index];
                }
                return null;
            }, null);
            outputsParser(parser, index);
            newOutputs[index] = parser._output;
        }
        this._output[name] = newOutputs;
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

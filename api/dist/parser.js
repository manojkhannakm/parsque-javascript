"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const output_1 = require("./output");
const content_1 = require("./content");
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
        return new content_1.default();
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
        this.inputCreated();
        if (inputCallback) {
            inputCallback(this);
        }
        if (outputFactory) {
            this._output = outputFactory(this);
        }
        if (!this._output) {
            this._output = this.createOutput();
        }
        this.outputCreated();
        if (outputCallback) {
            outputCallback(this);
        }
        if (contentFactory) {
            this._content = contentFactory(this);
        }
        if (!this._content) {
            this._content = this.createContent();
        }
        this.contentCreated();
        if (contentCallback) {
            contentCallback(this);
        }
        return this;
    }
    parseValue(valueName, valueParser) {
        this._output[valueName] = valueParser(this);
        return this;
    }
    parseValues(valuesName, valuesParser, ...indexes) {
        let indexSet = new Set();
        for (let index of indexes.sort()) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }
        let newValues = [];
        let values = this._output[valuesName];
        if (values && Array.isArray(values)) {
            newValues.push(values);
        }
        for (let index of indexSet) {
            newValues[index] = valuesParser(this, index);
        }
        this._output[valuesName] = newValues;
        return this;
    }
    parseOutput(outputName, parserFactory, outputParser) {
        let parser = parserFactory();
        parser.create(() => this._input[outputName], undefined, () => this._output[outputName], undefined, () => this._content[outputName], undefined);
        outputParser(parser);
        this._output[outputName] = parser._output;
        return this;
    }
    parseOutputs(outputsName, parserFactory, outputsParser, ...indexes) {
        let inputs = this._input[outputsName];
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
        let outputs = this._output[outputsName];
        if (outputs && Array.isArray(outputs)) {
            newOutputs.push(outputs);
        }
        let contents = this._content[outputsName];
        for (let index of indexSet) {
            let parser = parserFactory();
            parser.create(() => {
                if (inputs && Array.isArray(inputs) && index < inputs.length) {
                    return inputs[index];
                }
            }, undefined, () => {
                if (outputs && Array.isArray(outputs) && index < outputs.length) {
                    return outputs[index];
                }
            }, undefined, () => {
                if (contents && Array.isArray(contents) && index < contents.length) {
                    return contents[index];
                }
            }, undefined);
            outputsParser(parser, index);
            newOutputs[index] = parser._output;
        }
        this._output[outputsName] = newOutputs;
        return this;
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

//# sourceMappingURL=parser.js.map

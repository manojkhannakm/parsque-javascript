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
        return new content_1.default;
    }
    contentCreated() {
    }
    create(inputFactory, inputCallback, outputFactory, outputCallback, contentFactory, contentCallback) {
        if (inputFactory) {
            this.input = inputFactory(this);
        }
        else {
            this.input = this.createInput();
        }
        this.inputCreated();
        if (inputCallback) {
            inputCallback();
        }
        if (outputFactory) {
            this.output = outputFactory(this);
        }
        else {
            this.output = this.createOutput();
        }
        this.outputCreated();
        if (outputCallback) {
            outputCallback();
        }
        if (contentFactory) {
            this.content = contentFactory(this);
        }
        else {
            this.content = this.createContent();
        }
        this.contentCreated();
        if (contentCallback) {
            contentCallback();
        }
    }
    parseValue(valueName, valueParser) {
        this.output[valueName] = valueParser(this);
    }
    parseValues(valuesName, valuesParser, ...indexes) {
        let indexSet = new Set();
        for (let index of indexes.sort()) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }
        let newValues = [];
        let values = this.output[valuesName];
        if (values && Array.isArray(values)) {
            newValues.push(values);
        }
        for (let index of indexSet) {
            newValues[index] = valuesParser(this, index);
        }
        this.output[valuesName] = newValues;
    }
    parseOutput(outputName, parserFactory, outputParser) {
        let parser = parserFactory();
        parser.create(parser => this.input[outputName], undefined, parser => this.output[outputName], undefined, parser => this.content[outputName], undefined);
        outputParser(parser);
        this.output[outputName] = parser.output;
    }
    parseOutputs(outputsName, parserFactory, outputsParser, ...indexes) {
        let inputs = this.input[outputsName];
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
        let outputs = this.output[outputsName];
        if (outputs && Array.isArray(outputs)) {
            newOutputs.push(outputs);
        }
        let contents = this.content[outputsName];
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
            newOutputs[index] = parser.output;
        }
        this.output[outputsName] = newOutputs;
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map
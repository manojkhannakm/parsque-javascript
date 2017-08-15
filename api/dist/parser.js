"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    createInput() {
        return new Promise(resolve => {
            resolve();
        });
    }
    inputCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    createOutput() {
        return new Promise(resolve => {
            resolve();
        });
    }
    outputCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    createContent() {
        return new Promise(resolve => {
            resolve();
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
            promise = promise
                .then(() => inputFactory(this));
        }
        else {
            promise = promise
                .then(() => this.createInput());
        }
        promise = promise
            .then(input => {
            this.input = input;
        })
            .then(() => this.inputCreated());
        if (outputFactory) {
            promise = promise
                .then(() => outputFactory(this));
        }
        else {
            promise = promise
                .then(() => this.createOutput());
        }
        promise = promise
            .then(output => {
            this.output = output;
        })
            .then(() => this.outputCreated());
        if (contentFactory) {
            promise = promise
                .then(() => contentFactory(this));
        }
        else {
            promise = promise
                .then(() => this.createContent());
        }
        promise = promise
            .then(content => {
            this.content = content;
        })
            .then(() => this.contentCreated());
        return promise
            .then(() => this);
    }
    parseValue(valueName, valueParser) {
        return valueParser(this)
            .then(value => {
            this.output[valueName] = value;
        })
            .then(() => this);
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
        let promise = new Promise(resolve => {
            resolve();
        });
        for (let index of indexSet) {
            promise = promise
                .then(() => valuesParser(this, index))
                .then(value => {
                newValues[index] = value;
            });
        }
        return promise
            .then(() => {
            this.output[valuesName] = newValues;
        })
            .then(() => this);
    }
    parseOutput(outputName, parserFactory, outputParser) {
        return parserFactory(this)
            .then(childParser => {
            let childInput = this.input[outputName], childOutput = this.output[outputName], childContent = this.content[outputName];
            return childParser.create(childInput ? () => new Promise(resolve => {
                resolve(childInput);
            }) : undefined, childOutput ? () => new Promise(resolve => {
                resolve(childOutput);
            }) : undefined, childContent ? () => new Promise(resolve => {
                resolve(childContent);
            }) : undefined)
                .then(() => outputParser(childParser))
                .then(() => {
                this.output[outputName] = childParser.output;
            });
        })
            .then(() => this);
    }
}
exports.default = Parser;

//# sourceMappingURL=parser.js.map

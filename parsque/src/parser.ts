import * as Promise from "bluebird";
import Content from "./content";
import Input from "./input";
import Output from "./output";

export default class Parser<I extends Input, O extends Output, C extends Content> {
    public input: I;
    public output: O;
    public content: C;

    protected createInput(): Promise<I> {
        return new Promise<I>(resolve => {
            resolve();
        });
    }

    protected inputCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    protected createOutput(): Promise<O> {
        return new Promise<O>(resolve => {
            resolve();
        });
    }

    protected outputCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    protected createContent(): Promise<C> {
        return new Promise<C>(resolve => {
            resolve();
        });
    }

    protected contentCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    public create(inputFactory?: (parser: this) => Promise<I>,
                  outputFactory?: (parser: this) => Promise<O>,
                  contentFactory?: (parser: this) => Promise<C>): Promise<this> {
        let promise: Promise<any> = new Promise<any>(resolve => {
            resolve();
        });

        if (inputFactory) {
            promise = promise
                .then(() => inputFactory(this));
        } else {
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
        } else {
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
        } else {
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

    public parseValue(valueName: keyof O,
                      valueParser: (parser: this) => Promise<any>): Promise<this> {
        return valueParser(this)
            .then(value => {
                this.output[valueName] = value;
            })
            .then(() => this);
    }

    public parseValues(valuesName: keyof O,
                       valuesParser: (parser: this, index: number) => Promise<any>,
                       ...indexes: number[]): Promise<this> {
        let indexSet: Set<number> = new Set<number>();

        for (let index of indexes.sort((a, b) => a - b)) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }

        let newValues: any[] = [];

        let values: any[] = (this.output as any)[valuesName];

        if (values && Array.isArray(values)) {
            newValues.push(...values);
        }

        let promise: Promise<any> = new Promise<any>(resolve => {
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
                this.output[valuesName] = newValues as any;
            })
            .then(() => this);
    }

    public parseOutput<X extends Input,
        Y extends Output,
        Z extends Content,
        P extends Parser<X, Y, Z>>(outputName: keyof O,
                                   parserFactory: (parser: this) => Promise<P>,
                                   outputParser: (childParser: P) => Promise<any>): Promise<this> {
        return parserFactory(this)
            .then(childParser => {
                let childInput: X = (this.input as any)[outputName],
                    childOutput: Y = (this.output as any)[outputName],
                    childContent: Z = (this.content as any)[outputName];

                return childParser.create(childInput ? () => new Promise<X>(resolve => {
                    resolve(childInput);
                }) : undefined, childOutput ? () => new Promise<Y>(resolve => {
                    resolve(childOutput);
                }) : undefined, childContent ? () => new Promise<Z>(resolve => {
                    resolve(childContent);
                }) : undefined)
                    .then(() => outputParser(childParser))
                    .then(() => {
                        this.output[outputName] = childParser.output as any;
                    });
            })
            .then(() => this);
    }

    public parseOutputs<X extends Input,
        Y extends Output,
        Z extends Content,
        P extends Parser<X, Y, Z>>(outputsName: keyof O,
                                   parserFactory: (parser: this) => Promise<P>,
                                   outputsParser: (childParser: P, index: number) => Promise<any>,
                                   ...indexes: number[]): Promise<this> {
        let inputs: X = (this.input as any)[outputsName];

        let inputSize: number = 0;

        if (inputs && Array.isArray(inputs)) {
            inputSize = inputs.length;
        }

        let indexSet: Set<number> = new Set<number>();

        for (let index of indexes.sort((a, b) => a - b)) {
            if (index >= 0 && (inputSize == 0 || index < inputSize)) {
                indexSet.add(index);
            }
        }

        if (indexSet.size == 0) {
            for (let i = 0; i < inputSize; i++) {
                indexSet.add(i);
            }
        }

        let newOutputs: Y[] = [];

        let outputs: Y[] = (this.output as any)[outputsName];

        if (outputs && Array.isArray(outputs)) {
            newOutputs.push(...outputs);
        }

        let contents: Z[] = (this.content as any)[outputsName];

        let promise: Promise<any> = new Promise<any>(resolve => {
            resolve();
        });

        for (let index of indexSet) {
            promise = promise
                .then(() => parserFactory(this))
                .then(childParser => {
                    let childInput: X;

                    if (inputs && Array.isArray(inputs) && index < inputs.length) {
                        childInput = inputs[index];
                    }

                    let childOutput: Y;

                    if (outputs && Array.isArray(outputs) && index < outputs.length) {
                        childOutput = outputs[index];
                    }

                    let childContent: Z;

                    if (contents && Array.isArray(contents) && index < contents.length) {
                        childContent = contents[index];
                    }

                    return childParser.create(childInput! ? () => new Promise<X>(resolve => {
                        resolve(childInput);
                    }) : undefined, childOutput! ? () => new Promise<Y>(resolve => {
                        resolve(childOutput);
                    }) : undefined, childContent! ? () => new Promise<Z>(resolve => {
                        resolve(childContent);
                    }) : undefined)
                        .then(() => outputsParser(childParser, index))
                        .then(() => {
                            newOutputs[index] = childParser.output;
                        });
                });
        }

        return promise
            .then(() => {
                this.output[outputsName] = newOutputs as any;
            })
            .then(() => this);
    }
}

import Input from "./input";
import Output from "./output";
import Content from "./content";

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

    public parseValue<N extends keyof O>(valueName: N,
                                         valueParser: (parser: this) => Promise<O[N]>): Promise<this> {
        return valueParser(this)
            .then(value => {
                this.output[valueName] = value;
            })
            .then(() => this);
    }

    public parseValues<N extends keyof O>(valuesName: N,
                                          valuesParser: (parser: this, index: number) => Promise<any>,
                                          ...indexes: number[]): Promise<this> {
        let indexSet: Set<number> = new Set<number>();

        for (let index of indexes.sort()) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }

        let newValues: O[N] = [];

        let values = this.output[valuesName];

        if (values && Array.isArray(values)) {
            (newValues as any[]).push(values);
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
                this.output[valuesName] = newValues;
            })
            .then(() => this);
    }

    // public parseOutput<P extends this, N extends keyof O>(outputName: N,
    //                                                       parserFactory: (parser: this) => Promise<P>,
    //                                                       outputParser: (parser: P) => Promise<void>): Promise<this> {
    //     let childParser: P;
    //
    //     return parserFactory(this).then(parser => {
    //         childParser = parser;
    //     }).then(() => this);
    //
    //     // return parserFactory(this)
    //     //     .then(parser => {
    //     //         return parser.create(() => new Promise<I>(resolve => {
    //     //             resolve((this.input as any)[outputName]);
    //     //         }), () => new Promise<O>(resolve => {
    //     //             resolve(this.output[outputName]);
    //     //         }), () => new Promise<C>(resolve => {
    //     //             resolve((this.content as any)[outputName]);
    //     //         }))
    //     //             .then(parser => {
    //     //                 return outputParser(parser)
    //     //                     .then(() => {
    //     //                         this.output[outputName] = parser.output;
    //     //                     })
    //     //             })
    //     //     })
    //     //     .then(() => this);
    // }

    // parseOutputs<X extends Input, Y extends Output, Z extends Content>(outputsName: string,
    //                                                                    parserFactory: () => Parser<X, Y, Z>,
    //                                                                    outputsParser: (parser: Parser<X, Y, Z>, index: number) => void,
    //                                                                    ...indexes: number[]): Parser<I, O, C> {
    //     let inputs: Input[] = this._input[outputsName];
    //
    //     let inputSize: number = 0;
    //
    //     if (inputs && Array.isArray(inputs)) {
    //         inputSize = inputs.length;
    //     }
    //
    //     let indexSet: Set<number> = new Set<number>();
    //
    //     for (let index of indexes.sort()) {
    //         if (index >= 0 && (inputSize == 0 || index < inputSize)) {
    //             indexSet.add(index);
    //         }
    //     }
    //
    //     if (indexSet.size == 0) {
    //         for (let i = 0; i < inputSize; i++) {
    //             indexSet.add(i);
    //         }
    //     }
    //
    //     let newOutputs: Output[] = [];
    //
    //     let outputs: Output[] = this._output[outputsName];
    //
    //     if (outputs && Array.isArray(outputs)) {
    //         newOutputs.push(outputs);
    //     }
    //
    //     let contents: Content[] = this._content[outputsName];
    //
    //     for (let index of indexSet) {
    //         let parser: Parser<X, Y, Z> = parserFactory();
    //
    //         parser.create(() => {
    //             if (inputs && Array.isArray(inputs) && index < inputs.length) {
    //                 return <X>inputs[index];
    //             }
    //
    //             return <X>new Input();
    //         }, undefined, () => {
    //             if (outputs && Array.isArray(outputs) && index < outputs.length) {
    //                 return <Y>outputs[index];
    //             }
    //
    //             return <Y>new Output();
    //         }, undefined, () => {
    //             if (contents && Array.isArray(contents) && index < contents.length) {
    //                 return <Z>contents[index];
    //             }
    //
    //             return <Z>new Content();
    //         }, undefined);
    //
    //         outputsParser(parser, index);
    //
    //         newOutputs[index] = parser._output;
    //     }
    //
    //     this._output[outputsName] = newOutputs;
    //
    //     return this;
    // }
}

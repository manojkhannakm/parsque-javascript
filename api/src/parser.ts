// import * as Promise from "bluebird";

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
            promise = promise.then(() => inputFactory(this));
        } else {
            promise = promise.then(() => this.createInput());
        }

        promise = promise.then(value => {
            this.input = value;
        }).then(() => this.inputCreated());

        if (outputFactory) {
            promise = promise.then(() => outputFactory(this));
        } else {
            promise = promise.then(() => this.createOutput());
        }

        promise = promise.then(value => {
            this.output = value;
        }).then(() => this.outputCreated());

        if (contentFactory) {
            promise = promise.then(() => contentFactory(this));
        } else {
            promise = promise.then(() => this.createContent());
        }

        promise = promise.then(value => {
            this.content = value;
        }).then(() => this.contentCreated());

        return promise.then(() => this);
    }

    public parseValue(valueName: keyof O,
                      valueParser: (parser: this) => Promise<any>): Promise<this> {
        return valueParser(this).then(value => {
            this.output[valueName] = value;
        }).then(() => this);
    }

    // parseValues(valuesName: string,
    //             valuesParser: (parser: Parser, index: number) => Promise<any>,
    //             ...indexes: number[]): Parser {
    //     let indexSet: Set<number> = new Set<number>();
    //
    //     for (let index of indexes.sort()) {
    //         if (index >= 0) {
    //             indexSet.add(index);
    //         }
    //     }
    //
    //     let newValues: any[] = [];
    //
    //     let values = this.output[valuesName];
    //
    //     if (values && Array.isArray(values)) {
    //         newValues.push(values);
    //     }
    //
    //     for (let index of indexSet) {
    //         newValues[index] = valuesParser(this, index);
    //     }
    //
    //     this.output[valuesName] = newValues;
    //
    //     return this;
    // }
}

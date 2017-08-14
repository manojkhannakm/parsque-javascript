// import * as Promise from "bluebird";

import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class Parser {
    public input: Input;
    public output: Output;
    public content: Content;

    public constructor() {
        this.input = new Input();
        this.output = new Output();
        this.content = new Content();
    }

    protected createInput(): Promise<Input> {
        return new Promise<Input>(resolve => {
            resolve(new Input());
        });
    }

    protected inputCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    protected createOutput(): Promise<Output> {
        return new Promise<Output>(resolve => {
            resolve(new Output());
        });
    }

    protected outputCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    protected createContent(): Promise<Content> {
        return new Promise<Content>(resolve => {
            resolve(new Content());
        });
    }

    protected contentCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    public create(inputFactory?: (parser: Parser) => Promise<Input>,
                  outputFactory?: (parser: Parser) => Promise<Output>,
                  contentFactory?: (parser: Parser) => Promise<Content>): Promise<Parser> {
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

    public parseValue(valueName: string,
                      valueParser: (parser: Parser) => Promise<any>): Promise<Parser> {
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

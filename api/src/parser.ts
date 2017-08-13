import * as Promise from "bluebird";

import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class Parser {
    public input: Input;
    public output: Output;
    public content: Content;

    constructor() {
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

    create(inputFactory?: (parser: Parser) => Promise<Input>,
           outputFactory?: (parser: Parser) => Promise<Output>,
           contentFactory?: (parser: Parser) => Promise<Content>): Promise<Parser> {
        let promise: Promise<any>;

        if (inputFactory) {
            promise = inputFactory(this);
        } else {
            promise = this.createInput();
        }

        promise = promise.then(value => this.inputCreated());

        if (outputFactory) {
            promise = outputFactory(this);
        } else {
            promise = this.createOutput();
        }

        promise = promise.then(value => this.outputCreated());

        if (contentFactory) {
            promise = contentFactory(this);
        } else {
            promise = this.createContent();
        }

        promise = promise.then(value => this.contentCreated());

        return promise.then(value => this);
    }

    parseValue(valueName: string,
               valueParser: (parser: Parser) => Promise<any>): Promise<Parser> {
        return valueParser(this)
            .then(value => {
                this.output[valueName] = value;
            }).then(value => this);
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

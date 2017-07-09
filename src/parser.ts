import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class Parser {
    private _input: Input;
    private _output: Output;
    private _content: Content;

    protected createInput(): Input {
        return new Input();
    }

    protected inputCreated(): void {
    }

    protected createOutput(): Output {
        return new Output();
    }

    protected outputCreated(): void {
    }

    protected createContent(): Content {
        return new Content();
    }

    protected contentCreated(): void {
    }

    create(inputFactory?: (parser: Parser) => Input,
           inputCallback?: (parser: Parser) => void,
           outputFactory?: (parser: Parser) => Output,
           outputCallback?: (parser: Parser) => void,
           contentFactory?: (parser: Parser) => Content,
           contentCallback?: (parser: Parser) => void): Parser {
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

    parseValue(valueName: string,
               valueParser: (parser: Parser) => any): Parser {
        this._output[valueName] = valueParser(this);

        return this;
    }

    parseValues(valuesName: string,
                valuesParser: (parser: Parser, index: number) => any,
                ...indexes: number[]): Parser {
        let indexSet = new Set<number>();

        for (let index of indexes.sort()) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }

        let newValues: any[] = [];

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

    parseOutput(outputName: string,
                parserFactory: () => Parser,
                outputParser: (parser: Parser) => void): Parser {
        let parser = parserFactory();

        parser.create(() => this._input[outputName], undefined,
            () => this._output[outputName], undefined,
            () => this._content[outputName], undefined);

        outputParser(parser);

        this._output[outputName] = parser._output;

        return this;
    }

    parseOutputs(outputsName: string,
                 parserFactory: () => Parser,
                 outputsParser: (parser: Parser, index: number) => void,
                 ...indexes: number[]): Parser {
        let inputs = this._input[outputsName];

        let inputSize = 0;

        if (inputs && Array.isArray(inputs)) {
            inputSize = inputs.length;
        }

        let indexSet = new Set<number>();

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

        let newOutputs: Output[] = [];

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

    get input(): Input {
        return this._input;
    }

    get output(): Output {
        return this._output;
    }

    get content(): Content {
        return this._content;
    }
}

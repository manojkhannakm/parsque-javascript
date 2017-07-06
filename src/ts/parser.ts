import Input from "./input";
import Output from "./output";
import Content from "./content";
import Utils from "./utils";

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
        return new Content;
    }

    protected contentCreated(): void {
    }

    create(inputFactory?: (parser: Parser) => Input,
           inputCallback?: () => void,
           outputFactory?: (parser: Parser) => Output,
           outputCallback?: () => void,
           contentFactory?: (parser: Parser) => Content,
           contentCallback?: () => void): void {
        if (inputFactory) {
            this._input = inputFactory(this);
        }

        if (!this._input) {
            this._input = this.createInput();
        }

        Utils.check("inputFactory", this._input);

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

        Utils.check("outputFactory", this._output);

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

        Utils.check("contentFactory", this._content);

        this.contentCreated();

        if (contentCallback) {
            contentCallback();
        }
    }

    parseValue(name: string, valueParser: (parser: Parser) => any): void {
        Utils.check("name", name);
        Utils.check("valueParser", valueParser);

        this._output[name] = valueParser(this);
    }

    parseValues(name: string,
                valuesParser: (parser: Parser, index: number) => any,
                ...indexes: number[]): void {
        Utils.check("name", name);
        Utils.check("valuesParser", valuesParser);

        let indexSet = new Set<number>();

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

    parseOutput(name: string,
                parserFactory: () => Parser,
                outputParser: (parser: Parser) => void): void {
        Utils.check("name", name);
        Utils.check("parserFactory", parserFactory);
        Utils.check("outputParser", outputParser);

        let parser = parserFactory();

        Utils.check("parserFactory", parser);

        parser.create(parser => this._input[name], null,
            parser => this._output[name], null,
            parser => this._content[name], null);

        outputParser(parser);

        this._output[name] = parser._output;
    }

    parseOutputs(name: string,
                 parserFactory: () => Parser,
                 outputsParser: (parser: Parser, index: number) => void,
                 ...indexes: number[]): void {
        Utils.check("name", name);
        Utils.check("parserFactory", parserFactory);
        Utils.check("outputsParser", outputsParser);

        let inputs = this._input[name];

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

        let newOutputs = [];

        let outputs = this._output[name];

        if (outputs && Array.isArray(outputs)) {
            newOutputs.push(outputs);
        }

        let contents = this._content[name];

        for (let index of indexSet) {
            let parser = parserFactory();

            Utils.check("parserFactory", parser);

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

import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class Parser<I extends Input, O extends Output, C extends Content> {
    input: I;
    output: O;
    content: C;

    protected createInput(): I {
        return new Input() as I;
    }

    protected inputCreated(): void {
    }

    protected createOutput(): O {
        return new Output() as O;
    }

    protected outputCreated(): void {
    }

    protected createContent(): C {
        return new Content as C;
    }

    protected contentCreated(): void {
    }

    create(inputFactory?: (parser: Parser<I, O, C>) => I,
           inputCallback?: () => void,
           outputFactory?: (parser: Parser<I, O, C>) => O,
           outputCallback?: () => void,
           contentFactory?: (parser: Parser<I, O, C>) => C,
           contentCallback?: () => void): void {
        if (inputFactory) {
            this.input = inputFactory(this);
        } else {
            this.input = this.createInput();
        }

        this.inputCreated();

        if (inputCallback) {
            inputCallback();
        }

        if (outputFactory) {
            this.output = outputFactory(this);
        } else {
            this.output = this.createOutput();
        }

        this.outputCreated();

        if (outputCallback) {
            outputCallback();
        }

        if (contentFactory) {
            this.content = contentFactory(this);
        } else {
            this.content = this.createContent();
        }

        this.contentCreated();

        if (contentCallback) {
            contentCallback();
        }
    }

    parseValue(valueName: string,
               valueParser: (parser: Parser<I, O, C>) => any): void {
        this.output[valueName] = valueParser(this);
    }

    parseValues(valuesName: string,
                valuesParser: (parser: Parser<I, O, C>, index: number) => any,
                ...indexes: number[]): void {
        let indexSet = new Set<number>();

        for (let index of indexes.sort()) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }

        let newValues: any[] = [];

        let values = this.output[valuesName];

        if (values && Array.isArray(values)) {
            newValues.push(values);
        }

        for (let index of indexSet) {
            newValues[index] = valuesParser(this, index);
        }

        this.output[valuesName] = newValues;
    }

    parseOutput(outputName: string,
                parserFactory: () => Parser<I, O, C>,
                outputParser: (parser: Parser<I, O, C>) => void): void {
        let parser = parserFactory();

        parser.create(parser => this.input[outputName], undefined,
            parser => this.output[outputName], undefined,
            parser => this.content[outputName], undefined);

        outputParser(parser);

        this.output[outputName] = parser.output;
    }

    parseOutputs(outputsName: string,
                 parserFactory: () => Parser<I, O, C>,
                 outputsParser: (parser: Parser<I, O, C>, index: number) => void,
                 ...indexes: number[]): void {
        let inputs = this.input[outputsName];

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

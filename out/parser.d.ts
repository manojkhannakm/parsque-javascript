import Input from "./input";
import Output from "./output";
import Content from "./content";
export default class Parser<I extends Input, O extends Output, C extends Content> {
    input: I;
    output: O;
    content: C;
    protected createInput(): I;
    protected inputCreated(): void;
    protected createOutput(): O;
    protected outputCreated(): void;
    protected createContent(): C;
    protected contentCreated(): void;
    create(inputFactory?: (parser: Parser<I, O, C>) => I, inputCallback?: () => void, outputFactory?: (parser: Parser<I, O, C>) => O, outputCallback?: () => void, contentFactory?: (parser: Parser<I, O, C>) => C, contentCallback?: () => void): void;
    parseValue(valueName: string, valueParser: (parser: Parser<I, O, C>) => any): void;
    parseValues(valuesName: string, valuesParser: (parser: Parser<I, O, C>, index: number) => any, ...indexes: number[]): void;
    parseOutput(outputName: string, parserFactory: () => Parser<I, O, C>, outputParser: (parser: Parser<I, O, C>) => void): void;
    parseOutputs(outputsName: string, parserFactory: () => Parser<I, O, C>, outputsParser: (parser: Parser<I, O, C>, index: number) => void, ...indexes: number[]): void;
}

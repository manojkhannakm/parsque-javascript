import Input from "./input";
import Output from "./output";
import Content from "./content";
export default class Parser {
    private _input;
    private _output;
    private _content;
    protected createInput(): Input;
    protected inputCreated(): void;
    protected createOutput(): Output;
    protected outputCreated(): void;
    protected createContent(): Content;
    protected contentCreated(): void;
    create(inputFactory?: (parser: Parser) => Input, inputCallback?: () => void, outputFactory?: (parser: Parser) => Output, outputCallback?: () => void, contentFactory?: (parser: Parser) => Content, contentCallback?: () => void): void;
    parseValue(name: string, valueParser: (parser: Parser) => any): void;
    parseValues(name: string, valuesParser: (parser: Parser, index: number) => any, ...indexes: number[]): void;
    parseOutput(name: string, parserFactory: () => Parser, outputParser: (parser: Parser) => void): void;
    parseOutputs(name: string, parserFactory: () => Parser, outputsParser: (parser: Parser, index: number) => void, ...indexes: number[]): void;
    readonly input: Input;
    readonly output: Output;
    readonly content: Content;
}

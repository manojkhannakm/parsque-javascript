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
    create(inputFactory?: (parser: Parser) => Input, inputCallback?: (parser: Parser) => void, outputFactory?: (parser: Parser) => Output, outputCallback?: (parser: Parser) => void, contentFactory?: (parser: Parser) => Content, contentCallback?: (parser: Parser) => void): Parser;
    parseValue(valueName: string, valueParser: (parser: Parser) => any): Parser;
    parseValues(valuesName: string, valuesParser: (parser: Parser, index: number) => any, ...indexes: number[]): Parser;
    parseOutput(outputName: string, parserFactory: () => Parser, outputParser: (parser: Parser) => void): Parser;
    parseOutputs(outputsName: string, parserFactory: () => Parser, outputsParser: (parser: Parser, index: number) => void, ...indexes: number[]): Parser;
    readonly input: Input;
    readonly output: Output;
    readonly content: Content;
}

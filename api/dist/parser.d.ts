import Input from "./input";
import Output from "./output";
import Content from "./content";
export default class Parser {
    input: Input;
    output: Output;
    content: Content;
    constructor();
    protected createInput(): Promise<Input>;
    protected inputCreated(): Promise<void>;
    protected createOutput(): Promise<Output>;
    protected outputCreated(): Promise<void>;
    protected createContent(): Promise<Content>;
    protected contentCreated(): Promise<void>;
    create(inputFactory?: (parser: Parser) => Promise<Input>, outputFactory?: (parser: Parser) => Promise<Output>, contentFactory?: (parser: Parser) => Promise<Content>): Promise<Parser>;
    parseValue(valueName: string, valueParser: (parser: Parser) => Promise<any>): Promise<Parser>;
}

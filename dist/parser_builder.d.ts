import Parser from "./parser";
import Input from "./input";
import Output from "./output";
import Content from "./content";
export default class ParserBuilder {
    private parserFactory;
    private inputFactory;
    private inputCallback;
    private outputFactory;
    private outputCallback;
    private contentFactory;
    private contentCallback;
    constructor(parserFactory?: () => Parser);
    withInputFactory(inputFactory: (parser: Parser) => Input): ParserBuilder;
    withInputCallback(inputCallback: (parser: Parser) => void): ParserBuilder;
    withOutputFactory(outputFactory: (parser: Parser) => Output): ParserBuilder;
    withOutputCallback(outputCallback: (parser: Parser) => void): ParserBuilder;
    withContentFactory(contentFactory: (parser: Parser) => Content): ParserBuilder;
    withContentCallback(contentCallback: (parser: Parser) => void): ParserBuilder;
    build(): Parser;
}

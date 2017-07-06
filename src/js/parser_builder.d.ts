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
    withInputCallback(inputCallback: () => void): ParserBuilder;
    withOutputFactory(outputFactory: (parser: Parser) => Output): ParserBuilder;
    withOutputCallback(outputCallback: () => void): ParserBuilder;
    withContentFactory(contentFactory: (parser: Parser) => Content): ParserBuilder;
    withContentCallback(contentCallback: () => void): ParserBuilder;
    build(): Parser;
}

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
    setInputFactory(inputFactory: (parser: Parser) => Input): ParserBuilder;
    setInputCallback(inputCallback: () => void): ParserBuilder;
    setOutputFactory(outputFactory: (parser: Parser) => Output): ParserBuilder;
    setOutputCallback(outputCallback: () => void): ParserBuilder;
    setContentFactory(contentFactory: (parser: Parser) => Content): ParserBuilder;
    setContentCallback(contentCallback: () => void): ParserBuilder;
    build(): Parser;
}

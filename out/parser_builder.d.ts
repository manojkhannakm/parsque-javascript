import Parser from "./parser";
import Input from "./input";
import Output from "./output";
import Content from "./content";
export default class ParserBuilder<P extends Parser<I, O, C>, I extends Input, O extends Output, C extends Content> {
    private parserFactory;
    private inputFactory;
    private inputCallback;
    private outputFactory;
    private outputCallback;
    private contentFactory;
    private contentCallback;
    constructor(parserFactory?: () => P);
    withInputFactory(inputFactory: (parser: P) => I): ParserBuilder<P, I, O, C>;
    withInputCallback(inputCallback: () => void): ParserBuilder<P, I, O, C>;
    withOutputFactory(outputFactory: (parser: P) => O): ParserBuilder<P, I, O, C>;
    withOutputCallback(outputCallback: () => void): ParserBuilder<P, I, O, C>;
    withContentFactory(contentFactory: (parser: P) => C): ParserBuilder<P, I, O, C>;
    withContentCallback(contentCallback: () => void): ParserBuilder<P, I, O, C>;
    build(): P;
}

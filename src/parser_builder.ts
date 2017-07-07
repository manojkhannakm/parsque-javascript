import Parser from "./parser";
import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class ParserBuilder {
    private inputFactory: (parser: Parser) => Input;
    private inputCallback: (parser: Parser) => void;
    private outputFactory: (parser: Parser) => Output;
    private outputCallback: (parser: Parser) => void;
    private contentFactory: (parser: Parser) => Content;
    private contentCallback: (parser: Parser) => void;

    constructor(private parserFactory: () => Parser = () => new Parser()) {
    }

    withInputFactory(inputFactory: (parser: Parser) => Input): ParserBuilder {
        this.inputFactory = inputFactory;

        return this;
    }

    withInputCallback(inputCallback: (parser: Parser) => void): ParserBuilder {
        this.inputCallback = inputCallback;

        return this;
    }

    withOutputFactory(outputFactory: (parser: Parser) => Output): ParserBuilder {
        this.outputFactory = outputFactory;

        return this;
    }

    withOutputCallback(outputCallback: (parser: Parser) => void): ParserBuilder {
        this.outputCallback = outputCallback;

        return this;
    }

    withContentFactory(contentFactory: (parser: Parser) => Content): ParserBuilder {
        this.contentFactory = contentFactory;

        return this;
    }

    withContentCallback(contentCallback: (parser: Parser) => void): ParserBuilder {
        this.contentCallback = contentCallback;

        return this;
    }

    build(): Parser {
        let parser = this.parserFactory();

        parser.create(this.inputFactory, this.inputCallback,
            this.outputFactory, this.outputCallback,
            this.contentFactory, this.contentCallback);

        return parser;
    }
}

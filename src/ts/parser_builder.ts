import Parser from "./parser";
import Input from "./input";
import Output from "./output";
import Content from "./content";
import Utils from "./utils";

export default class ParserBuilder {
    private inputFactory: (parser: Parser) => Input = parser => new Input();
    private inputCallback: () => void = () => {
    };
    private outputFactory: (parser: Parser) => Output = parser => new Output();
    private outputCallback: () => void = () => {
    };
    private contentFactory: (parser: Parser) => Content = parser => new Content();
    private contentCallback: () => void = () => {
    };

    constructor(private parserFactory: () => Parser = () => new Parser()) {
        Utils.check("parserFactory", parserFactory);
    }

    setInputFactory(inputFactory: (parser: Parser) => Input): ParserBuilder {
        Utils.check("inputFactory", inputFactory);

        this.inputFactory = inputFactory;

        return this;
    }

    setInputCallback(inputCallback: () => void): ParserBuilder {
        Utils.check("inputCallback", inputCallback);

        this.inputCallback = inputCallback;

        return this;
    }

    setOutputFactory(outputFactory: (parser: Parser) => Output): ParserBuilder {
        Utils.check("outputFactory", outputFactory);

        this.outputFactory = outputFactory;

        return this;
    }

    setOutputCallback(outputCallback: () => void): ParserBuilder {
        Utils.check("outputCallback", outputCallback);

        this.outputCallback = outputCallback;

        return this;
    }

    setContentFactory(contentFactory: (parser: Parser) => Content): ParserBuilder {
        Utils.check("contentFactory", contentFactory);

        this.contentFactory = contentFactory;

        return this;
    }

    setContentCallback(contentCallback: () => void): ParserBuilder {
        Utils.check("contentCallback", contentCallback);

        this.contentCallback = contentCallback;

        return this;
    }

    build(): Parser {
        let parser = this.parserFactory();

        Utils.check("parserFactory", parser);

        parser.create(this.inputFactory, this.inputCallback,
            this.outputFactory, this.outputCallback,
            this.contentFactory, this.contentCallback);

        return parser;
    }
}

import Parser from "./parser";
import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class ParserBuilder<P extends Parser<I, O, C>,
    I extends Input, O extends Output, C extends Content> {
    private inputFactory: (parser: P) => I;
    private inputCallback: () => void;
    private outputFactory: (parser: P) => O;
    private outputCallback: () => void;
    private contentFactory: (parser: P) => C;
    private contentCallback: () => void;

    constructor(private parserFactory: () => P = () => new Parser() as P) {
    }

    withInputFactory(inputFactory: (parser: P) => I): ParserBuilder<P, I, O, C> {
        this.inputFactory = inputFactory;

        return this;
    }

    withInputCallback(inputCallback: () => void): ParserBuilder<P, I, O, C> {
        this.inputCallback = inputCallback;

        return this;
    }

    withOutputFactory(outputFactory: (parser: P) => O): ParserBuilder<P, I, O, C> {
        this.outputFactory = outputFactory;

        return this;
    }

    withOutputCallback(outputCallback: () => void): ParserBuilder<P, I, O, C> {
        this.outputCallback = outputCallback;

        return this;
    }

    withContentFactory(contentFactory: (parser: P) => C): ParserBuilder<P, I, O, C> {
        this.contentFactory = contentFactory;

        return this;
    }

    withContentCallback(contentCallback: () => void): ParserBuilder<P, I, O, C> {
        this.contentCallback = contentCallback;

        return this;
    }

    build(): P {
        let parser = this.parserFactory();

        parser.create(this.inputFactory, this.inputCallback,
            this.outputFactory, this.outputCallback,
            this.contentFactory, this.contentCallback);

        return parser;
    }
}

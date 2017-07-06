import Parser from "./parser";
import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class ParserBuilder {
    private inputFactory: (parser: Parser) => Input = parser => new Input();
    private inputCallback: () => void = () => {
    };
    private outputFactory: (parser: Parser) => Output = parser => new Output();
    private outputCallback: () => void = () => {
    };
    private contentFactory: (parser: Parser) => Content = parser => new Input();
    private contentCallback: () => void = () => {
    };

    constructor(private parserFactory: () => Parser = () => new Parser()) {
    }
}

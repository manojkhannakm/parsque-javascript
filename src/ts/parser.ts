import Input from "./input";
import Output from "./output";
import Content from "./content";
import Utils from "./utils";

export default class Parser {
    private _input: Input;
    private _output: Output;
    private _content: Content;

    protected createInput(): Input {
        return new Input();
    }

    protected inputCreated(): void {
    }

    protected createOutput(): Output {
        return new Output();
    }

    protected outputCreated(): void {
    }

    protected createContent(): Content {
        return new Content;
    }

    protected contentCreated(): void {
    }

    public create(inputFactory?: (parser: Parser) => Input, inputCallback?: () => void,
                  outputFactory?: (parser: Parser) => Output, outputCallback?: () => void,
                  contentFactory?: (parser: Parser) => Content, contentCallback?: () => void): void {
        if (inputFactory) {
            this._input = inputFactory(this);
        }

        if (!this._input) {
            this._input = this.createInput();
        }

        Utils.check("inputFactory", this._input);

        this.inputCreated();

        if (inputCallback) {
            inputCallback();
        }

        if (outputFactory) {
            this._output = outputFactory(this);
        }

        if (!this._output) {
            this._output = this.createOutput();
        }

        Utils.check("outputFactory", this._output);

        this.outputCreated();

        if (outputCallback) {
            outputCallback();
        }

        if (contentFactory) {
            this._content = contentFactory(this);
        }

        if (!this._content) {
            this._content = this.createContent();
        }

        Utils.check("contentFactory", this._content);

        this.contentCreated();

        if (contentCallback) {
            contentCallback();
        }
    }

    public parseValue(name: string, valueParser: (parser: Parser) => object): void {
        Utils.check("name", name);
        Utils.check("valueParser", valueParser);


    }

    public parseValueList(): void {

    }

    public parseOutput(): void {

    }

    public parseOutputList(): void {

    }

    public get input(): Input {
        return this._input;
    }

    public get output(): Output {
        return this._output;
    }

    public get content(): Content {
        return this._content;
    }
}

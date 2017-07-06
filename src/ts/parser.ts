import {Content, Input, Output} from "./parsque";

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

    public create(inputFactory: (parser: Parser) => Input, inputCallback: () => void,
                  outputFactory: (parser: Parser) => Output, outputCallback: () => void,
                  contentFactory: (parser: Parser) => Content, contentCallback: () => void): void {
        if (inputFactory) {
            this._input = inputFactory(this);
        }

        if (!this._input) {

        }
    }

    //

    get input(): Input {
        return this._input;
    }

    get output(): Output {
        return this._output;
    }

    get content(): Content {
        return this._content;
    }
}

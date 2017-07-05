import Input from "./input";
import Output from "./output";
import Content from "./content";

export default class Parser {
    private input: Input;
    private output: Output;
    private content: Content;

    protected createInput(): Input {
        return new Input();
    }

    protected inputCreated() {
    }


}

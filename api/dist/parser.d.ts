import Input from "./input";
import Output from "./output";
import Content from "./content";
export default class Parser<I extends Input, O extends Output, C extends Content> {
    input: I;
    output: O;
    content: C;
    protected createInput(): Promise<I>;
    protected inputCreated(): Promise<any>;
    protected createOutput(): Promise<O>;
    protected outputCreated(): Promise<any>;
    protected createContent(): Promise<C>;
    protected contentCreated(): Promise<any>;
    create(inputFactory?: (parser: this) => Promise<I>, outputFactory?: (parser: this) => Promise<O>, contentFactory?: (parser: this) => Promise<C>): Promise<this>;
    parseValue(valueName: keyof O, valueParser: (parser: this) => Promise<any>): Promise<this>;
    parseValues(valuesName: keyof O, valuesParser: (parser: this, index: number) => Promise<any>, ...indexes: number[]): Promise<this>;
    parseOutput<X extends Input, Y extends Output, Z extends Content, P extends Parser<X, Y, Z>>(outputName: keyof O, parserFactory: (parser: this) => Promise<P>, outputParser: (childParser: P) => Promise<any>): Promise<this>;
}

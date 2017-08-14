import Input from "./input";
import Output from "./output";
import Content from "./content";
export default class Parser<I extends Input, O extends Output, C extends Content> {
    input: I;
    output: O;
    content: C;
    protected createInput(): Promise<I>;
    protected inputCreated(): Promise<void>;
    protected createOutput(): Promise<O>;
    protected outputCreated(): Promise<void>;
    protected createContent(): Promise<C>;
    protected contentCreated(): Promise<void>;
    create(inputFactory?: (parser: this) => Promise<I>, outputFactory?: (parser: this) => Promise<O>, contentFactory?: (parser: this) => Promise<C>): Promise<this>;
    parseValue<N extends keyof O>(valueName: N, valueParser: (parser: this) => Promise<O[N]>): Promise<this>;
    parseValues<N extends keyof O>(valuesName: N, valuesParser: (parser: this, index: number) => Promise<any>, ...indexes: number[]): Promise<this>;
}

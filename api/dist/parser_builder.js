"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
class ParserBuilder {
    constructor(parserFactory = () => new parser_1.default()) {
        this.parserFactory = parserFactory;
    }
    withInputFactory(inputFactory) {
        this.inputFactory = inputFactory;
        return this;
    }
    withInputCallback(inputCallback) {
        this.inputCallback = inputCallback;
        return this;
    }
    withOutputFactory(outputFactory) {
        this.outputFactory = outputFactory;
        return this;
    }
    withOutputCallback(outputCallback) {
        this.outputCallback = outputCallback;
        return this;
    }
    withContentFactory(contentFactory) {
        this.contentFactory = contentFactory;
        return this;
    }
    withContentCallback(contentCallback) {
        this.contentCallback = contentCallback;
        return this;
    }
    build() {
        let parser = this.parserFactory();
        parser.create(this.inputFactory, this.inputCallback, this.outputFactory, this.outputCallback, this.contentFactory, this.contentCallback);
        return parser;
    }
}
exports.default = ParserBuilder;

//# sourceMappingURL=parser_builder.js.map

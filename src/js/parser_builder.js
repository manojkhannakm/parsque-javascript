"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const input_1 = require("./input");
const output_1 = require("./output");
const content_1 = require("./content");
const utils_1 = require("./utils");
class ParserBuilder {
    constructor(parserFactory = () => new parser_1.default()) {
        this.parserFactory = parserFactory;
        this.inputFactory = parser => new input_1.default();
        this.inputCallback = () => {
        };
        this.outputFactory = parser => new output_1.default();
        this.outputCallback = () => {
        };
        this.contentFactory = parser => new content_1.default();
        this.contentCallback = () => {
        };
        utils_1.default.check("parserFactory", parserFactory);
    }
    setInputFactory(inputFactory) {
        utils_1.default.check("inputFactory", inputFactory);
        this.inputFactory = inputFactory;
        return this;
    }
    setInputCallback(inputCallback) {
        utils_1.default.check("inputCallback", inputCallback);
        this.inputCallback = inputCallback;
        return this;
    }
    setOutputFactory(outputFactory) {
        utils_1.default.check("outputFactory", outputFactory);
        this.outputFactory = outputFactory;
        return this;
    }
    setOutputCallback(outputCallback) {
        utils_1.default.check("outputCallback", outputCallback);
        this.outputCallback = outputCallback;
        return this;
    }
    setContentFactory(contentFactory) {
        utils_1.default.check("contentFactory", contentFactory);
        this.contentFactory = contentFactory;
        return this;
    }
    setContentCallback(contentCallback) {
        utils_1.default.check("contentCallback", contentCallback);
        this.contentCallback = contentCallback;
        return this;
    }
    build() {
        let parser = this.parserFactory();
        utils_1.default.check("parserFactory", parser);
        parser.create(this.inputFactory, this.inputCallback, this.outputFactory, this.outputCallback, this.contentFactory, this.contentCallback);
        return parser;
    }
}
exports.default = ParserBuilder;
//# sourceMappingURL=parser_builder.js.map
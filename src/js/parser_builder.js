"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const utils_1 = require("./utils");
class ParserBuilder {
    constructor(parserFactory = () => new parser_1.default()) {
        this.parserFactory = parserFactory;
        this.inputFactory = parser => null;
        this.inputCallback = () => {
        };
        this.outputFactory = parser => null;
        this.outputCallback = () => {
        };
        this.contentFactory = parser => null;
        this.contentCallback = () => {
        };
        utils_1.default.check("parserFactory", parserFactory);
    }
    withInputFactory(inputFactory) {
        utils_1.default.check("inputFactory", inputFactory);
        this.inputFactory = inputFactory;
        return this;
    }
    withInputCallback(inputCallback) {
        utils_1.default.check("inputCallback", inputCallback);
        this.inputCallback = inputCallback;
        return this;
    }
    withOutputFactory(outputFactory) {
        utils_1.default.check("outputFactory", outputFactory);
        this.outputFactory = outputFactory;
        return this;
    }
    withOutputCallback(outputCallback) {
        utils_1.default.check("outputCallback", outputCallback);
        this.outputCallback = outputCallback;
        return this;
    }
    withContentFactory(contentFactory) {
        utils_1.default.check("contentFactory", contentFactory);
        this.contentFactory = contentFactory;
        return this;
    }
    withContentCallback(contentCallback) {
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
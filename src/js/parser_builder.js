"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const input_1 = require("./input");
const output_1 = require("./output");
class ParserBuilder {
    constructor(parserFactory = () => new parser_1.default()) {
        this.parserFactory = parserFactory;
        this.inputFactory = parser => new input_1.default();
        this.inputCallback = () => {
        };
        this.outputFactory = parser => new output_1.default();
        this.outputCallback = () => {
        };
        this.contentFactory = parser => new input_1.default();
        this.contentCallback = () => {
        };
    }
}
exports.default = ParserBuilder;

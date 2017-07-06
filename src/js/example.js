"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_builder_1 = require("./parser_builder");
// let parser = new Parser();
// parser.create();
// parser.parseValue("a", parser => 10);
// parser.parseValues("b", (parser, index) => (index + 1) * 10, 0, 2);
// parser.parseOutput("c", () => new Parser(), parser => {
//     parser.parseValue("x", parser => 70);
//     parser.parseValue("y", parser => 80);
//     parser.parseValue("z", parser => 90);
// });
// parser.parseOutputs("d", () => new Parser(), (parser, index) => {
//     parser.parseValue("x", parser => (index + 1) * 70);
//     parser.parseValue("y", parser => (index + 1) * 80);
//     parser.parseValue("z", parser => (index + 1) * 90);
// }, 0, 2);
//
// console.log(JSON.stringify(parser.output, null, 2));
new parser_builder_1.default();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
let parser = new parser_1.default();
parser.create();
parser.parseValue("a", null);

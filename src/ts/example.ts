import Parser from "./parser";

let parser = new Parser();
parser.create();
parser.parseValue("a", parser => 10);

console.log(JSON.stringify(parser.output, null, 2));

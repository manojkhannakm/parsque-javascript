"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsque_api_1 = require("parsque-api");
const fs = require("fs");
const FILES_PATH = "./files/";
const FILE_1_PATH = FILES_PATH + "file_1.txt";
const FILE_2_PATH = FILES_PATH + "file_2.txt";
const FILE_3_PATH = FILES_PATH + "file_3.txt";
class FileInput extends parsque_api_1.Input {
}
class FileOutput extends parsque_api_1.Output {
}
class FileContent extends parsque_api_1.Content {
}
class FileParser extends parsque_api_1.Parser {
    inputCreated() {
        super.inputCreated();
        let input = this.input;
        let childInput = new FileInput();
        childInput.path = FILE_2_PATH;
        input.file = childInput;
        let childInputs = [];
        for (let path of [FILE_1_PATH, FILE_2_PATH, FILE_3_PATH]) {
            let childInput = new FileInput();
            childInput.path = path;
            childInputs.push(childInput);
        }
        input.files = childInputs;
    }
    createOutput() {
        return new FileOutput();
    }
    createContent() {
        let content = new FileContent();
        content.lines = fs.readFileSync(this.input.path, "utf-8").split(/\s+/);
        return content;
    }
    parseLine1() {
        this.parseValue("line1", parser => this.content.lines[0]);
    }
    parseLine2() {
        this.parseValue("line2", parser => this.content.lines[1]);
    }
    parseLine3() {
        this.parseValue("line3", parser => this.content.lines[2]);
    }
    parseFile(outputParser) {
        this.parseOutput("file", () => new FileParser(), outputParser);
    }
    parseFiles(outputsParser, ...indexes) {
        this.parseOutputs("files", () => new FileParser(), outputsParser, ...indexes);
    }
}
let parser = new parsque_api_1.ParserBuilder(() => new FileParser())
    .withInputFactory(() => {
    let input = new FileInput();
    input.path = FILE_1_PATH;
    return input;
})
    .build();
parser.parseLine1();
parser.parseLine2();
parser.parseLine3();
parser.parseFile(childParser => {
    childParser.parseLine1();
    childParser.parseLine2();
    childParser.parseLine3();
});
parser.parseFiles(childParser => {
    childParser.parseLine1();
    childParser.parseLine2();
    childParser.parseLine3();
}, 0, 2);
console.log(JSON.stringify(parser.output, null, 2));

//# sourceMappingURL=example.js.map

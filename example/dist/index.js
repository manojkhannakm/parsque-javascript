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
    constructor(path) {
        super();
        this.path = path;
    }
    createInput() {
        return new Promise(resolve => {
            let input = new FileInput();
            if (this.path) {
                input.path = this.path;
            }
            resolve(input);
        });
    }
    inputCreated() {
        return new Promise(resolve => {
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
            resolve();
        });
    }
    createOutput() {
        return new Promise(resolve => {
            resolve(new FileOutput());
        });
    }
    createContent() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.input.path, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                let content = new FileContent();
                content.lines = data.split(/[\n\r]+/);
                resolve(content);
            });
        });
    }
    parseNumber() {
        return this.parseValue("number", () => new Promise(resolve => {
            resolve(parseInt(this.content.lines[0]));
        }));
    }
    parseStrings(...indexes) {
        return this.parseValues("strings", (parser, index) => new Promise(resolve => {
            resolve(this.content.lines[1].split(/, /)[index]);
        }), ...indexes);
    }
    parseFile(outputParser) {
        return this.parseOutput("file", () => new Promise(resolve => {
            resolve(new FileParser());
        }), outputParser);
    }
}
new FileParser(FILE_1_PATH).create()
    .then(parser => parser.parseNumber())
    .then(parser => parser.parseStrings(0, 2))
    .then(parser => parser.parseFile(childParser => childParser.parseNumber()
    .then(childParser => childParser.parseStrings(0, 1, 2))))
    .then(parser => {
    console.log(JSON.stringify(parser.output, null, 2));
})
    .catch(error => {
    console.error(error);
});

//# sourceMappingURL=index.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsque_1 = require("parsque");
const Promise = require("bluebird");
const fs = require("fs");
const FILES_PATH = "files/";
const FILE_1_PATH = FILES_PATH + "file_1.txt";
const FILE_2_PATH = FILES_PATH + "file_2.txt";
const FILE_3_PATH = FILES_PATH + "file_3.txt";
class FileInput extends parsque_1.Input {
}
class FileOutput extends parsque_1.Output {
}
class FileContent extends parsque_1.Content {
}
class FileParser extends parsque_1.Parser {
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
    parseWord() {
        return this.parseValue("word", () => new Promise(resolve => {
            resolve(this.content.lines[0]);
        }));
    }
    parseWords(...indexes) {
        return this.parseValues("words", (parser, index) => new Promise(resolve => {
            resolve(this.content.lines[1].split(/, /)[index]);
        }), ...indexes);
    }
    parseFile(outputParser) {
        return this.parseOutput("file", () => new Promise(resolve => {
            resolve(new FileParser());
        }), outputParser);
    }
    parseFiles(outputsParser, ...indexes) {
        return this.parseOutputs("files", () => new Promise(resolve => {
            resolve(new FileParser());
        }), outputsParser, ...indexes);
    }
}
new FileParser()
    .create(parser => new Promise(resolve => {
    let input = new FileInput();
    input.path = FILE_1_PATH;
    resolve(input);
}))
    .then(parser => parser.parseWord())
    .then(parser => parser.parseWords(0, 2))
    .then(parser => parser.parseFile(childParser => childParser.parseWord()
    .then(childParser => childParser.parseWords(0, 1, 2))))
    .then(parser => parser.parseFiles(childParser => childParser.parseWord()
    .then(childParser => childParser.parseWords(0, 1, 2)), 0, 2))
    .then(parser => {
    console.log(JSON.stringify(parser.output, null, 2));
})
    .catch(error => {
    console.error(error);
});

//# sourceMappingURL=index.js.map

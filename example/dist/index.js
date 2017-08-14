"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as Promise from "bluebird";
const fs = require("fs");
const parsque_api_1 = require("parsque-api");
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
    constructor(path = "") {
        super();
        this.path = path;
    }
    createInput() {
        return new Promise(resolve => {
            let input = new FileInput();
            input.path = this.path;
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
            let content = new FileContent();
            fs.readFile(this.input.path, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                content.lines = data.split(/\s+/);
                resolve(content);
            });
        });
    }
    create(inputFactory, outputFactory, contentFactory) {
        return super.create(inputFactory, outputFactory, contentFactory);
    }
    parseNumber() {
        return this.parseValue("number", parser => new Promise(resolve => {
            resolve(parseInt(this.content.lines[0]));
        }));
    }
    parseString() {
        return this.parseValue("string", parser => new Promise(resolve => {
            resolve(this.content.lines[1]);
        }));
    }
}
new FileParser().create()
    .then(parser => parser.parseNumber())
    .then(parser => parser.parseString())
    .then(parser => {
    console.log(parser.output);
})
    .catch(error => {
    console.log(error);
});

//# sourceMappingURL=index.js.map

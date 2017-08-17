import * as Promise from "bluebird";
import * as fs from "fs";

import {Content, Input, Output, Parser} from "parsque-api";

const FILES_PATH = "./files/";
const FILE_1_PATH = FILES_PATH + "file_1.txt";
const FILE_2_PATH = FILES_PATH + "file_2.txt";
const FILE_3_PATH = FILES_PATH + "file_3.txt";

class FileInput extends Input {
    path: string;

    file: FileInput;
    files: FileInput[];
}

class FileOutput extends Output {
    word: string;
    words: string[];

    file: FileOutput;
    files: FileOutput[];
}

class FileContent extends Content {
    lines: string[];
}

class FileParser extends Parser<FileInput, FileOutput, FileContent> {
    protected inputCreated(): Promise<any> {
        return new Promise<any>(resolve => {
            let input: FileInput = this.input;

            let childInput: FileInput = new FileInput();
            childInput.path = FILE_2_PATH;
            input.file = childInput;

            let childInputs: FileInput[] = [];

            for (let path of [FILE_1_PATH, FILE_2_PATH, FILE_3_PATH]) {
                let childInput: FileInput = new FileInput();
                childInput.path = path;
                childInputs.push(childInput);
            }

            input.files = childInputs;

            resolve();
        });
    }

    protected createOutput(): Promise<FileOutput> {
        return new Promise<FileOutput>(resolve => {
            resolve(new FileOutput());
        });
    }

    protected createContent(): Promise<FileContent> {
        return new Promise<FileContent>((resolve, reject) => {
            fs.readFile(this.input.path, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                let content: FileContent = new FileContent();
                content.lines = data.split(/[\n\r]+/);

                resolve(content);
            });
        });
    }

    public parseWord(): Promise<this> {
        return this.parseValue("word", () => new Promise<string>(resolve => {
            resolve(this.content.lines[0]);
        }));
    }

    public parseWords(...indexes: number[]): Promise<this> {
        return this.parseValues("words", (parser, index) => new Promise<string>(resolve => {
            resolve(this.content.lines[1].split(/, /)[index]);
        }), ...indexes);
    }

    public parseFile(outputParser: (childParser: this) => Promise<any>): Promise<this> {
        return this.parseOutput("file", () => new Promise<FileParser>(resolve => {
            resolve(new FileParser());
        }), outputParser);
    }

    public parseFiles(outputsParser: (childParser: this, index: number) => Promise<any>, ...indexes: number[]): Promise<this> {
        return this.parseOutputs("files", () => new Promise<FileParser>(resolve => {
            resolve(new FileParser());
        }), outputsParser, ...indexes);
    }
}

new FileParser()
    .create(parser => new Promise(resolve => {
        let input: FileInput = new FileInput();
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

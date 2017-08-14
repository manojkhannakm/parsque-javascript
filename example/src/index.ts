// import * as Promise from "bluebird";
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
    number: number;
    string: string;

    file: FileOutput;
    files: FileOutput[];
}

class FileContent extends Content {
    lines: string[];
}

class FileParser extends Parser {
    public constructor(private path: string = "") {
        super();
    }

    protected createInput(): Promise<Input> {
        return new Promise<Input>(resolve => {
            let input: FileInput = new FileInput();
            input.path = this.path;

            resolve(input);
        });
    }

    protected inputCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            let input: FileInput = this.input as FileInput;

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

    protected createOutput(): Promise<Output> {
        return new Promise<Output>(resolve => {
            resolve(new FileOutput());
        });
    }

    protected createContent(): Promise<Content> {
        return new Promise<Content>((resolve, reject) => {
            let content: FileContent = new FileContent();

            fs.readFile((this.input as FileInput).path, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                content.lines = data.split(/\s+/);

                resolve(content);
            });
        });
    }

    create(inputFactory?: (parser: Parser) => Promise<Input>,
           outputFactory?: (parser: Parser) => Promise<Output>,
           contentFactory?: (parser: Parser) => Promise<Content>): Promise<FileParser> {
        return super.create(inputFactory, outputFactory, contentFactory) as Promise<FileParser>;
    }

    public parseNumber(): Promise<FileParser> {
        return this.parseValue("number", parser => new Promise<any>(resolve => {
            resolve(parseInt((this.content as FileContent).lines[0]));
        })) as Promise<FileParser>;
    }

    public parseString(): Promise<FileParser> {
        return this.parseValue("string", parser => new Promise<any>(resolve => {
            resolve(this.content.lines[1]);
        })) as Promise<FileParser>;
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

import {Content, Input, Output, Parser} from "parsque-api";
import * as fs from "fs";

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
    strings: string[];

    file: FileOutput;
    files: FileOutput[];
}

class FileContent extends Content {
    lines: string[];
}

class FileParser extends Parser<FileInput, FileOutput, FileContent> {
    public constructor(private path?: string) {
        super();
    }

    protected createInput(): Promise<FileInput> {
        return new Promise<FileInput>(resolve => {
            let input: FileInput = new FileInput();

            if (this.path) {
                input.path = this.path;
            }

            resolve(input);
        });
    }

    protected inputCreated(): Promise<void> {
        return new Promise<void>(resolve => {
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

    public parseNumber(): Promise<FileParser> {
        return this.parseValue("number", parser => new Promise<number>(resolve => {
            resolve(parseInt(this.content.lines[0]));
        }));
    }

    public parseStrings(...indexes: number[]): Promise<FileParser> {
        return this.parseValues("strings", (parser, index) => new Promise<string>(resolve => {
            resolve(this.content.lines[1].split(/, /)[index]);
        }), ...indexes);
    }
}

new FileParser(FILE_1_PATH).create()
    .then(parser => parser.parseNumber())
    .then(parser => parser.parseStrings(0, 2))
    .then(parser => {
        console.log(JSON.stringify(parser.output, null, 2));
    })
    .catch(error => {
        console.error(error);
    });

import * as Promise from "bluebird";
import * as fs from "fs";
import {Parser} from "parsque";
import FileContent from "./file_content";
import FileInput from "./file_input";
import FileOutput from "./file_output";

const FILES_PATH: string = "files/";
const FILE_1_PATH: string = FILES_PATH + "file_1.txt";
const FILE_2_PATH: string = FILES_PATH + "file_2.txt";
const FILE_3_PATH: string = FILES_PATH + "file_3.txt";

export default class FileParser extends Parser<FileInput, FileOutput, FileContent> {
    protected createInput(): Promise<FileInput> {
        return new Promise<FileInput>(resolve => {
            let input: FileInput = new FileInput();
            input.path = FILE_1_PATH;

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

            resolve(input);
        });
    }

    protected createOutput(): Promise<FileOutput> {
        return new Promise<FileOutput>(resolve => {
            resolve(new FileOutput());
        });
    }

    protected createContent(): Promise<FileContent> {
        return new Promise<FileContent>((resolve, reject) => {
            fs.readFile(this.input.path, "utf-8", (error, data) => {
                if (error) {
                    reject(error);
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

    public parseFile(outputParser: (childParser: FileParser) => Promise<any>): Promise<this> {
        return this.parseOutput("file", () => new Promise<FileParser>(resolve => {
            resolve(new FileParser());
        }), outputParser);
    }

    public parseFiles(outputsParser: (childParser: FileParser, index: number) => Promise<any>,
                      ...indexes: number[]): Promise<this> {
        return this.parseOutputs("files", () => new Promise<FileParser>(resolve => {
            resolve(new FileParser());
        }), outputsParser, ...indexes);
    }
}

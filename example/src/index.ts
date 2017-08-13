import * as Promise from "bluebird";

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
    protected inputCreated(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }
}

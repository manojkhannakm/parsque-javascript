import {Content, Input, Output, Parser, ParserBuilder} from "parsque";
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
    line1: string;
    line2: string;
    line3: string;
    file: FileOutput;
    files: FileOutput[];
}

class FileContent extends Content {
    lines: string[];
}

class FileParser extends Parser {
    protected inputCreated(): void {
        super.inputCreated();

        let input = this.input as FileInput;

        let childInput = new FileInput();
        childInput.path = FILE_2_PATH;
        input.file = childInput;

        let childInputs: FileInput[] = [];

        for (let path of [FILE_1_PATH, FILE_2_PATH, FILE_3_PATH]) {
            let childInput = new FileInput();
            childInput.path = path;
            childInputs.push(childInput);
        }

        input.files = childInputs;
    }

    protected createOutput(): FileOutput {
        return new FileOutput();
    }

    protected createContent(): FileContent {
        let content = new FileContent();
        content.lines = fs.readFileSync((this.input as FileInput).path, "utf-8").split(/\s+/);

        return content;
    }

    parseLine1(): void {
        this.parseValue("line1", parser => (this.content as FileContent).lines[0]);
    }

    parseLine2(): void {
        this.parseValue("line2", parser => (this.content as FileContent).lines[1]);
    }

    parseLine3(): void {
        this.parseValue("line3", parser => (this.content as FileContent).lines[2]);
    }

    parseFile(outputParser: (parser: FileParser) => void): void {
        this.parseOutput("file", () => new FileParser(), outputParser);
    }

    parseFiles(outputsParser: (parser: FileParser, index: number) => void, ...indexes: number[]): void {
        this.parseOutputs("files", () => new FileParser(), outputsParser, ...indexes);
    }
}

let parser = new ParserBuilder(() => new FileParser())
    .withInputFactory(() => {
        let input = new FileInput();
        input.path = FILE_1_PATH;

        return input;
    })
    .build() as FileParser;
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

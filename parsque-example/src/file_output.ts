import {Output} from "parsque";

export default class FileOutput extends Output {
    public word: string;
    public words: string[];
    public file: FileOutput;
    public files: FileOutput[];
}

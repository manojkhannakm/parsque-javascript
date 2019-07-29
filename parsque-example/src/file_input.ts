import {Input} from "parsque";

export default class FileInput extends Input {
    public path: string;
    public file: FileInput;
    public files: FileInput[];
}

export default class Utils {
    static check(name: string, condition: any): void {
        let error: string = "";

        if (name) {
            error = name + " is invalid!";
        }

        if (!condition) {
            throw new Error(error);
        }
    }
}

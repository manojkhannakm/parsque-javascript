export default class Utils {
    static check(name: string, condition: any): void {
        let error = "";

        if (name) {
            error = name + " is invalid!";
        }

        if (!condition) {
            throw new Error(error);
        }
    }
}

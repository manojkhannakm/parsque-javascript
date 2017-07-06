export default class Utils {
    public static check(name: string, condition: any): void {
        let error: string = "";

        if (name) {
            error = name + " is invalid!";
        }

        if (!condition) {
            throw new Error(error);
        }
    }

    public static checkType(name: string, object: any, type: Function): void {
        Utils.check("type", type);

        Utils.check(name, object == null || object instanceof type);
    }
}

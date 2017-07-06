export default class Utils {
    public static check(name: string, condition: boolean): void {
        let error: string = "";

        if (name) {
            error = name + " is invalid!";
        }

        if (!condition) {
            throw new Error(error);
        }
    }

    public static checkNull(name: string, object: any): void {
        Utils.check(name, object != null);
    }

    public static checkType(name: string, object: any, type: Function): void {
        Utils.checkNull("type", type);

        Utils.check(name, object == null || object instanceof type);
    }
}

import { StringManipulator } from "./string-manipulator";



export class StringManipulator4 extends StringManipulator {
    private tempParam1: string;
    private tempParam2: number;

    constructor() {
        super();
        this.author = 'N/A';
    }

    private tempHelperMethod(str: string): string {
        return str;
    }

    public manipulateString(str: string): string {
        let someVariable = this.tempHelperMethod(str);
        return someVariable;
    }
}
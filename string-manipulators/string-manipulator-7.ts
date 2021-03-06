import { StringManipulator } from "./string-manipulator";



export class StringManipulator7 extends StringManipulator {
    private tempParam1: string;
    private tempParam2: number;

    constructor() {
        super();
        this.author = 'Shirley Li';
    }

    private tempHelperMethod(str: string): string {
        return str;
    }

    public manipulateString(str: string): string {
        let someVariable = this.tempHelperMethod(str);

        someVariable = someVariable.replace(/o/gi, "0");
        someVariable = someVariable.replace(/e/gi, "3");
        someVariable = someVariable.replace(/s/gi, "5");

        someVariable += " I like bananas.";

        return someVariable;
    }
}
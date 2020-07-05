import { StringManipulator } from "./string-manipulator";



export class StringManipulator9 extends StringManipulator {
    private tempParam1: string;
    private tempParam2: number;

    constructor() {
        super();
        this.author = 'Frederick Dempsey';
    }

    private tempHelperMethod(str: string): string {
        return str;
    }

    public manipulateString(str: string): string {
        let someVariable = this.tempHelperMethod(str);

        /*Make the string more UwU*/
        someVariable = someVariable.replace(/r/gi, "w");
        someVariable = someVariable.replace(/l/gi, "w");
        someVariable = someVariable.replace(/th /gi, "ff");
        someVariable = someVariable.replace(/ th/gi, "d");
        someVariable += "UwU";
        return someVariable;
    }
}
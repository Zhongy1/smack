import { StringManipulator } from "./string-manipulator";



export class StringManipulator3 extends StringManipulator {
    private tempParam1: string;
    private tempParam2: number;
    private nums:string = "0123456789";

    constructor() {
        super();
        this.author = 'Jaden';
    }

    private DARE(str: string): string {
        var txt = str;
        txt.replace(/420/g, " ");
        return txt;
    }

    private emphasize (str:string):string {
        return str.replace("cow", "COW");
    }

    private tempHelperMethod(str: string): string {
        return str;
    }

    public manipulateString(str: string): string {
        let someVariable = this.DARE(str);
        someVariable = this.emphasize(someVariable);
        someVariable = someVariable.concat(" :)");
        return someVariable;
    }
}
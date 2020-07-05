import { StringManipulator } from "./string-manipulator";



export class StringManipulator4 extends StringManipulator {
    private tempParam1: string;
    private tempParam2: number;

    constructor() {
        super();
        this.author = 'Alex';
    }

    private ensurePeriod(str: string): string {
        let strTemp = str;

        if(str.charAt(str.length-1) != '.'){
            strTemp += ".";
        }

        return strTemp;
    }

    public manipulateString(str: string): string {
        let strModified = this.ensurePeriod(str);
        
        strModified += " But that makes me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. (╯°□°）╯︵ ┻━┻";

        return strModified;
    }
}
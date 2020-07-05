import { StringManipulator } from "./string-manipulator";



export class StringManipulator1 extends StringManipulator {
    private vowels: string = 'aeiou';

    constructor() {
        super();
        this.author = 'Zhongyi Chen';
    }

    private generateDuplicateWithExtraVowel(str: string): string {
        let strTemp = '';
        for (let i = 0; i < str.length; i++) {
            let letter = str.charAt(i);
            if (this.vowels.indexOf(letter.toLowerCase()) >= 0) {
                strTemp += letter + letter.toLowerCase();
            }
            else {
                strTemp += letter;
            }
        }
        return strTemp;
    }

    public manipulateString(str: string): string {
        let strModified = str.replace(/\ a\ /g, ' aye ');

        strModified = strModified.replace(/\ throw\ /g, ' yeet ');

        strModified += ' ' + this.generateDuplicateWithExtraVowel(strModified);
        return strModified;
    }
}
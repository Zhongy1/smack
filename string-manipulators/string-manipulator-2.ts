import { StringManipulator } from "./string-manipulator";



export class StringManipulator2 extends StringManipulator {
    private consonant: string = 'bcdfghjklmnpqrstvwz';

    constructor() {
        super();
        this.author = 'Jeff Guo';
    }

    private codeLetter(str: string): string {
        let strTemp = '';
        for(let i = 0; i < str.length; i++){
            let letter = str.charAt(i);
            let numberCode = str.charCodeAt(i);
            if(this.consonant.indexOf(letter.toLowerCase()) >= 0){
                strTemp += numberCode;
            }
        }
        return strTemp;
    }

    public manipulateString(str: string): string {
        let letterNumber = str.replace(/\a\ /g, 'u');
        letterNumber = letterNumber.replace(/\e\ /g, 'o');
        letterNumber = letterNumber.replace(/\i\ /g, 'i');
        letterNumber = letterNumber.replace(/\o\ /g, 'e');
        letterNumber = letterNumber.replace(/\u\ /g, 'a');
        
        letterNumber += ' ' + this.codeLetter(letterNumber);
        return letterNumber;
    }
}
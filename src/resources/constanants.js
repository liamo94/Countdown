import { random } from './random';

export function getConstanants() {
    let constanants = [];
    for(let i = 0; i <= 66; i++) {
        if (i <= 1) {
            constanants.push('B');
        } else if (i > 1 && i <= 4) {
            constanants.push('C');
        } else if (i > 4 && i <= 11) {
            constanants.push('D');
        } else if (i > 11 && i <= 13) {
            constanants.push('F');
        } else if (i > 13 && i <= 16) {
            constanants.push('G');
        } else if (i > 16 && i <= 18) {
            constanants.push('H');
        } else if (i > 18 && i <= 19) {
            constanants.push('J');
        } else if (i > 19 && i <= 20) {
            constanants.push('K');
        } else if (i > 20 && i <= 25) {
            constanants.push('L');
        } else if (i > 25 && i <= 29) {
            constanants.push('M');
        } else if (i > 29 && i <= 37) {
            constanants.push('N');
        } else if (i > 37 && i <= 41) {
            constanants.push('P');
        } else if (i > 41 && i <= 42) {
            constanants.push('Q');
        } else if (i > 42 && i <= 51) {
            constanants.push('R');
        } else if (i > 51 && i <= 60) {
            constanants.push('S');
        } else if (i > 60 && i <= 69) {
            constanants.push('T');
        } else if (i > 69 && i <= 70) {
            constanants.push('V');
        } else if (i > 70 && i <= 71) {
            constanants.push('W');
        } else if (i > 71 && i <= 72) {
            constanants.push('X');
        } else if (i > 72 && i <= 73) {
            constanants.push('Y');
        } else if (i > 73 && i <= 74) {
            constanants.push('Z');
        }
    }
    return constanants;
}
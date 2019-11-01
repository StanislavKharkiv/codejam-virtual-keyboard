// const textOut = document.createElement('textarea');
// const keyboard = document.createElement('div');
// keyboard.className = 'keyboard';
const keyboardEn = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL'],
    ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER'],
    ['Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'UP', 'Shift'],
    ['Ctrl', 'Win', 'Alt', '', 'Alt', 'Win', 'Ctrl', 'left', 'down', 'right']
];
// for (let i = 0; i < keyboardEn.length; i++) {
//     let allKeyboard = {};
//     let row = allKeyboard['row' + i] = document.createElement('div');
//     row.classList.add('row');
//     keyboardEn[i].forEach(element => {
//         let span = document.createElement('span');
//         span.textContent = element;
//         span.className = `button btn_${element}`;
//         row.append(span);
//     });
//     keyboard.append(row);
// }
// document.body.append(keyboard);

class Keyboard {
    constructor(data) {
        this.keyboard = data;
        this.elements = {}
    }
    createBlockOut = () => {
        this.elements.textOut = document.createElement('textarea');
        this.elements.textOut.className = 'text_out';
        return this;
    }
    createBlockKeyboard = () => {
        this.elements.keyboard = document.createElement('div');
        this.elements.keyboard.className = 'keyboard';
        return this;
    }
    createKeyboard = () => {
        for (let i = 0; i < this.keyboard.length; i++) {
                let allKeyboard = {};
                let row = allKeyboard['row' + i] = document.createElement('div');
                row.classList.add('row');
                this.keyboard[i].forEach(element => {
                    let span = document.createElement('span');
                    span.textContent = element.toLowerCase();
                    span.className = `button btn_${element.toLowerCase()}`;
                    row.append(span);
                });
                this.elements.keyboard.append(row);
            }
            return this;
    }
    addToHtml = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.append(this.elements.textOut);
        wrapper.append(this.elements.keyboard);
        document.body.append(wrapper);
    }
}

const keyboardEnglish = new Keyboard(keyboardEn);
keyboardEnglish.createBlockOut().createBlockKeyboard().createKeyboard().addToHtml();

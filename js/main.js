// 1 en
// 2 ru
// 3 en shift
// 4 ru shift
const eventCode = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "Backslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
    ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "MetaLeft", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
]
const keyboardEn = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL'],
    ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER'],
    ['Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '&uarr;', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Win', 'Ctrl', '&larr;', '&darr;', '&rarr;']
];
const keyboardRu = [
    ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'DEL'],
    ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER'],
    ['Shift', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '&uarr;', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Win', 'Ctrl', '&larr;', '&darr;', '&rarr;']
];

class AddKeyboard {
    constructor(data, eventCode) {
        this.eventCode = eventCode;
        this.keyboard = data;
        this.elements = {}
    }
    createBlockOut = () => {
        this.elements.textOut = document.createElement('textarea');
        this.elements.textOut.className = 'text_out';
        this. elements.textOut.setAttribute('id', 'text-out');
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
            this.keyboard[i].forEach((element, index) => {
                let div = document.createElement('div');
                div.innerHTML = element.toLowerCase();
                div.className = `button btn_${element.toLowerCase()}`;
                div.setAttribute('data-code', this.eventCode[i][index]);
                row.append(div);
            });
            this.elements.keyboard.append(row);
        }
        return this;
    }
    addToHtml = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.setAttribute('id', 'wrapper');
        wrapper.append(this.elements.textOut);
        wrapper.append(this.elements.keyboard);
        document.body.append(wrapper);
    }
}
class ControlKeyboard {
    constructor(keyboardEn, keyboardRu) {
        this.lang = 'en';
        this.keyboardEn = keyboardEn;
        this.keyboardRu = keyboardRu;
    }
    render = () => {
        let wrapper = document.getElementById('wrapper');
        if (wrapper !== null) document.body.removeChild(wrapper);
        if (this.lang === 'en') this.keyboardEn.createBlockOut().createBlockKeyboard().createKeyboard().addToHtml();
        if (this.lang === 'ru') this.keyboardRu.createBlockOut().createBlockKeyboard().createKeyboard().addToHtml();
        return this
    }
    switchLang = () => {
        let pressed = new Set();
        document.addEventListener('keydown', (e) => {
            if (e.code === 'AltLeft' || e.code === 'ShiftLeft') {
                pressed.add(e.code);
            }
        })
        document.addEventListener('keyup', (e) => {
            if (pressed.has('AltLeft') && pressed.has('ShiftLeft')) {
                this.lang === 'ru' ? this.lang = 'en' : this.lang = 'ru';
                this.render().keyboardEventHandler();
            }
            pressed.delete(e.code);
        })

    }
    keyboardEventHandler = () => {
        const buttons = document.querySelectorAll('.button');
        document.body.onkeydown = (e) => {
            buttons.forEach(el => {
                if (e.code === el.getAttribute('data-code')) {
                    el.classList.add('button_active');
                    this.printLetters(el, buttons);
                    setTimeout(function () {
                        el.classList.remove('button_active');
                    }, 500)
                }
            });
        }
        return this
    }
    printLetters = (el, buttons) => {
        const outLetter = document.getElementById('text-out');
        if(el.textContent.length === 1) outLetter.textContent = outLetter.textContent + el.textContent;
        if(el.getAttribute('data-code') === 'Backspace') outLetter.textContent = (outLetter.textContent).slice(0, outLetter.textContent.length - 1);
        if(el.getAttribute('data-code') === 'CapsLock') {
            if(document.querySelector('.button[data-code=KeyA]').textContent === 'a') {
                document.querySelector('.button[data-code=CapsLock]').classList.add('caps-lock-on');
                buttons.forEach(function(el) {
                    if(el.getAttribute('data-code').includes('Key')) el.textContent = el.textContent.toUpperCase();
                })
            }else {
                document.querySelector('.button[data-code=CapsLock]').classList.remove('caps-lock-on');
                buttons.forEach(function(el) {
                    if(el.getAttribute('data-code').includes('Key')) el.textContent = el.textContent.toLowerCase();
                })
            } 
        }
    }
}
const keyboardEnglish = new AddKeyboard(keyboardEn, eventCode);
const keyboardRussian = new AddKeyboard(keyboardRu, eventCode);
const keyboardControl = new ControlKeyboard(keyboardEnglish, keyboardRussian);
keyboardControl.render().keyboardEventHandler().switchLang();

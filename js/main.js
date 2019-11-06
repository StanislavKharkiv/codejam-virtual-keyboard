function stringValidate(str) {
    const arr = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'Left', 'Right'];
    if (str === 'BracketLeft' || str === 'BracketRight') return true;
    for (let i = 0; i < arr.length; i++) {
        if (str.includes(arr[i])) return false;
    }
    return true;
}
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
        this.elements.textOut.setAttribute('id', 'text-out');
        return this;
    }
    createBlockKeyboard = () => {
        this.elements.keyboard = document.createElement('div');
        this.elements.keyboard.className = 'keyboard';
        this.elements.keyboard.setAttribute('id', 'keyboard');
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
        this.lang = localStorage.getItem('lang') || 'en';
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
                if (this.lang === 'ru') {
                    this.lang = 'en';
                    localStorage.setItem('lang', 'en')
                } else {
                    this.lang = 'ru';
                    localStorage.setItem('lang', 'ru')
                }
                let textOut = document.getElementById('text-out').textContent;
                this.render().keyboardEventHandler();
                document.getElementById('text-out').textContent = textOut;
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
                    }, 300)
                }
            });
        }
        this.printLettersMouse();
        return this
    }
    printLetters = (el, buttons) => {
        const outLetter = document.getElementById('text-out');
        if (el.textContent.length === 1) outLetter.textContent = outLetter.textContent + el.textContent;
        if (el.getAttribute('data-code') === 'Backspace') outLetter.textContent = (outLetter.textContent).slice(0, outLetter.textContent.length - 1);
        if (el.getAttribute('data-code') === 'CapsLock') {
            let buttonA = document.querySelector('.button[data-code=KeyA]').textContent;
            if (buttonA === 'a' || buttonA === 'ф') {
                document.querySelector('.button[data-code=CapsLock]').classList.add('caps-lock-on');
                buttons.forEach(function (el) {
                    //if (el.getAttribute('data-code').includes('Key')) el.textContent = el.textContent.toUpperCase();
                    if (stringValidate(el.getAttribute('data-code'))) el.textContent = el.textContent.toUpperCase();
                })
            } else {
                document.querySelector('.button[data-code=CapsLock]').classList.remove('caps-lock-on');
                buttons.forEach(function (el) {
                    if (el.getAttribute('data-code').includes('Key')) el.textContent = el.textContent.toLowerCase();
                })
            }
        }
    }
    printLettersMouse = () => {
        const keyboard = document.getElementById('keyboard');
        const outLetter = document.getElementById('text-out');
        const buttons = document.querySelectorAll('.button');
        keyboard.addEventListener('click', e => {
            let dataAttribute = e.target.getAttribute('data-code');
            if (e.target.hasAttribute('data-code')) {
                if (dataAttribute.includes('Key')) outLetter.textContent = outLetter.textContent + e.target.textContent;
                if (dataAttribute === 'Backspace') outLetter.textContent = (outLetter.textContent).slice(0, outLetter.textContent.length - 1);
                if (dataAttribute === 'CapsLock') {
                    let buttonA = document.querySelector('.button[data-code=KeyA]').textContent;
                    if (buttonA === 'a' || buttonA === 'ф') {
                        document.querySelector('.button[data-code=CapsLock]').classList.add('caps-lock-on');
                        buttons.forEach(function (el) {
                            if (el.getAttribute('data-code').includes('Key')) el.textContent = el.textContent.toUpperCase();
                        })
                    } else {
                        document.querySelector('.button[data-code=CapsLock]').classList.remove('caps-lock-on');
                        buttons.forEach(function (el) {
                            if (el.getAttribute('data-code').includes('Key')) el.textContent = el.textContent.toLowerCase();
                        })
                    }
                }
            }
        })
    }
}
const keyboardEnglish = new AddKeyboard(keyboardEn, eventCode);
const keyboardRussian = new AddKeyboard(keyboardRu, eventCode);
const keyboardControl = new ControlKeyboard(keyboardEnglish, keyboardRussian);
keyboardControl.render().keyboardEventHandler().switchLang();

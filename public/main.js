class Document {
    constructor(value = '') {
        this.value = value;
    }
}

let socket;
let currentDocument = new Document();

addEventListener('DOMContentLoaded', init);

function init() {
    socket = io();
    socket.on('FILE_EDIT', function (msg) {
        console.log(msg)
    })
    getMD();
    getParsedMD();
    let target = document.querySelector(".rhs");
    let sauce = document.querySelector(".lhs");
    sauce.addEventListener('scroll', (e) => {
        target.scrollTop = e.target.scrollTop;
        target.scrollLeft = e.target.scrollLeft;
    })
}

function getMD() {
    fetch('http://localhost:3000/markdown-raw')
        .then((response) => response.text())
        .then((data) => {
            document.querySelector('.lhs').value = data.toString();
            // console.log(document.querySelector('.lhs'))
        });
}

function getParsedMD() {
    fetch('http://localhost:3000/markdown-parsed')
        .then((response) => response.text())
        .then((data) => {
            document.querySelector('.rhs').innerHTML = data;
            // console.log(data)
        });
}

function handleLowbarClick(e, MSG) {
    switch (MSG) {
        case 'NEW_FILE':
            // socket.emit('NEW_FILE', 'damnn');
            // sol 1 but inefficient
            // document.querySelector('textarea.display.lhs').style.display = 'none'
            // let textAreaTemplate = document.querySelector("#textAreaTemplateID");
            // let clone = textAreaTemplate.content.cloneNode(true);
            // let mainParent = document.querySelector('.main')
            // mainParent.insertBefore(clone, mainParent.children[2]);

            // sol2 effecient relatively
            const textarea = document.querySelector('textarea');
            currentDocument = new Document();
            textarea.value = '';
            console.log(currentDocument, 'currentDocument');
            break;
        case 'NEW_DIR':

            break;
        case 'NEW_RELOAD_TREE':

            break;
        case 'COLLAPSE_TREE':

            break;

        default:
            break;
    }
}


function onTextareaChange(e) {
    currentDocument.value = e.target.value;
    socket.emit('FILE_EDIT', JSON.stringify(currentDocument));
    console.log(currentDocument,'currentDocument')
}



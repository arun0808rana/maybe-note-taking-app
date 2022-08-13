class Document {
    constructor(value = '', filename = 'Untitled') {
        this.value = value;
        this.filename = filename;
        this.uuid = ''
    }
}

let socket;
let currentDocument = new Document();

addEventListener('DOMContentLoaded', init);

function init() {
    socket = io();
    socket.on('FILE_WRITE', function (msg) {
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
            currentDocument = new Document();
            currentDocument.uuid = uuidv4();
            const textarea = document.querySelector('textarea');
            const documentTitle = document.querySelector('.doc-title');
            documentTitle.value = currentDocument.filename;
            textarea.focus();
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
    socket.emit('FILE_WRITE', JSON.stringify(currentDocument));
    console.log(currentDocument, 'currentDocument')
}

function onTitleInput(e) {
    currentDocument.filename = e.target.value;
    socket.emit('FILE_WRITE', JSON.stringify(currentDocument));
    console.log(currentDocument, 'currentDocument')
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
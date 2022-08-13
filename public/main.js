addEventListener('DOMContentLoaded', init);

function init() {
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


var outputArea;

function initializeInputBox() {
    $('#input').keypress((e) => {
        if (e.which == 13 && e.shiftKey) {
            let str = $('#input').val();
            postStringToServer(str);
        }
    })
}

function postStringToServer(str) {
    let data = {
        string: str
    }
    $.ajax({
        url: `api/string-manipulator`,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: (stringOutcomes) => {
            processOutcomes(stringOutcomes);
        }
    });
}

async function processOutcomes(stringOutcomes) {
    let stringBoxes = [];
    Object.keys(stringOutcomes).forEach(key => {
        stringBoxes.push(generateStringBoxElement(stringOutcomes[key]));
    });
    outputArea.innerHTML = '';
    for (let i = 0; i < stringBoxes.length; i++) {
        await animateIntoView(stringBoxes[i]);
        await delay(100);
    }
}

function animateIntoView(stringBox) {
    $(stringBox).css({ 'margin-left': '-33.333%', opacity: '0' });
    outputArea.appendChild(stringBox);
    return $(stringBox).css({ 'margin-left': '-33.333%', opacity: '0' }).animate({ 'margin-left': '0%', opacity: '1' }, 500).promise();
}

function delay(time) {
    return new Promise(resolve => { setTimeout(() => resolve(''), time); });
}

function generateStringBoxElement(outcome) {
    let stringBoxWrapper = document.createElement('div');
    stringBoxWrapper.setAttribute('class', 'string-box-wrapper');
    let stringBox = document.createElement('div');
    stringBox.setAttribute('class', 'string-box');
    stringBox.innerHTML = outcome.result;
    stringBoxWrapper.appendChild(stringBox);
    let authorLabel = document.createElement('div');
    authorLabel.setAttribute('class', 'author-label');
    authorLabel.innerHTML = '// by: ' + outcome.author;
    stringBoxWrapper.appendChild(authorLabel);
    return stringBoxWrapper;
}

$(document).ready(() => {
    outputArea = document.getElementById('output');
    initializeInputBox();
});
let quoteArray = [];
let index = 0;
let textPosition = 0;
let flag = true;
let destination = document.getElementById("typedtext");

window.addEventListener('load', typeWriter);

function loadQuote() {

    const url = "https://api.adviceslip.com/advice";

    fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                console.log(response.status);
        })
        .then(data => {
            quoteArray[index] = data.slip.advice;
        })
}

function typeWriter() {
    if (flag) {
        loadQuote();
        quoteArray[index] += ' ';
        flag = false;
    }

    destination.innerHTML = quoteArray[index].substring(0, textPosition) + '<span>\u25AE</span>';

    if (textPosition++ != quoteArray[index].length) {
        setTimeout(typeWriter, 100);
    } else {
        quoteArray[index] = ' ';
        setTimeout(typeWriter, 5000 - 2000);
        textPosition = 0;
        flag = true;
    }
}
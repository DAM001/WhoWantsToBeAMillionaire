const payments = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
let currentQuestion = 1;
let correctAnswer = "";

window.onload = function() {
    const parentElement = document.getElementById('payment');

    payments.reverse().forEach((value, index) => {
        const div = document.createElement('div');
        div.className = 'payment-container';
        div.id = `payment-${payments.length - index}`;

        let formattedValue = value === 1000000 ? '$1 MILLION' : `$${value.toLocaleString()}`;
        div.textContent = formattedValue;

        parentElement.append(div);

        if (index % 5 === 0) {
            div.classList.add('payment-fix');
        }
    });

    highlightPaymentAtIndex(payments.length - currentQuestion);
    playSoundMusic();

    getQuestion();
}

function highlightPaymentAtIndex(indexToHighlight) {
    const paymentDivs = document.querySelectorAll('.payment-container');
    const currentPayment = document.getElementById('current-payment');

    paymentDivs.forEach((div, index) => {
        div.classList.remove('payment-highlight');
        div.classList.remove('payment-done');

        if (index === indexToHighlight) {
            div.classList.add('payment-highlight');
            currentPayment.textContent = div.textContent;
        }

        if (index > indexToHighlight) {
            div.classList.add('payment-done');
        }
    });
}

function createQuestion(question, answers) {
    const currentPayment = document.getElementById("current-payment").cloneNode(true);
    const questionElement = document.getElementById("question");
    questionElement.innerHTML = '';
    questionElement.appendChild(currentPayment);
    questionElement.innerHTML += question;

    correctAnswer = answers[0];
    const shuffledAnswers = shuffleArray(answers);

    const answerElements = document.querySelectorAll(".answer");
    for (let i = 0; i < answerElements.length; i++) {
        answerElements[i].onclick = function() {
            select(shuffledAnswers[i]);
        };
        answerElements[i].innerHTML = shuffledAnswers[i];
        answerElements[i].style.backgroundColor = "var(--background-color)";
    }

    highlightPaymentAtIndex(payments.length - currentQuestion);
}

function select(answer) {
    let answerElem;
    const answerElements = document.querySelectorAll(".answer");
    for (let i = 0; i < answerElements.length; i++) {
        answerElements[i].onclick = null;
        if (answerElements[i].innerHTML == answer) {
            answerElem = answerElements[i];
            answerElements[i].style.backgroundColor = "var(--theme-selected)";
        }
    }

    stopSoundMusic();

    const length = playSoundSelect();
    setTimeout(function() {
        selectAnimations(answer, answerElem);
    }, length);
}

function selectAnimations(answer, answerElem) {
    let length = 0;
    if (answer == correctAnswer) {
        answerElem.style.backgroundColor = "var(--theme-good)";
        length = playSoundWin();

    } else {
        answerElem.style.backgroundColor = "var(--theme-bad)";
        length = playSoundLose();

        const answerElements = document.querySelectorAll(".answer");
        for (let i = 0; i < answerElements.length; i++) {
            if (answerElements[i].innerHTML == correctAnswer) {
                answerElem = answerElements[i];
                answerElements[i].style.backgroundColor = "var(--theme-good)";
            }
        }
    }

    setTimeout(function() {
        selectNextRound(answer);
    }, length);
}

function selectNextRound(answer) {
    if (answer == correctAnswer) {
        currentQuestion++;
    } else {
        currentQuestion = 1;
    }

    getQuestion();
    playSoundMusic();
}




function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
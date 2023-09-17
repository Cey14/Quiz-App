const questions = [
    {
        question: "Bir çiftçinin 17 koyunu vardı. Sürüde salgın hastalık oldu, dokuzu ağır hastalandı, diğerleri öldü. Çiftçinin kaç koyunu var?",
        answers: [
            { text:"17", correct: false},
            { text:"9", correct: true},
            { text:"8", correct: false},
            { text:"0", correct: false}
        ]
    },
    {
        question: "Doktorunuz size 3 hap verir ve bunları yarımşar saat arayla almanızı tavsiye ederse, ilaçların tamamını bitirmeniz ne kadar sürer?",
        answers: [
            { text:"2", correct: false},
            { text:"1,5", correct: false},
            { text:"1", correct: true},
            { text:"3", correct: false}
        ]
    },
    {
        question: "Bazı aylar 30, bazıları 31 çeker; kaç ayda 28 gün vardır?",
        answers: [
            { text:"12", correct: true},
            { text:"3", correct: false},
            { text:"4", correct: false},
            { text:"1", correct: false}
        ]
    },
    {
        question: "Havada uçan memeli hayvan hangisidir?",
        answers: [
            { text:"Leylek", correct: false},
            { text:"Karga", correct: false},
            { text:"Yarasa", correct: true},
            { text:"Kartal", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "İleri"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo      = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach( answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    } );
    nextButton.style.display = "block"

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz;
    }
})

startQuiz()
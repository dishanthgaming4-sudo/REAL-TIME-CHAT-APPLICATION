const questions = [
    {
        question: "What is Artificial Intelligence (AI)?",
        answers: [
            { text: "A programming language used for websites", correct: false },
            { text: "A system that can perform tasks requiring human intelligence", correct: true },
            { text: "A hardware component for computers", correct: false },
            { text: "A type of internet service", correct: false }
        ]
    },
    {
        question: "Which of the following is an example of Machine Learning?",
        answers: [
            { text: "A calculator performing arithmetic", correct: false },
            { text: "A computer following fixed rules only", correct: false },
            { text: "An email spam filter that improves over time", correct: true },
            { text: "A printer connected to a computer", correct: false }
        ]
    },
    {
        question: "Which AI technology allows computers to understand human language?",
        answers: [
            { text: "Computer Vision", correct: false },
            { text: "Robotics", correct: false },
            { text: "Natural Language Processing (NLP)", correct: true },
            { text: "Cloud Computing", correct: false }
        ]
    },
    {
        question: "What is the main purpose of Neural Networks in AI?",
        answers: [
            { text: "To store large amounts of data", correct: false },
            { text: "To design websites", correct: false },
            { text: "To mimic the way the human brain learns", correct: true },
            { text: "To connect computers to the internet", correct: false }
        ]
    },
    {
        question: "Which of the following is a real-world application of AI?",
        answers: [
            { text: "Manual typewriter", correct: false },
            { text: "Voice assistants like Alexa or Siri", correct: true },
            { text: "USB cable", correct: false },
            { text: "Desktop wallpaper", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

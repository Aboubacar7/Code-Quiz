var quizQuestions = [
    {
        question: "Loops can execute a block of code as long as a specified condition______.",
        choices: ["1. is true", "2. is false", "3. is a string", "4. is a number"],
        correct: "1. is true"
    },
    {
        question: "The catch statement defines a code block ______ ",
        choices: ["1. to try", "2. to run", "3. to run regardless of the result", "4. to handle any error"],
        correct: "4. to handle any error"
    },
    {
        question: "Use else if to specify a new condition to test,______ ",
        choices: ["1. if the same condition is false ", "2. if a specified condition is true", "3. if the first condition is false", "4. if the first condition is true"],
        correct: "3. if the first condition is false"
    },
]


var startBtn = document.getElementById('start-btn')
var startContainer = document.querySelector('.start-container')
var quizContainer = document.querySelector('.quiz-container')
var scoreContainer = document.querySelector('.score-container')
var timeContainer = document.querySelector('.time-container')
var highscoresBtn = document.getElementById('#highscore-btn')

highscoresBtn.addEventListener('click', function() {
    clearInterval(timeInterval)
    showhighscore()
})


var quizIndex = 0
var score = 0
var timer = 100



startBtn.addEventListener('click', startQuiz)
startBtn.setAttribute("style", 'background-color: dodgerblue')
function startQuiz() {
    startContainer.classList.add('hide')
    startTimer()
    showQuestions()
}

function startTimer() {
    timeContainer.textContent = "Time: " + timer

    var timeInterval = setInterval(function () {
        timer--
        timeContainer.textContent = "Time: " + timer
        if (timer === 0 || quizIndex > quizQuestions.length - 1) {
            clearInterval(timeInterval)
            endQuiz()
        }
        highscoresBtn.addEventListener('click', function () {
            clearInterval(timeInterval)
            showhighscore()
        })
    }, 1000)
}


function endQuiz() {
    console.log('quiz is over')
    quizContainer.innerHTML = "Quiz is Over  "

    var userInput = document.createElement('input')
    userInput.setAttribute('placeholder', 'Name', "style")

    var submitBtn = document.createElement('button')
    submitBtn.textContent = 'SUBMIT'
    submitBtn.setAttribute("id", "submit")

    quizContainer.append(userInput, submitBtn)

    submitBtn.addEventListener('click', function () {
        var userObj = {

            name: userInput.value,
            highscore: score
        }
        localStorage.setItem('userObj', JSON.stringify(userObj))
        showhighscore()
    })

}
function showhighscore() {
    // document.querySelector("#submit").style.display = "none"
    scoreContainer.textContent = ''
    startContainer.classList.add('hide')
    quizContainer.classList.add('hide')
    var highscore = document.querySelector(".score");

    var sc = JSON.parse(localStorage.getItem("userObj"));
    console.log(sc)
    highscore.textContent = sc.name + " " + sc.highscore
    var button0 = document.createElement('button');
    button0.textContent = "Go Back";
    button0.id = "#return to quiz";

    var button1 = document.createElement('button');
    button1.textContent = "Clear Highscore";
    button1.id = "#clear";

    scoreContainer.append(button0, button1);
    button0.addEventListener("click", function () {
        location.reload()
    })
    button1.addEventListener("click", function () {
        clearInterval(highscore);
        sc.classList.add('hide')
    })

}

function showQuestions() {
    quizContainer.textContent = ''
    if (quizIndex > quizQuestions.length - 1) {
        return
    }
    var questionEl = document.createElement('h2')
    questionEl.textContent = quizQuestions[quizIndex].question

    quizContainer.append(questionEl)

    for (var i = 0; i < quizQuestions[quizIndex].choices.length; i++) {
        var choiceEl = document.createElement('button')
        var wrapper = document.createElement('div')
        choiceEl.textContent = quizQuestions[quizIndex].choices[i]
        choiceEl.setAttribute("style", 'background-color: dodgerblue')
        wrapper.append(choiceEl)
        quizContainer.append(wrapper)

        choiceEl.addEventListener('click', function (event) {
            if (event.target.textContent === quizQuestions[quizIndex].correct) {

                console.log('correct')
                score += 33
            } else {

                console.log('incorrect')
                timer -= 20
            }

            quizIndex++
            showQuestions()
        })
    }
} 
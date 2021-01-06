const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const restartButton = document.getElementById('restart-btn')
const returnButton = document.getElementById('return-btn')
const startText = document.getElementById('start-text')
const startImage = document.getElementById('robot-start')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const questionCounter = document.getElementById('right-answers')
const passEndPage = document.getElementById("pass-page")
const failEndPage = document.getElementById("fail-page")

let shuffledQuestions, currentQuestionIndex
let countRightAnswers = 0

startButton.addEventListener('click', startGame)
returnButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  startText.classList.add('hide')
  startImage.classList.add('hide')
  restartButton.classList.add('hide')
  returnButton.classList.add('hide')
  passEndPage.classList.add('hide')
  failEndPage.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
  countRightAnswers = 0;
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    if (countRightAnswers > 7) {
      returnButton.classList.remove('hide')
      passEndPage.classList.remove('hide')
      questionContainerElement.classList.add('hide')
    }
    else{
      restartButton.classList.remove('hide')
      failEndPage.classList.remove('hide')
      questionContainerElement.classList.add('hide')
    }
  }
  document.getElementById('right-answers').innerHTML = countRightAnswers;
    if (selectedButton.dataset = correct) {
    countRightAnswers++;
    }  
}


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What do you call the general average calculated at the end of the school year.',
    answers: [
      { text: 'Total Grade Point Average', correct: false },
      { text: 'Cumulative Grade Point Average', correct: true },
      { text: 'Term Grade Point Average', correct: false },
      { text: 'Collective Grade Point Average', correct: false }
    ]
  },
  {
    question: 'Which among the following non-academic courses are not marked either as a Pass (P) or Fail (R)?',
    answers: [
      { text: 'CSBLIFE', correct: false },
      { text: 'CSBGRAD', correct: false },
      { text: 'PEONEPF', correct: true },
      { text: 'NSTP', correct: false }
    ]
  },
  {
    question: 'Exceeding the maximum allowable absences will result in an automatic failing grade regardless of academic performance is also known as? ',
    answers: [
      { text: 'Failure Due to Excessive Absences or FDA', correct: true },
      { text: 'Failure Due to Multiple Absences or FDMA', correct: false },
      { text: 'Unapproved Absences', correct: false },
      { text: 'Major', correct: false }
    ]
  },
  {
    question: 'Which among the following qualifications are not needed for you to be part of the Dean’s List?',
    answers: [
      { text: 'Take a total load of at least 15 academic units', correct: false },
      { text: 'No record of a major offense or academic dishonesty', correct: false },
      { text: 'No grade below 3.000 in an academic course', correct: true },
      { text: 'No failure or R in any course, no deferred grade', correct: false }
    ]
  },
  {
    question: 'Which among the following equivalent percentages equate to a 3.0?',
    answers: [
      { text: '88', correct: false },
      { text: '89', correct: true },
      { text: '85', correct: false },
      { text: '93', correct: false }
    ]
  },
  {
    question: 'The right to be excused from missed activities in class is also known as?',
    answers: [
      { text: 'Failure Due to Excessive Absences or FDA', correct: false },
      { text: 'Approved Absences', correct: true },
      { text: 'Major Offense', correct: false },
      { text: 'Unapproved Absences', correct: false }
    ]
  },
  {
    question: 'What do you call the general average you get at the end of every term?',
    answers: [
      { text: 'Total Grade Point Average', correct: false },
      { text: 'Cumulative Grade Point Average', correct: false },
      { text: 'Term Grade Point Average', correct: true },
      { text: 'Collective Grade Point Average', correct: false }
    ]
  },
  {
    question: 'Which among the following is NOT equivalent percentages equate to a 2.0?',
    answers: [
      { text: '85', correct: true },
      { text: '81', correct: false },
      { text: '84', correct: false },
      { text: '80', correct: false }
    ]
  },
  {
    question: 'What minimum load of academic units do you need to be part of the Dean’s List?',
    answers: [
      { text: '13', correct: false },
      { text: '10', correct: false },
      { text: '12', correct: true },
      { text: '15', correct: false }
    ]
  },
  {
    question: 'What do you call absences and missed activities that are not excusable?',
    answers: [
      { text: 'Failure Due to Excessive Absences or FDA', correct: false },
      { text: 'Approved Absences', correct: false },
      { text: 'Major Offense', correct: false },
      { text: 'Unapproved Absences', correct: true }
    ]
  },
]
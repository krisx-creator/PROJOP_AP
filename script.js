const pytania = [
  {
      pytanie: "W którym roku była bitwa pod termopilami?",
      odp: [
        { text: "470 p.n.e.", correct: false},
        { text: "480 p.n.e.", correct: true},
        { text: "477 p.n.e.", correct: false},
        { text: "486 p.n.e.", correct: false},
      ]
  },
  {
    pytanie: "Jak nazywał się dowódca który dowodził wojskami po stronie Grecji w bitwie pod termopilami?",
    odp: [
      { text: "Leonidas", correct: true},
      { text: "Kserkses", correct: false},
      { text: "Temistokles", correct: false},
      { text: "Perykles", correct: false},
    ]

  },
  {
  pytanie: "Najważniejszy bóg Grecki",
  odp: [
    { text: "Posejdon", correct: false},
    { text: "Ares", correct: false},
    { text: "Afrodyta", correct: false},
    { text: "Zeus", correct: true},
  ]
  }
];

const pytanieEl = document.getElementById("pytanie");
const przyciskOdp = document.getElementById("wybierzodp");
const przyciskDalej = document.getElementById("dalej");

let currentquestionindex = 0;

function startQuiz() {
  currentquestionindex = 0;
  przyciskDalej.innerHTML = "Dalej";
  showQuestion();
}

function showQuestion() {
  reset();
  let currentQuestion = pytania[currentquestionindex];
  let nrPytania = currentquestionindex + 1;
  pytanieEl.innerHTML = nrPytania + ". " + currentQuestion.pytanie;

  currentQuestion.odp.forEach(odp => {
    const button = document.createElement("button");
    button.innerHTML = odp.text;
    button.classList.add("btn");
    wybierzodp.appendChild(button);
    if(odp.correct) {
      button.dataset.correct = odp.correct;
    }
    
    button.addEventListener("click", slelectanswer);
    
  });
}

function slelectanswer(e) {
  const selectedbtn = e.target;
  const czyPoprawna = selectedbtn.dataset.correct === "true";
  if(czyPoprawna) {
    selectedbtn.classList.add("correct");
  }
  else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(wybierzodp.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  przyciskDalej.style.display = "block";
}

  function reset() {
    przyciskDalej.style.display="none";
    while(wybierzodp.firstChild) {
      wybierzodp.removeChild(wybierzodp.firstChild);
    }
  }

  function nastepnyprzycisk() {
    currentquestionindex++;
    if(currentquestionindex < pytania.length) {
      showQuestion();
    }
    
  }

  przyciskDalej.addEventListener("click", ()=>{  
    if(currentquestionindex < pytania.length) {
      nastepnyprzycisk();
    } 
    else {
      startQuiz();
    }
  });
  
startQuiz();





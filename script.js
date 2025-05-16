// Lista pytań quizu
const questions = [
  { 
      questionText: "W którym roku była bitwa pod Termopilami?", // Pytanie nr 1
      answers: [
        { text: "470 p.n.e.", correct: false},
        { text: "480 p.n.e.", correct: true},
        { text: "477 p.n.e.", correct: false},
        { text: "486 p.n.e.", correct: false},
      ]
  },
  {
    questionText: "Jak nazywał się dowódca, który dowodził wojskami Sparty w bitwie pod Termopilami?", // Pytanie nr 2
    answers: [
      { text: "Leonidas", correct: true},
      { text: "Kserkses", correct: false},
      { text: "Temistokles", correct: false},
      { text: "Perykles", correct: false},
    ]
  },
  {
    questionText: "Najważniejszy bóg grecki", // Pytanie nr 3
    answers: [
      { text: "Posejdon", correct: false},
      { text: "Ares", correct: false},
      { text: "Afrodyta", correct: false},
      { text: "Zeus", correct: true},
    ]
  },
  {
    questionText: "Kto był twórcą filozofii sokratycznej w starożytnej Grecji?", // Pytanie nr 4
    answers: [
      { text: "Sokrates", correct: true},
      { text: "Platon", correct: false},
      { text: "Arystoteles", correct: false},
      { text: "Pitagoras", correct: false},
    ]
  },
  {
    questionText: "W jakim mieście odbyły się słynne igrzyska olimpijskie w starożytnej Grecji?", // Pytanie nr 5
    answers: [
      { text: "Ateny", correct: false},
      { text: "Olimpia", correct: true},
      { text: "Rodos", correct: false},
      { text: "Sparta", correct: false},
    ]
  },
  {
    questionText: "Jak nazywało się główne miasto-państwo znane z demokracji?", // Pytanie nr 6 
    answers: [
      { text: "Sparta", correct: false},
      { text: "Ateny", correct: true},
      { text: "Korynt", correct: false},
      { text: "Teby", correct: false},
    ]
  },
  {
    questionText: "Kto był bogiem wojny w mitologii greckiej?", // Pytanie nr 7 
    answers: [
      { text: "Zeus", correct: false},
      { text: "Ares", correct: true},
      { text: "Apollo", correct: false},
      { text: "Hefajstos", correct: false},
    ]
  },
  {
    questionText: "Jak nazywał się poemat epicki Homera o wojnie trojańskiej?", // Pytanie nr 8 
    answers: [
      { text: "Odyseja", correct: false},
      { text: "Iliada", correct: true},
      { text: "Eneida", correct: false},
      { text: "Argonautica", correct: false},
    ]
  },
  {
    questionText: "W jakim mieście znajdowała się Wyrocznia Delficka?", // Pytanie nr 9 
    answers: [
      { text: "Ateny", correct: false},
      { text: "Delfy", correct: true},
      { text: "Sparta", correct: false},
      { text: "Olimpia", correct: false},
    ]
  },
  {
    questionText: "Jak nazywał się teatr na wzgórzu Akropolu w Atenach?", // Pytanie nr 10 
    answers: [
      { text: "Teatr Dionizosa", correct: true},
      { text: "Teatr Apollina", correct: false},
      { text: "Teatr Zeusa", correct: false},
      { text: "Teatr Posejdona", correct: false},
    ]
  }
];

// Pobieranie elementów DOM
const questionElement = document.getElementById("pytanie");
const answerContainer = document.getElementById("wybierzodp");
const nextButton = document.getElementById("dalej");
const restartButton = document.getElementById("restart");

// Sprawdzanie, czy elementy DOM istnieją
if (!questionElement || !answerContainer || !nextButton || !restartButton) {
  console.error("Brak jednego lub więcej elementów DOM. Sprawdź ID: pytanie, wybierzodp, dalej, restart.");
} else {
  console.log("Wszystkie elementy DOM zostały poprawnie załadowane.");
}

// Indeks bieżącego pytania
let currentQuestionIndex = 0;
let correctCount = 0; // Licznik poprawnych odpowiedzi
let userAnswers = []; // Tablica przechowująca odpowiedzi użytkownika

// Funkcja rozpoczynająca quiz
function startQuiz() {
  console.log("Rozpoczynanie quizu...");
  currentQuestionIndex = 0;
  correctCount = 0;
  userAnswers = []; // Resetowanie odpowiedzi użytkownika
  nextButton.innerHTML = "Dalej";
  restartButton.style.display = "block"; // Zapewnienie widoczności przycisku restart
  showQuestion();
}

// Funkcja wyświetlająca pytania
function showQuestion() {
  console.log("Wyświetlanie pytania:", questions[currentQuestionIndex]);
  reset();
  let currentQuestion = questions[currentQuestionIndex]; // Pobieranie bieżącego pytania
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.questionText; // Wyświetlanie pytania

  // Tworzenie przycisków odpowiedzi
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text; // Tekst odpowiedzi
    button.classList.add("btn");
    answerContainer.appendChild(button);
    // Dodanie atrybutu dla poprawnej odpowiedzi
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }

    // Dodanie nasłuchiwania kliknięcia przycisku
    button.addEventListener("click", selectAnswer);
  });
}

// Funkcja obsługująca wybór odpowiedzi
function selectAnswer(e) {
  const selectedButton = e.target; // Pobieranie klikniętego przycisku
  const isCorrect = selectedButton.dataset.correct === "true"; // Sprawdzanie poprawności odpowiedzi
  if(isCorrect) {
    selectedButton.classList.add("correct"); // Dodanie klasy dla poprawnej odpowiedzi
    correctCount++; // Zwiększenie licznika poprawnych odpowiedzi
  } else {
    selectedButton.classList.add("incorrect"); // Dodanie klasy dla błędnej odpowiedzi
  }

  // Zapisanie odpowiedzi użytkownika
  userAnswers.push({
    answer: selectedButton.innerHTML,
    correct: isCorrect
  });

  // Wyłączenie przycisków po wyborze odpowiedzi
  Array.from(answerContainer.children).forEach(button => {
    button.disabled = true; // Blokada ponownego kliknięcia
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  // Pokazanie przycisku Dalej
  nextButton.style.display = "block";
}

// Funkcja resetująca stan quizu
function reset() {
  nextButton.style.display = "none";
  while(answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

// Funkcja przechodząca do następnego pytania
function nextQuestion() {
  currentQuestionIndex++; // Przejście do następnego pytania
  if(currentQuestionIndex < questions.length) {
    showQuestion(); // Wyświetlenie kolejnego pytania, jeśli istnieje
  } else {
    showResult(); // Wyświetlenie wyniku, jeśli brak pytań
  }
}

// Funkcja wyświetlająca wynik quizu
function showResult() {
  reset(); // Czyszczenie odpowiedzi, aby nie pokazywać przycisków z ostatniego pytania
  let message;
  if (correctCount === questions.length) {
    message = "Brawo! Perfekcyjny wynik!";
  } else if (correctCount > questions.length / 2) {
    message = "Świetnie! Prawie idealnie!";
  } else {
    message = "Nieźle! Spróbuj jeszcze raz!";
  }

  // Wyświetlanie wyniku
  questionElement.innerHTML = `<h3>${message}</h3>Wynik: ${correctCount}/${questions.length} poprawnych`;

  // Wyświetlanie odpowiedzi użytkownika
  let answersHTML = "<h4>Twoje odpowiedzi:</h4><ul>";
  userAnswers.forEach((answer, index) => {
    answersHTML += `<li>${index + 1}. ${answer.answer} - ${answer.correct ? "Poprawna" : "Błędna"}</li>`;
  });
  answersHTML += "</ul>";

  questionElement.innerHTML += answersHTML;
  nextButton.innerHTML = "Zacznij od nowa";
  nextButton.style.display = "block";
  restartButton.style.display = "block"; // Zapewnienie widoczności przycisku restart
}

// Obsługa kliknięcia przycisku Dalej
nextButton.addEventListener("click", () => {  
  if(currentQuestionIndex < questions.length) {
    nextQuestion();
  } else {
    startQuiz(); // Ponowne uruchomienie quizu
  }
});

// Obsługa kliknięcia przycisku Restart
restartButton.addEventListener("click", startQuiz);

// Rozpoczęcie quizu po załadowaniu strony
startQuiz();

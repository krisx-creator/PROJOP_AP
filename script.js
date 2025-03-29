// pytania z których składa się cały quiz
const pytania = [
  { 
      pytanie: "W którym roku była bitwa pod termopilami?", // pytanie nr. 1
      odp: [
        { text: "470 p.n.e.", correct: false},
        { text: "480 p.n.e.", correct: true},
        { text: "477 p.n.e.", correct: false},
        { text: "486 p.n.e.", correct: false},
      ]
  },
  {
    pytanie: "Jak nazywał się dowódca który dowodził wojskami po stronie Sparty w bitwie pod termopilami?", // pytanie nr. 2
    odp: [
      { text: "Leonidas", correct: true},
      { text: "Kserkses", correct: false},
      { text: "Temistokles", correct: false},
      { text: "Perykles", correct: false},
    ]
  },
  {
  pytanie: "Najważniejszy bóg Grecki", // pytanie nr. 3
  odp: [
    { text: "Posejdon", correct: false},
    { text: "Ares", correct: false},
    { text: "Afrodyta", correct: false},
    { text: "Zeus", correct: true},
  ]
  },
  {
    pytanie: "Kto był twórcą filozofii sokratycznej w starożytnej Grecji?", // pytanie nr. 4
    odp: [
      { text: "Sokrates", correct: true},
      { text: "Platon", correct: false},
      { text: "Arystoteles", correct: false},
      { text: "Pythagoras", correct: false},
    ]
  },
  {
    pytanie: "W jakim mieście odbyły się słynne igrzyska olimpijskie w starożytnej Grecji?", // pytanie nr. 5
    odp: [
      { text: "Ateny", correct: false},
      { text: "Olimpia", correct: true},
      { text: "Rodos", correct: false},
      { text: "Sparta", correct: false},
    ]
  }
];

// pobieranie elementów DOM
const pytanieEl = document.getElementById("pytanie");
const wybierzodp = document.getElementById("wybierzodp");
const przyciskDalej = document.getElementById("dalej");

// numer aktualnego pytania
let currentquestionindex = 0;
let correctAnswers = 0; // Liczba poprawnych odpowiedzi
let odpowiedziUzytkownika = []; // Tablica do przechowywania odpowiedzi użytkownika

// funkcja rozpoczynająca quiz
function startQuiz() {
  currentquestionindex = 0;
  correctAnswers = 0;
  odpowiedziUzytkownika = []; // Resetowanie odpowiedzi użytkownika
  przyciskDalej.innerHTML = "Dalej";
  showQuestion();
}

// funkcja do wyswietlania pytań
function showQuestion() {
  reset();
  let currentQuestion = pytania[currentquestionindex]; // pobieranie aktualnego pytania
  let nrPytania = currentquestionindex + 1;
  pytanieEl.innerHTML = nrPytania + ". " + currentQuestion.pytanie; // wyświetlanie pytania

  // przyciski do odpowiedzi
  currentQuestion.odp.forEach(odp => {
    const button = document.createElement("button");
    button.innerHTML = odp.text; // Tekst odpowiedzi
    button.classList.add("btn");
    wybierzodp.appendChild(button);
    // Jeżeli odpowiedź jest poprawna dodajemy atrybut correct
    if(odp.correct) {
      button.dataset.correct = odp.correct;
    }

    // Dodanie nasłuchiwania na kliknięcie przycisku
    button.addEventListener("click", selectanswer);
  });
}

// funkcja która zarządza wybranymi odpowiedziami
function selectanswer(e) {
  const selectedbtn = e.target; // pobieranie klikniętego przycisku
  const czyPoprawna = selectedbtn.dataset.correct === "true"; // czy odpowiedz poprawna
  if(czyPoprawna) {
    selectedbtn.classList.add("correct"); // Jeżeli odpowiedź poprawna, dodajemy klasę correct
    correctAnswers++; // Zwiększamy liczbę poprawnych odpowiedzi
  } else {
    selectedbtn.classList.add("incorrect"); // Jeżeli odpowiedź błędna, dodajemy klasę incorrect
  }

  // Zapisywanie odpowiedzi użytkownika (tekst odpowiedzi)
  odpowiedziUzytkownika.push({
    odpowiedz: selectedbtn.innerHTML,
    poprawna: czyPoprawna
  });

  // Wyłączamy przyciski po udzieleniu odpowiedzi
  Array.from(wybierzodp.children).forEach(button => {
    button.disabled = true; // blokowanie ponownego kliknięcia
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  // Pokazujemy przycisk Dalej
  przyciskDalej.style.display = "block";
}

// funkcja do resetowania quizu
function reset() {
  przyciskDalej.style.display="none";
  while(wybierzodp.firstChild) {
    wybierzodp.removeChild(wybierzodp.firstChild);
  }
}

// Funkcja do przejścia do następnego pytania
function nastepnyprzycisk() {
  currentquestionindex++; // przejście do następnego pytania
  if(currentquestionindex < pytania.length) {
    showQuestion(); // wyswietlenie kolejnych pytań, jeśli są jeszcze
  } else {
    pokazWynik(); // Jeśli nie ma już pytań, pokaż wynik końcowy
  }
}

// Funkcja pokazująca wynik quizu
function pokazWynik() {
  let message;
  if (correctAnswers === pytania.length) {
    message = "Świetnie! Ukończyłeś quiz w 100%!";
  } else if (correctAnswers > pytania.length / 2) {
    message = "Dobre wyniki! Możesz spróbować ponownie, aby zdobyć pełną liczbę punktów.";
  } else {
    message = "Pracuj nad sobą! Spróbuj ponownie!";
  }

  // Wyświetlanie wyniku
  pytanieEl.innerHTML = `${message} <br> Twoje wyniki: ${correctAnswers} z ${pytania.length} poprawnych odpowiedzi.`;

  // Wyświetlanie odpowiedzi użytkownika
  let odpowiedziHTML = "<h3>Twoje odpowiedzi:</h3>";
  odpowiedziUzytkownika.forEach((odpowiedz, index) => {
    odpowiedziHTML += `<p> ${index + 1}. Twoja odpowiedź: ${odpowiedz.odpowiedz} - `;
    odpowiedziHTML += odpowiedz.poprawna ? "Poprawna" : "Błędna";
    odpowiedziHTML += "</p>";
  });

  pytanieEl.innerHTML += odpowiedziHTML;
  przyciskDalej.innerHTML = "Zacznij od nowa";
  przyciskDalej.style.display = "block";
}

// Obsługa przycisku "Dalej"
przyciskDalej.addEventListener("click", ()=>{  
  if(currentquestionindex < pytania.length) {
    nastepnyprzycisk();
  } else {
    startQuiz(); // Jeśli quiz zakończony, uruchamiamy go od nowa
  }
});

// Uruchomienie quizu
startQuiz();





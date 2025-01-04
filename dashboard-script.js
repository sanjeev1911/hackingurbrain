function playSound() {
    const sound = document.getElementById('click-sound');
    sound.play();
}

function showTrivia() {
    document.getElementById('trivia-popup').style.display = 'block';
}

function checkAnswer(answer) {
    if (answer === 'CO2') {
        alert('Correct! CO2 is the main greenhouse gas emitted by human activities.');
    } else {
        alert('Incorrect. Try again!');
    }
}

function closeTrivia() {
    document.getElementById('trivia-popup').style.display = 'none';
}

function changeBackground() {
    const colors = ['#f4f4f4', '#ffcccb', '#add8e6', '#90ee90', '#ffe4e1'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

function showAvatarSelection() {
    document.getElementById('avatar-selection').style.display = 'block';
}

function selectAvatar(avatar) {
    alert(`You have selected ${avatar}!`);
    closeAvatarSelection();
}

function closeAvatarSelection() {
    document.getElementById('avatar-selection').style.display = 'none';
}

// Quiz functionality
const quizQuestions = [
    {
        question: "What is the main greenhouse gas emitted by human activities?",
        options: ["Carbon Dioxide", "Methane", "Nitrous Oxide", "Ozone"],
        answer: 0
    },
    {
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Solar", "Nuclear"],
        answer: 2
    }
];

function startQuiz() {
    let quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    quizQuestions.forEach((q, index) => {
        let questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach((option, i) => {
            questionElement.innerHTML += `<input type="radio" name="question${index}" value="${i}"> ${option}<br>`;
        });
        quizContainer.appendChild(questionElement);
    });
    quizContainer.innerHTML += '<button onclick="submitQuiz()">Submit Quiz</button>';
}

function submitQuiz() {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });
    alert(`You scored ${score} out of ${quizQuestions.length}`);
}

// Load the Google Charts library
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Function to draw the chart
function drawChart() {
    // Create the data table
    var data = google.visualization.arrayToDataTable([
        ['Year', 'CO2 Emissions (ppm)'],
        ['2010', 390],
        ['2011', 393],
        ['2012', 396],
        ['2013', 398],
        ['2014', 400],
        ['2015', 403],
        ['2016', 404],
        ['2017', 408],
        ['2018', 410],
        ['2019', 412],
        ['2020', 414],
        ['2021', 416],
        ['2022', 418],
        ['2023', 420] // Simulated data for 2023
    ]);

    // Set chart options
    var options = {
        title: 'CO2 Emissions Over Time',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Year'
        },
        vAxis: {
            title: 'CO2 Emissions (ppm)'
        }
    };

    // Create and draw the chart
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}

// User-generated content
function submitUserTip(event) { // Corrected function name
    event.preventDefault();
    const userTip = document.getElementById('user-tip-input').value;
    const userTipsContainer = document.getElementById('user-tips-list');
    const tipElement = document.createElement('li');
    tipElement.textContent = userTip;
    userTipsContainer.appendChild(tipElement);
    document.getElementById('user-tip-input').value = '';
}
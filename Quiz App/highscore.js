const highscorelist = document.getElementById("highscorelist");
const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

// map takes an array of items and converts them into something else
highscorelist.innerHTML = highScore.map( score => {
    return `<li class="high-score"> ${score.name} - ${score.score} </li>`;
    })
    .join("");
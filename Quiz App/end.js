const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore')

// Local Storage only stores strings
// JSON.parse to parse data into a js object
const highscore = JSON.parse(localStorage.getItem("highScore")) || [];

// set the max highscore array to 5, only top 5 scorers will be saved
const MAX_HIGHSCORE = 5;

finalScore.innerText = mostRecentScore;

// if there's no username entered, save button is disabled
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    console.log("Save");
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random()*100),
        name: username.value
    };
    // push the highscore into the array
    highscore.push(score);

    // sort the score accordingly
    highscore.sort( (a,b) => b.score - a.score)

    // splice out any extra scores
    highscore.splice(5);
    
    // JSON.stringify converts js object into a string
    localStorage.setItem("highScore", JSON.stringify(highscore));

    window.location.assign("/");

}
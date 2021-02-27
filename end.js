const usernameInput = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

usernameInput.addEventListener("keyup", () =>{
    saveScoreBtn.disabled = !usernameInput.value;
});
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: usernameInput.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.href = ('historyQuiz/index.html');
};
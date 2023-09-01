const BASE_URL = "http://127.0.0.1:5000/";

// const $guessForm = $('#guess-form');

// let sumScore = 0;
// let wordsArray=[]
// let highestScore = 0;
// let numOfPlays = 0;

// $(document).ready(function () {
//     async function displayResult() {
//         const guessInput = $('#guess-input').val();
//         // Function to display the result on the screen
//         if (guessInput) {
//             const res = await axios.post('/check-guess', { guess: guessInput });
//             console.log(res.data.result);
//             $('#response-message').text(res.data.result);
//             postScore(res.data.result);
//         };
//     }

//     async function postScore(result) {
//         // Post a Score
//         const guessInput = $('#guess-input').val();
//         if (result === "ok" && !wordsArray.includes(guessInput)) {
//             wordsArray.push(guessInput);
//             console.log(wordsArray.push(guessInput))
//             let score = guessInput.length;
//             sumScore += score;
//             $('#score').text(sumScore);
//         }

//         if (gameTimerExpired) {
//             // Check if the game timer has expired and send the score to the backend
//             let finalScore = sumScore;
//             let gameData = { 'score': finalScore };
//             try {
//                 const response = await axios.post('/game-over', gameData);
//                 console.log(response.data.message);
//             } catch (error) {
//                 console.log('Error updating final score:', error);
//             }
//         }
//     }

//     $guessForm.submit(function (e) {
//         // Display the result when click 'submit'
//         e.preventDefault();
//         displayResult();
//     })

//     function gameTimerExpired() {
//         // Remove input when the game is over
//         alert("Game timer has expired!");
//         const $guessInput = $('#guess-input');
//         if ($guessForm) {
//             $guessInput.remove();
//         }
//     }

//     // Set a timer for 60 seconds (60000 milliseconds) to finish the game
//     const gameTimer = setTimeout(gameTimerExpired, 10000);
// })









class Game{
    constructor() {
        this.$guessForm = $('#guess-form');
        this.$responseMessage = $('#response-message');
        this.$guessInput = $('#guess-input');
        this.$score = $('#score');

        this.sumScore = 0;
        this.wordsArray=[]
        this.highestScore = 0;
        this.numOfPlays = 0;

        this.displayWhenClickSubmit();
        this.startGameTimer();
    }

    async displayResult() {
        const guessInput = this.$guessInput.val();
        // Function to display the result on the screen
        if (guessInput) {
            const res = await axios.post('/check-guess', { guess: guessInput });
            console.log(res.data.result);
            this.$responseMessage.text(res.data.result);
            this.postScore(res.data.result);
        };
    }

    async postScore(result) {
        // Post a Score
        const guessInput = this.$guessInput.val();
        if (result === "ok" && !this.wordsArray.includes(guessInput)) {
            this.wordsArray.push(guessInput);
            console.log(this.wordsArray.push(guessInput))
            let score = guessInput.length;
            this.sumScore += score;
            this.$score.text(this.sumScore);
        }

        if (this.gameTimerExpired()) {
            // Check if the game timer has expired and send the score to the backend
            let finalScore = this.sumScore;
            let gameData = { 'score': finalScore };
            try {
                const response = await axios.post('/game-over', gameData);
                console.log(response.data.message);
            } catch (error) {
                console.log('Error updating final score:', error);
            }
        }
    }

    displayWhenClickSubmit() {
        this.$guessForm.submit((e) => {
            // Display the result when click 'submit'
            e.preventDefault();
            this.displayResult();
        })
    }

    gameTimerExpired() {
        // Remove input when the game is over
        alert("Game timer has expired!");
        // const $guessInput = $('#guess-input');
        if (this.$guessForm) {
            console.log("$guessForm exists");
            this.$guessInput.remove();
        }
    }

    startGameTimer() {
        // Set a timer for 60 seconds (60000 milliseconds) to finish the game
        setTimeout(()=>this.gameTimerExpired(), 10000);
    }

}
$(document).ready(function () {
    const game = new Game();
});
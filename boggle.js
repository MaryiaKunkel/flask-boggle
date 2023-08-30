const $guessForm = $('#guess-form');
const $guessInput = $('#guess-input');
const guessForm = $guessForm.val();

const res = axios.post('http://127.0.0.1:5000/', { guessForm });
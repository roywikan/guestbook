document.addEventListener('DOMContentLoaded', () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    document.getElementById('captchaAnswer').value = num1 + num2;
});

function validateCaptcha() {
    const userAnswer = parseInt(document.getElementById('captchaInput').value);
    const correctAnswer = parseInt(document.getElementById('captchaAnswer').value);
    if (userAnswer !== correctAnswer) {
        alert('Jawaban salah! Coba lagi.');
        return false;
    }
    return true;
}

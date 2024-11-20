document.addEventListener('DOMContentLoaded', () => {
  // Generate random numbers for CAPTCHA
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);

  // Set numbers in CAPTCHA question
  document.getElementById('num1').textContent = num1;
  document.getElementById('num2').textContent = num2;

  // Store the correct answer in hidden input
  document.getElementById('captchaAnswer').value = num1 + num2;
});

function validateCaptcha() {
  const userAnswer = parseInt(document.getElementById('captchaInput').value);
  const correctAnswer = parseInt(document.getElementById('captchaAnswer').value);

  if (userAnswer !== correctAnswer) {
    alert('Jawaban CAPTCHA salah. Coba lagi.');
    return false; // Prevent form submission
  }

  return true; // Allow form submission
}
